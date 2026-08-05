#!/usr/bin/env node
// ─────────────────────────────────────────────
// Runner: carrega mocks, corre o widget, gera HTML visual
// ─────────────────────────────────────────────
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// 1. Carrega mocks — registra todos no globalThis
await import("./mocks.mjs");

// 2. Lê o widget como texto (necessário para o name map)
const widgetSrc = readFileSync(resolve(ROOT, "liga-pt.cjs"), "utf-8");

// 2b. Extrai TEAM_COLORS do widget
const colorsMatch = widgetSrc.match(/const TEAM_COLORS = \{([\s\S]*?)\};/);
const TEAM_COLORS = {};
if (colorsMatch) {
    for (const m of colorsMatch[1].matchAll(/"([^"]+)":\s*\["(#[0-9a-fA-F]+)",\s*"(#[0-9a-fA-F]+)"/g)) {
        TEAM_COLORS[m[1]] = [m[2], m[3]];
    }
}

// 3. Busca logos das equipas da ESPN (teams endpoint)
const TEAMS_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/por.1/teams";
let teamLogos = {};
try {
    const res = await fetch(TEAMS_URL);
    const data = await res.json();
    // Lê o ESPN_NAME_MAP do widget para traduzir nomes
    const nameMapMatch = widgetSrc.match(/const ESPN_NAME_MAP = \{([\s\S]*?)\};/);
    const nameMap = {};
    if (nameMapMatch) {
        for (const m of nameMapMatch[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) {
            nameMap[m[1]] = m[2];
        }
    }
    for (const entry of data.sports?.[0]?.leagues?.[0]?.teams || []) {
        const t = entry.team;
        const logo = t.logos?.[0]?.href || null;
        const displayName = nameMap[t.name] || t.name;
        teamLogos[displayName] = logo;
    }
} catch (_) {}

// 4. Executa o widget
const wrapped = `(async () => { ${widgetSrc} })()`;

// 4. Cria contexto vm com mocks
const sandbox = {};
for (const key of Object.getOwnPropertyNames(globalThis)) {
    try { sandbox[key] = globalThis[key]; } catch (_) {}
}

const ctx = vm.createContext(sandbox, { name: "liga-pt-context" });

ctx.Script = {
    name: () => "liga-pt-test",
    setWidget: (w) => { ctx.__widget = w; },
    complete: () => {},
};
ctx.config = { runsInApp: false };

// 5. Modo LIVE — intercepta Request.loadJSON para simular jogo ao vivo
if (process.env.LIVE === "true") {
    const OrigRequest = ctx.Request;
    const origLoadJSON = OrigRequest.prototype.loadJSON;
    OrigRequest.prototype.loadJSON = async function () {
        const data = await origLoadJSON.call(this);
        if (this.url.includes("scoreboard") && data.events?.length > 0) {
            for (const event of data.events) {
                const comp = event.competitions?.[0];
                if (comp?.status?.type?.state === "pre") {
                    const liveStatus = {
                        clock: 67,
                        displayClock: "67'",
                        type: {
                            id: "2", name: "STATUS_IN_PROGRESS",
                            state: "in", completed: false,
                            description: "In Progress", detail: "2nd Half",
                            shortDetail: "2nd Half",
                        },
                    };
                    event.status = liveStatus;
                    comp.status = liveStatus;
                    const home = comp.competitors.find((t) => t.homeAway === "home");
                    const away = comp.competitors.find((t) => t.homeAway === "away");
                    if (home) { home.score = "2"; home.winner = true; }
                    if (away) { away.score = "1"; away.winner = false; }
                    // Adiciona detalhe de golo
                    comp.details = [
                        { scoringPlay: true, team: home?.team, clock: { displayValue: "23'" } },
                        { scoringPlay: true, team: away?.team, clock: { displayValue: "41'" } },
                        { scoringPlay: true, team: home?.team, clock: { displayValue: "58'" } },
                    ];
                    break;
                }
            }
        }
        return data;
    };
}

// 6. Executa
const script = new vm.Script(wrapped, { filename: "liga-pt.cjs" });

try {
    await script.runInContext(ctx, { timeout: 30000 });

    const widget = ctx.__widget;
    const data = _extractData(widget, teamLogos);

    // Gera HTML
    const html = _generateHtml(data, TEAM_COLORS);
    const htmlPath = resolve(__dirname, "widget.html");
    writeFileSync(htmlPath, html, "utf-8");
    console.log(`Widget HTML gerado: ${htmlPath}`);
    console.log(`Resumo: ${data.summary}`);
    console.log(`Jogos: ${data.matches.length}`);
} catch (err) {
    console.error("ERRO ao executar widget:", err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
}

// ─────────────────────────────────────────────
// Extrai dados estruturados do widget
// ─────────────────────────────────────────────
function _extractData(widget, logos) {
    if (!widget) return { type: "empty", matches: [], summary: "Sem widget" };

    const texts = _collectTexts(widget);
    const hasLive = texts.some(t => t.includes("EM DIRETO"));
    const hasError = texts.some(t => t.includes("Falha ao carregar"));

    if (hasError) {
        return { type: "error", matches: [], summary: texts.find(t => t.includes("Falha ao carregar")) };
    }

    // Header info
    const headerDay = texts.find(t => /^\d{2}-\d{2}$/.test(t)) || "";
    const headerDate = texts.find(t => t.includes("·")) || "";

    if (hasLive) {
        return _extractLiveData(texts, logos, headerDay, headerDate);
    }

    return _extractScheduleData(texts, logos, headerDay, headerDate);
}

function _extractLiveData(texts, logos, headerDay, headerDate) {
    // Find team names and scores in live layout
    const liveIdx = texts.findIndex(t => t.includes("EM DIRETO"));
    const minute = texts[liveIdx]?.replace(" EM DIRETO", "").replace("'", "").trim() || "";

    // In live mode: flag, team1, vs, team2, flag, score1, -, score2
    const teams = texts.filter(t =>
        !t.includes("EM DIRETO") && !t.includes("🏆") && !t.includes("·") &&
        !/^\d/.test(t) && t !== "vs" && t !== "-" && t.length > 1 &&
        !t.includes("Atualizado") && !t.includes("Intervalo") && !t.includes("Final")
    );

    const scores = texts.filter(t => /^\d+$/.test(t));

    const match = {
        homeTeam: teams[0] || "",
        awayTeam: teams[1] || "",
        homeScore: scores[0] || "0",
        awayScore: scores[1] || "0",
        minute: minute || "EM DIRETO",
        homeLogo: logos[teams[0]] || null,
        awayLogo: logos[teams[1]] || null,
    };

    return {
        type: "live",
        headerDay,
        headerDate,
        matches: [match],
        summary: `${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam} (${match.minute}')`,
    };
}

function _extractScheduleData(texts, logos, headerDay, headerDate) {
    const matches = [];
    let i = 0;

    while (i < texts.length) {
        if (/^\d{2}:\d{2}$/.test(texts[i])) {
            const time = texts[i];
            // Pattern: time, flag, team1, VS, team2, flag, status
            const flag1 = texts[i+1] && /🇵🇹/.test(texts[i+1]) ? true : false;
            const team1Idx = flag1 ? i+2 : i+1;
            const team1 = texts[team1Idx] || "";
            const vsIdx = team1Idx + 1;
            const team2Idx = vsIdx + 1;
            const team2 = texts[team2Idx] || "";
            const statusIdx = team2Idx + 2; // skip flag
            const status = texts[statusIdx] || "Por jogar";

            const isPost = /\d+-\d+/.test(status);
            const homeScore = isPost ? status.split("-")[0] : null;
            const awayScore = isPost ? status.split("-")[1] : null;

            matches.push({
                homeTeam: team1,
                awayTeam: team2,
                time,
                homeScore,
                awayScore,
                state: isPost ? "post" : "pre",
                homeLogo: logos[team1] || null,
                awayLogo: logos[team2] || null,
            });
            i += 8;
        } else {
            i++;
        }
    }

    const summary = matches.length > 0
        ? matches.map(m => `${m.time} ${m.homeTeam} vs ${m.awayTeam}`).join(" | ")
        : "Sem jogos";

    return { type: "schedule", headerDay, headerDate, matches, summary };
}

function _collectTexts(node) {
    if (!node) return [];
    const texts = [];
    if (node.type === "Text" && node.props.value) texts.push(node.props.value);
    for (const child of (node.children || [])) texts.push(..._collectTexts(child));
    return texts;
}

// ─────────────────────────────────────────────
// Gera HTML visual do widget
// ─────────────────────────────────────────────
function _generateHtml(data, teamColors) {
    const isLive = data.type === "live";
    const isError = data.type === "error";

    // Background colors
    const bgTop = isLive ? "#102640" : "#111b31";
    const bgBottom = isLive ? "#281c36" : "#10182c";

    let matchesHtml = "";

    if (isError) {
        matchesHtml = `
      <div style="display:flex;align-items:center;justify-content:center;height:100px;">
        <div style="font-size:12px;color:#ff453a;text-align:center;">${data.summary}</div>
      </div>`;
    } else if (isLive) {
        const m = data.matches[0];
        matchesHtml = _renderLiveMatch(m, teamColors);
    } else if (data.matches.length === 0) {
        matchesHtml = `
      <div style="display:flex;align-items:center;justify-content:center;height:100px;">
        <div style="font-size:14px;color:rgba(255,255,255,0.55);text-align:center;">Sem jogos por agora, aproveite para descansar</div>
      </div>`;
    } else {
        matchesHtml = _renderScheduleMatches(data.matches, teamColors);
    }

    return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Liga Portugal Widget</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a1a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif;
    gap: 30px;
    padding: 40px 20px;
  }
  .phone-frame {
    width: 390px;
    background: #1c1c1e;
    border-radius: 44px;
    padding: 14px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  }
  .widget {
    width: 100%;
    aspect-ratio: 375 / 155;
    border-radius: 22px;
    background: linear-gradient(180deg, ${bgTop}, ${bgBottom});
    padding: 12px 16px 8px 17px;
    color: white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
  ${isLive ? `
  .widget::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 12px,
      rgba(255,255,255,0.035) 12px,
      rgba(255,255,255,0.035) 14px
    );
    pointer-events: none;
  }
  ` : ""}
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    z-index: 1;
  }
  .header .day {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  .header .date {
    font-size: 12px;
    font-weight: 800;
    color: rgba(255,255,255,0.55);
  }
  .header .brand {
    margin-left: auto;
    font-size: 15px;
    font-weight: 800;
    color: #ffd11f;
  }
  .card {
    flex: 1;
    background: rgba(18,27,48,0.7);
    border-radius: 10px;
    margin-top: 6px;
    overflow: hidden;
    z-index: 1;
  }
  .match-row {
    display: flex;
    align-items: center;
    height: 24px;
    padding: 3px 8px;
    background: rgba(255,255,255,0.055);
  }
  .match-row:first-child { border-radius: 10px 10px 0 0; }
  .match-row:last-child { border-radius: 0 0 10px 10px; }
  .match-row + .match-row { margin-top: 1px; }
  .time {
    width: 45px;
    font-size: 13px;
    font-weight: 800;
    color: rgba(255,255,255,0.55);
    flex-shrink: 0;
  }
  .team-cell {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 95px;
    font-size: 13px;
    font-weight: 800;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .team-cell.away { justify-content: flex-end; }
  .logo {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    object-fit: contain;
    background: rgba(255,255,255,0.1);
  }
  .vs {
    width: 30px;
    text-align: center;
    font-size: 13px;
    font-weight: 800;
    color: rgba(255,255,255,0.38);
    flex-shrink: 0;
  }
  .status {
    width: 50px;
    text-align: right;
    font-size: 11px;
    font-weight: 800;
    color: rgba(255,255,255,0.32);
    flex-shrink: 0;
  }
  .status.win { color: #25d487; }
  .status.lose { color: #ff626d; }
  .status.draw { color: #ffd21f; }

  /* Live match styles */
  .live-widget {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .live-badge {
    background: #e83f49;
    border-radius: 8px;
    padding: 4px 11px;
    font-size: 12px;
    font-weight: 800;
    color: white;
    align-self: center;
    margin-top: 15px;
    z-index: 2;
  }
  .live-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex: 1;
    width: 100%;
    padding: 0 10px;
  }
  .avatar-box {
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .avatar-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: contain;
    background: rgba(255,255,255,0.05);
  }
  .score-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .team-names {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .team-name {
    font-size: 10px;
    font-weight: 800;
    color: white;
    width: 50px;
    text-align: center;
  }
  .vs-live {
    font-size: 15px;
    font-weight: 800;
    color: rgba(255,255,255,0.38);
  }
  .score-panel {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(16,23,38,0.72);
    border-radius: 14px;
    padding: 4px 10px;
  }
  .score-num {
    font-size: 36px;
    font-weight: 900;
    color: #25d487;
  }
  .score-num.lose { color: #ff626d; }
  .score-num.draw { color: #ffd21f; }
  .score-dash {
    font-size: 18px;
    font-weight: 800;
    color: rgba(255,255,255,0.38);
  }
  .updated {
    font-size: 8px;
    color: rgba(255,255,255,0.22);
    text-align: center;
    margin-top: 2px;
  }
  .color-dots {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }
  .color-dots .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 0.5px solid rgba(255,255,255,0.15);
  }
</style>
</head>
<body>
  <div class="phone-frame">
    <div class="widget ${isLive ? 'live-widget' : ''}">
      ${isLive ? _renderLiveBadge(data.matches[0]) : _renderHeader(data)}
      ${matchesHtml}
      ${isLive ? _renderLiveFooter() : ""}
    </div>
  </div>
  <div style="color:rgba(255,255,255,0.3);font-size:12px;text-align:center;">
    Liga Portugal Widget Preview — gerado por <code>node test/run.mjs</code>
  </div>
</body>
</html>`;
}

function _renderHeader(data) {
    return `
    <div class="header">
      <span class="day">${data.headerDay}</span>
      <span class="date">${data.headerDate}</span>
      <span class="brand">🏆 Liga 🇵🇹</span>
    </div>`;
}

function _renderLiveBadge(match) {
    const minute = match.minute || "EM DIRETO";
    return `<div class="live-badge">${minute}${/^\d+$/.test(minute) ? "' EM DIRETO" : " EM DIRETO"}</div>`;
}

function _renderLiveFooter() {
    const now = new Date();
    const time = now.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
    return `<div class="updated">⟳ Atualizado ${time}</div>`;
}

function _renderColorDots(teamName, teamColors, size) {
    const colors = teamColors[teamName];
    if (!colors) return `<span style="font-size:${size}px">⚽</span>`;
    const dotSize = size * 0.55;
    return `<span class="color-dots"><span class="dot" style="background:${colors[0]};width:${dotSize}px;height:${dotSize}px"></span><span class="dot" style="background:${colors[1]};width:${dotSize}px;height:${dotSize}px"></span></span>`;
}

function _renderLiveMatch(m, teamColors) {
    const homeScore = Number(m.homeScore);
    const awayScore = Number(m.awayScore);
    const homeClass = homeScore > awayScore ? "" : homeScore < awayScore ? " lose" : " draw";
    const awayClass = awayScore > homeScore ? "" : awayScore < homeScore ? " lose" : " draw";

    return `
    <div class="live-content">
      <div class="avatar-box">
        ${m.homeLogo ? `<img class="avatar-img" src="${m.homeLogo}" alt="${m.homeTeam}">` : _renderColorDots(m.homeTeam, teamColors, 40)}
      </div>
      <div class="score-block">
        <div class="team-names">
          <span class="team-name">${m.homeTeam}</span>
          <span class="vs-live">vs</span>
          <span class="team-name">${m.awayTeam}</span>
        </div>
        <div class="score-panel">
          <span class="score-num${homeClass}">${m.homeScore}</span>
          <span class="score-dash">-</span>
          <span class="score-num${awayClass}">${m.awayScore}</span>
        </div>
      </div>
      <div class="avatar-box">
        ${m.awayLogo ? `<img class="avatar-img" src="${m.awayLogo}" alt="${m.awayTeam}">` : _renderColorDots(m.awayTeam, teamColors, 40)}
      </div>
    </div>`;
}

function _renderScheduleMatches(matches, teamColors) {
    let html = '<div class="card">';
    for (const m of matches) {
        const statusClass = m.state === "post"
            ? (Number(m.homeScore) > Number(m.awayScore) ? " win" : Number(m.homeScore) < Number(m.awayScore) ? " lose" : " draw")
            : "";
        const statusText = m.state === "post" ? `${m.homeScore}-${m.awayScore}` : "Por jogar";

        html += `
      <div class="match-row">
        <span class="time">${m.time}</span>
        <div class="team-cell">
          ${m.homeLogo ? `<img class="logo" src="${m.homeLogo}" alt="">` : _renderColorDots(m.homeTeam, teamColors, 10)}
          <span>${m.homeTeam}</span>
        </div>
        <span class="vs">VS</span>
        <div class="team-cell away">
          <span>${m.awayTeam}</span>
          ${m.awayLogo ? `<img class="logo" src="${m.awayLogo}" alt="">` : _renderColorDots(m.awayTeam, teamColors, 10)}
        </div>
        <span class="status${statusClass}">${statusText}</span>
      </div>`;
    }
    html += "\n    </div>";
    return html;
}
