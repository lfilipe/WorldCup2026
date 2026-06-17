const CONFIG = {
  // Endereço remoto do manifest.json, usado para carregar a lista de URLs dos avatares de cada seleção
  manifestUrl: "https://raw.githubusercontent.com/lfilipe/WorldCup2026/main/manifest.json",
  // Nome da pasta de cache local (guarda o manifest e as imagens dos avatares)
  cacheFolder: "WorldCup2026WidgetAssets_FIX3",
  // Número máximo de jogos mostrados no cartão de calendário (recomendado 4; o excesso é cortado)
  maxUpcoming: 4,
  // Intervalo de atualização automática do widget, em minutos
  refreshMinutes: 1,
};

const COLORS = {
  // Cor inicial do gradiente de fundo padrão (azul-marinho escuro)
  bgTop: new Color("#10243d"),
  // Cor final do gradiente de fundo padrão (azul-violeta escuro)
  bgBottom: new Color("#1d1830"),
  // Cor de fundo do cartão (branco com baixa opacidade)
  card: new Color("#ffffff", 0.08),
  // Cor da borda do cartão (azul-céu com baixa opacidade)
  cardBorder: new Color("#60a5fa", 0.18),
  // Cor do texto principal (branco puro)
  text: Color.white(),
  // Cor do texto secundário (branco a 55% de opacidade)
  muted: new Color("#ffffff", 0.55),
  // Texto auxiliar mais discreto (branco a 32% de opacidade, usado em "por jogar", etc.)
  faint: new Color("#ffffff", 0.32),
  // Cor de destaque (azul-céu)
  accent: new Color("#38bdf8"),
  // Cor vermelha de estado "em direto"
  live: new Color("#ff453a"),
  // Cor verde de vitória
  win: new Color("#34c759"),
  // Cor amarela de empate
  draw: new Color("#ffcc00"),
};

const UI = {
  // ── Tamanho do canvas ─────────────────────────────
  // Largura de renderização do widget (pixels lógicos, base para o tamanho "medium")
  widgetWidth: 1080,
  // Altura de renderização do widget
  widgetHeight: 508,

  // ── Layout do cartão "em direto" ──────────────────
  // Espaço no topo do cartão em direto (acima do selo LIVE)
  liveTopGap: 15,
  // Distância entre o selo LIVE e a linha dos nomes das equipas (negativo = sobe, aproxima do conteúdo)
  liveBadgeToNamesGap: -100,
  // Deslocamento horizontal do selo LIVE (positivo = move para a direita)
  liveBadgeOffsetX: 20,
  // Espaçamento interno esquerdo/direito do cartão em direto
  liveSidePadding: 10,

  // ── Avatares ───────────────────────────────────────
  // Espaço entre a imagem do avatar e o bloco do resultado
  avatarScoreGap: 1,
  // Tamanho real de desenho do avatar (pixels)
  avatarSize: 125,
  // Tamanho do contentor do avatar (usado para centrar o layout, normalmente igual a avatarSize)
  avatarBox: 125,
  // Espaço no topo do contentor do avatar (negativo = sobe)
  avatarTopGap: -20,
  // Espaço na base do contentor do avatar
  avatarBottomGap: 0,
  // Deslocamento horizontal do avatar da equipa da casa (negativo = move para a esquerda)
  homeAvatarOffsetX: -5,
  // Deslocamento horizontal do avatar da equipa visitante (negativo = move para a esquerda)
  awayAvatarOffsetX: -10,
  // Deslocamento vertical do avatar (negativo = sobe)
  avatarOffsetY: -10,

  // ── Bloco do resultado ─────────────────────────────
  // Altura total do bloco do resultado
  scoreBlockHeight: 144,
  // Largura do painel do resultado
  scorePanelWidth: 110,
  // Altura do painel do resultado
  scorePanelHeight: 42,
  // Espaçamento interno horizontal do painel do resultado
  scorePanelPadX: 10,
  // Espaçamento interno vertical do painel do resultado
  scorePanelPadY: 4,
  // Raio dos cantos do painel do resultado
  scorePanelRadius: 14,
  // Se o efeito de brilho do painel do resultado está ativo
  scoreGlow: true,
  // Cor do efeito de brilho (hexadecimal, sem #)
  scoreGlowColor: "#2ee6a6",
  // Opacidade do efeito de brilho (0~1, quanto maior, mais brilhante)
  scoreGlowOpacity: 0.02,
  // Raio de difusão do efeito de brilho
  scoreGlowRadius: 126,
  // Espaço entre os dois números do resultado
  scoreNumberGap: 12,

  // ── Selo LIVE ──────────────────────────────────────
  // Tamanho de letra do selo LIVE
  liveBadgeFont: 12,
  // Espaçamento interno horizontal do selo LIVE
  liveBadgePadX: 11,
  // Espaçamento interno vertical do selo LIVE
  liveBadgePadY: 4,
  // Raio dos cantos do selo LIVE
  liveBadgeRadius: 8,

  // ── Nomes das equipas & VS ─────────────────────────
  // Tamanho de letra dos nomes das equipas no bloco do resultado
  teamNameFont: 10,
  // Largura do texto do nome da equipa (encolhe automaticamente se exceder)
  teamNameWidth: 46,
  // Escala mínima do nome da equipa (0~1)
  teamNameMinScale: 0.7,
  // Deslocamento horizontal do nome da equipa da casa
  homeTeamNameOffsetX: 0,
  // Deslocamento horizontal do nome da equipa visitante
  awayTeamNameOffsetX: 3,
  // Tamanho de letra do texto "vs"
  vsFont: 15,
  // Largura do contentor do texto "vs"
  vsWidth: 25,
  // Espaço acima do texto "vs"
  vsTopGap: 0,
  // Espaço abaixo do texto "vs"
  vsBottomGap: 0,
  // Deslocamento horizontal do texto "vs" (negativo = move para a esquerda)
  vsOffsetX: -5,
  // Espaço entre os nomes das equipas e o painel do resultado
  namesToScoreGap: 10,
  // Tamanho de letra dos números do resultado
  scoreFont: 36,
  // Tamanho de letra do traço entre os números do resultado
  scoreDashFont: 18,

  // ── Layout do cartão de calendário ─────────────────
  // Espaçamento interno esquerdo do cartão de calendário
  schedulePaddingLeft: 17,
  // Espaçamento interno direito do cartão de calendário
  schedulePaddingRight: 16,
  // Largura de cada linha do calendário
  scheduleRowWidth: 330,
  // Altura de cada linha do calendário
  scheduleRowHeight: 24,

  // ── Cores de fundo do cartão "em direto" ───────────
  // Cor inicial do gradiente de fundo do cartão em direto (azul escuro)
  liveBgTop: new Color("#102640"),
  // Cor final do gradiente de fundo do cartão em direto (roxo escuro)
  liveBgBottom: new Color("#281c36"),
  // Cor das listras diagonais (branco com opacidade muito baixa, dá textura)
  stripe: new Color("#ffffff", 0.035),

  // ── Cores de fundo do cartão de calendário ─────────
  // Cor inicial do gradiente de fundo do cartão de calendário
  scheduleBgTop: new Color("#111b31"),
  // Cor final do gradiente de fundo do cartão de calendário
  scheduleBgBottom: new Color("#10182c"),

  // ── Cores dos componentes do cartão de calendário ──
  // Cor de fundo do painel do resultado
  panel: new Color("#101726", 0.72),
  // Cor de fundo da linha do calendário (branco com baixa opacidade)
  scheduleRow: new Color("#ffffff", 0.055),
  // Cor da borda da linha do calendário (azul com baixa opacidade, ainda não usada)
  scheduleBorder: new Color("#6b8dc9", 0.22),

  // ── Cores do resultado ──────────────────────────────
  // Cor do resultado em caso de vitória (verde)
  scoreWin: new Color("#25d487"),
  // Cor do resultado em caso de derrota (vermelho)
  scoreLose: new Color("#ff626d"),
  // Cor do resultado em caso de empate (amarelo)
  scoreDraw: new Color("#ffd21f"),

  // ── Outras cores da interface ──────────────────────
  // Cor de fundo vermelha do selo LIVE
  liveBadge: new Color("#e83f49"),
  // Cor do ícone do troféu no título (dourado)
  trophy: new Color("#ffd11f"),
  // Cor do texto "vs" (branco com baixa opacidade)
  vs: new Color("#ffffff", 0.38),
};

// Devolve o nome da seleção para exibição (já está em português no manifest)
function displayName(name) {
  return name;
}

// Emojis de bandeira por nome da seleção em português (corresponde ao manifest)
const FLAGS = {
  "México": "🇲🇽", "África do Sul": "🇿🇦", "Coreia do Sul": "🇰🇷", "Chéquia": "🇨🇿",
  "Canadá": "🇨🇦", "Bósnia e Herzegovina": "🇧🇦", "Catar": "🇶🇦", "Suíça": "🇨🇭",
  "Brasil": "🇧🇷", "Marrocos": "🇲🇦", "Haiti": "🇭🇹", "Escócia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Estados Unidos": "🇺🇸", "Paraguai": "🇵🇾", "Austrália": "🇦🇺", "Turquia": "🇹🇷",
  "Alemanha": "🇩🇪", "Curaçao": "🇨🇼", "Costa do Marfim": "🇨🇮", "Equador": "🇪🇨",
  "Países Baixos": "🇳🇱", "Japão": "🇯🇵", "Suécia": "🇸🇪", "Tunísia": "🇹🇳",
  "Bélgica": "🇧🇪", "Egito": "🇪🇬", "Irão": "🇮🇷", "Nova Zelândia": "🇳🇿",
  "Espanha": "🇪🇸", "Cabo Verde": "🇨🇻", "Arábia Saudita": "🇸🇦", "Uruguai": "🇺🇾",
  "França": "🇫🇷", "Iraque": "🇮🇶", "Noruega": "🇳🇴", "Senegal": "🇸🇳",
  "Argentina": "🇦🇷", "Áustria": "🇦🇹", "Jordânia": "🇯🇴", "Argélia": "🇩🇿",
  "Portugal": "🇵🇹", "Usbequistão": "🇺🇿", "Colômbia": "🇨🇴", "RD Congo": "🇨🇩",
  "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Gana": "🇬🇭", "Panamá": "🇵🇦", "Croácia": "🇭🇷",
};

// Mapa de nomes da ESPN (em inglês) para o nome da seleção em português
// (corresponde ao campo "name" do manifest.json).
const ESPN_NAME_MAP = {
  "Mexico": "México",
  "South Africa": "África do Sul",
  "South Korea": "Coreia do Sul",
  "Korea Republic": "Coreia do Sul",
  "Czechia": "Chéquia",
  "Czech Republic": "Chéquia",
  "Canada": "Canadá",
  "Bosnia-Herzegovina": "Bósnia e Herzegovina",
  "Bosnia and Herzegovina": "Bósnia e Herzegovina",
  "Qatar": "Catar",
  "Switzerland": "Suíça",
  "Brazil": "Brasil",
  "Morocco": "Marrocos",
  "Haiti": "Haiti",
  "Scotland": "Escócia",
  "United States": "Estados Unidos",
  "USA": "Estados Unidos",
  "Paraguay": "Paraguai",
  "Australia": "Austrália",
  "Türkiye": "Turquia",
  "Turkey": "Turquia",
  "Germany": "Alemanha",
  "Curaçao": "Curaçao",
  "Curacao": "Curaçao",
  "Ivory Coast": "Costa do Marfim",
  "Côte d'Ivoire": "Costa do Marfim",
  "Ecuador": "Equador",
  "Netherlands": "Países Baixos",
  "Japan": "Japão",
  "Sweden": "Suécia",
  "Tunisia": "Tunísia",
  "Belgium": "Bélgica",
  "Egypt": "Egito",
  "Iran": "Irão",
  "New Zealand": "Nova Zelândia",
  "Spain": "Espanha",
  "Cape Verde": "Cabo Verde",
  "Saudi Arabia": "Arábia Saudita",
  "Uruguay": "Uruguai",
  "France": "França",
  "Iraq": "Iraque",
  "Norway": "Noruega",
  "Senegal": "Senegal",
  "Argentina": "Argentina",
  "Austria": "Áustria",
  "Jordan": "Jordânia",
  "Algeria": "Argélia",
  "Portugal": "Portugal",
  "Uzbekistan": "Usbequistão",
  "Colombia": "Colômbia",
  "Congo DR": "RD Congo",
  "DR Congo": "RD Congo",
  "England": "Inglaterra",
  "Ghana": "Gana",
  "Panama": "Panamá",
  "Croatia": "Croácia",
};

// Jogos estáticos de reserva (usados se a API da ESPN falhar), por grupo e
// nome da seleção em português (corresponde ao manifest)
const STATIC_FIXTURES = [
  ["A", "México", "África do Sul"], ["A", "Coreia do Sul", "Chéquia"],
  ["B", "Canadá", "Bósnia e Herzegovina"], ["B", "Catar", "Suíça"],
  ["C", "Brasil", "Marrocos"], ["C", "Haiti", "Escócia"],
  ["D", "Estados Unidos", "Paraguai"], ["D", "Austrália", "Turquia"],
  ["E", "Alemanha", "Curaçao"], ["E", "Costa do Marfim", "Equador"],
  ["F", "Países Baixos", "Japão"], ["F", "Suécia", "Tunísia"],
  ["G", "Bélgica", "Egito"], ["G", "Irão", "Nova Zelândia"],
  ["H", "Espanha", "Cabo Verde"], ["H", "Arábia Saudita", "Uruguai"],
  ["I", "França", "Iraque"], ["I", "Noruega", "Senegal"],
  ["J", "Argentina", "Áustria"], ["J", "Jordânia", "Argélia"],
  ["K", "Portugal", "Usbequistão"], ["K", "Colômbia", "RD Congo"],
  ["L", "Inglaterra", "Gana"], ["L", "Panamá", "Croácia"],
];

const widget = new ListWidget();
widget.backgroundGradient = makeBackground(UI.liveBgTop, UI.liveBgBottom);
widget.setPadding(0, 0, 0, 0);
widget.refreshAfterDate = new Date(Date.now() + CONFIG.refreshMinutes * 60 * 1000);
widget.url = "scriptable:///run?scriptName=" + encodeURIComponent(Script.name());

try {
  const manifest = await loadManifest();
  const data = config.runsInApp ? await chooseDebugData() : await fetchMatchData();

  if (data.live) {
    await renderScoreboardCard(widget, manifest, data.live);
  } else {
    renderScheduleCard(widget, data.matches);
  }
} catch (error) {
  renderError(widget, error);
}

if (config.runsInApp) {
  await widget.presentMedium();
}
Script.setWidget(widget);
Script.complete();

// ─────────────────────────────────────────────
// Fundo / Utilitários
// ─────────────────────────────────────────────

function makeBackground(topColor, bottomColor) {
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [topColor || COLORS.bgTop, bottomColor || COLORS.bgBottom];
  return gradient;
}

function makeStripedBackground() {
  const ctx = new DrawContext();
  ctx.size = new Size(UI.widgetWidth, UI.widgetHeight);
  ctx.opaque = false;
  ctx.respectScreenScale = true;

  ctx.setFillColor(UI.liveBgTop);
  ctx.fillRect(new Rect(0, 0, UI.widgetWidth, UI.widgetHeight));

  ctx.setFillColor(new Color("#1e2035", 0.92));
  ctx.fillRect(new Rect(UI.widgetWidth * 0.45, 0, UI.widgetWidth * 0.55, UI.widgetHeight));

  ctx.setStrokeColor(UI.stripe);
  ctx.setLineWidth(2);
  for (let x = -UI.widgetHeight; x < UI.widgetWidth + UI.widgetHeight; x += 14) {
    const path = new Path();
    path.move(new Point(x, UI.widgetHeight));
    path.addLine(new Point(x + UI.widgetHeight, 0));
    ctx.addPath(path);
    ctx.strokePath();
  }

  return ctx.getImage();
}

// ─────────────────────────────────────────────
// Ponto de entrada de depuração
// ─────────────────────────────────────────────

async function chooseDebugData() {
  const alert = new Alert();
  alert.title = "Pré-visualização de depuração";
  alert.addAction("Em direto: equipa da casa a ganhar");
  alert.addAction("Em direto: empate");
  alert.addAction("Em direto: equipa da casa a perder");
  alert.addAction("Resumo de hoje");
  alert.addAction("Próximos jogos");
  alert.addAction("Dados reais da ESPN");
  alert.addCancelAction("Sem jogos");
  const choice = await alert.presentSheet();

  if (choice === 0) {
    return { live: makeDemoLive("Argentina", "1", "França", "0", "75'"), matches: [] };
  }
  if (choice === 1) {
    return { live: makeDemoLive("Argentina", "1", "França", "1", "75'"), matches: [] };
  }
  if (choice === 2) {
    return { live: makeDemoLive("Argentina", "0", "França", "1", "75'"), matches: [] };
  }
  if (choice === 3) {
    return {
      live: null,
      matches: [
        { homeTeam: "Brasil", awayTeam: "Marrocos", day: "Hoje", dateText: monthDayLabel(new Date()), time: "20:00", state: "post", homeScore: "2", awayScore: "1" },
        { homeTeam: "Haity", awayTeam: "Escocia", day: "Hoje", dateText: monthDayLabel(new Date()), time: "20:00", state: "post", homeScore: "0", awayScore: "3" },
        { homeTeam: "EUA", awayTeam: "Paraguai", day: "Hoje", dateText: monthDayLabel(new Date()), time: "23:00", state: "pre" },
        { homeTeam: "Austrália", awayTeam: "Turquia", day: "Hoje", dateText: monthDayLabel(new Date()), time: "23:00", state: "pre" },
      ],
    };
  }
  if (choice === 4) {
    return { live: null, matches: makeStaticUpcoming().slice(0, CONFIG.maxUpcoming) };
  }
  if (choice === 5) {
    return await fetchMatchData();
  }
  return { live: null, matches: [] };
}

function makeDemoLive(homeTeam, homeScore, awayTeam, awayScore, minute) {
  return {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    minute,
    homeEvents: homeScore === "0" ? "" : "23', 52'",
    awayEvents: awayScore === "0" ? "" : "41'",
  };
}

// ─────────────────────────────────────────────
// Carregamento de dados
// ─────────────────────────────────────────────

async function loadManifest() {
  const fm = FileManager.local();
  const cacheDir = getCacheDir(fm);
  const cachePath = fm.joinPath(cacheDir, "manifest.json");
  const maxAge = 6 * 60 * 60 * 1000;

  if (fm.fileExists(cachePath)) {
    const modified = fm.modificationDate(cachePath);
    if (modified && Date.now() - modified.getTime() < maxAge) {
      return JSON.parse(fm.readString(cachePath));
    }
  }

  const req = new Request(CONFIG.manifestUrl);
  const manifest = await req.loadJSON();
  fm.writeString(cachePath, JSON.stringify(manifest));
  return manifest;
}

function getCacheDir(fm) {
  const dir = fm.joinPath(fm.documentsDirectory(), CONFIG.cacheFolder);
  if (!fm.fileExists(dir)) {
    fm.createDirectory(dir, true);
  }
  return dir;
}

async function fetchMatchData() {
  try {
    const today = new Date();
    const start = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const end = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const df = new DateFormatter();
    df.dateFormat = "yyyyMMdd";
    const url = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates="
      + df.string(start) + "-" + df.string(end) + "&_=" + Date.now();
    const res = await new Request(url).loadJSON();
    return parseEspn(res);
  } catch (error) {
    return { live: null, matches: makeStaticUpcoming().slice(0, CONFIG.maxUpcoming) };
  }
}

// ─────────────────────────────────────────────
// Análise dos dados da ESPN
// ✅ Fix 1: todayMatches passa a usar m.day === "Hoje"
// ✅ Fix 4: depois de todos os jogos de hoje terminarem, mantém os
//           resultados de hoje por 1 hora antes de mudar para os próximos jogos.
//           Janela = hora do jogo mais tardio + 90 min de jogo + 15 min de
//           intervalo + 15 min de descontos + 60 min de margem
// ─────────────────────────────────────────────

function parseEspn(res) {
  const matches = [];
  let live = null;

  for (const event of res.events || []) {
    const comp = event.competitions && event.competitions[0];
    if (!comp) continue;
    const home = comp.competitors.find((team) => team.homeAway === "home");
    const away = comp.competitors.find((team) => team.homeAway === "away");
    if (!home || !away) continue;

    const homeTeam = normalizeTeamName(home.team.name || home.team.shortDisplayName);
    const awayTeam = normalizeTeamName(away.team.name || away.team.shortDisplayName);
    if (!homeTeam || !awayTeam) continue;

    const state = event.status.type.state;
    const eventDate = new Date(event.date);

    if (state === "in" && !live) {
      live = {
        homeTeam,
        awayTeam,
        homeScore: String(home.score || "0"),
        awayScore: String(away.score || "0"),
        minute: displayMinute(event.status),
        homeEvents: scoringEvents(comp, home.team.id),
        awayEvents: scoringEvents(comp, away.team.id),
      };
    } else if (state === "post" || state === "pre") {
      matches.push({
        homeTeam,
        awayTeam,
        day: dayLabel(eventDate),
        dateText: monthDayLabel(eventDate),
        time: timeLabel(eventDate),
        state,
        homeScore: state === "post" ? String(home.score || "0") : null,
        awayScore: state === "post" ? String(away.score || "0") : null,
        _eventTimestamp: eventDate.getTime(), // ✅ usado para calcular a janela de troca
      });
    }
  }

  // ✅ Fix 1: filtra os jogos de hoje diretamente com m.day === "Hoje"
  const todayMatches = matches.filter((m) => m.day === "Hoje");
  const todayPost    = todayMatches.filter((m) => m.state === "post");
  const todayPre     = todayMatches.filter((m) => m.state === "pre");

  let displayMatches;

  if (todayMatches.length === 0) {
    // Não há jogos hoje → mostra diretamente os próximos jogos
    displayMatches = sameFirstDay(matches.filter((m) => m.state === "pre"));

  } else if (todayPre.length > 0) {
    // Ainda há jogos de hoje por disputar → mostra todos os de hoje (terminados + por disputar)
    displayMatches = todayMatches;

  } else {
    // ✅ Fix 4: todos os jogos de hoje terminaram → verifica se ainda está dentro da janela de manutenção
    // Janela = hora do jogo mais tardio + 90 (jogo) + 15 (intervalo) + 15 (descontos) + 60 (margem) = 180 minutos
    const lastTimestamp = Math.max(...todayPost.map((m) => m._eventTimestamp));
    const cutoff = lastTimestamp + 180 * 60 * 1000;

    if (Date.now() < cutoff) {
      // Ainda dentro da janela → continua a mostrar os resultados de hoje
      displayMatches = todayPost;
    } else {
      // Janela terminada → muda para os próximos jogos
      displayMatches = sameFirstDay(matches.filter((m) => m.state === "pre"));
    }
  }

  return {
    live,
    matches: displayMatches.slice(0, CONFIG.maxUpcoming),
  };
}

function normalizeTeamName(name) {
  return ESPN_NAME_MAP[name] || null;
}

function displayMinute(status) {
  const text = status.displayClock || status.type.shortDetail || "";
  const typeName = status.type.name || "";

  const isHalftime =
    /^(StatusHalftime|halftime)$/i.test(typeName) ||
    /^(HT|Half\s*Time|Intervalo)$/i.test(text.trim());

  if (isHalftime) return "Intervalo";
  if (status.type.state === "post") return "Final do jogo";
  return text.includes("'") ? text : text + "'";
}

function scoringEvents(comp, teamId) {
  const events = [];
  for (const detail of comp.details || []) {
    if (detail.scoringPlay && detail.team && detail.team.id === teamId) {
      events.push(detail.clock.displayValue);
    }
  }
  return events.join(", ");
}

function sameFirstDay(matches) {
  if (matches.length === 0) return [];
  const day = matches[0].day;
  return matches.filter((match) => match.day === day);
}

// ─────────────────────────────────────────────
// Utilitários de data / hora
// ─────────────────────────────────────────────

function dayLabel(date) {
  const today = ymd(new Date());
  const tomorrow = ymd(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const value = ymd(date);
  if (value === today) return "Hoje";
  if (value === tomorrow) return "Amanhã";
  const df = new DateFormatter();
  df.dateFormat = "MM-dd";
  return df.string(date);
}

function monthDayLabel(date) {
  const df = new DateFormatter();
  df.dateFormat = "d/M";
  return df.string(date);
}

function ymd(date) {
  const df = new DateFormatter();
  df.dateFormat = "yyyyMMdd";
  return df.string(date);
}

function timeLabel(date) {
  const df = new DateFormatter();
  df.useShortTimeStyle();
  return df.string(date);
}

function makeStaticUpcoming() {
  return STATIC_FIXTURES.map((item, index) => ({
    group: item[0],
    homeTeam: item[1],
    awayTeam: item[2],
    day: index < 4 ? "Hoje" : "Calendário",
    dateText: monthDayLabel(new Date()),
    time: ["03:00", "06:00", "09:00", "12:00"][index % 4],
    state: "pre",
  }));
}

// ─────────────────────────────────────────────
// Cartão "em direto"
// ─────────────────────────────────────────────

async function renderScoreboardCard(w, manifest, match) {
  try {
    w.backgroundImage = makeStripedBackground();
  } catch (_) {
    w.backgroundGradient = makeBackground(UI.liveBgTop, UI.liveBgBottom);
  }
  const homeScore = Number(match.homeScore);
  const awayScore = Number(match.awayScore);
  const homeEmotion = scoreEmotion(homeScore, awayScore);
  const awayEmotion = scoreEmotion(awayScore, homeScore);

  w.addSpacer(UI.liveTopGap);
  addLiveBadge(w, match.minute);
  w.addSpacer(UI.liveBadgeToNamesGap);

  const row = w.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();
  row.setPadding(0, UI.liveSidePadding, 0, UI.liveSidePadding);

  await addHeroAvatar(row, manifest, match.homeTeam, homeEmotion, "home");
  row.addSpacer(UI.avatarScoreGap);
  addScoreBlock(row, match);
  row.addSpacer(UI.avatarScoreGap);
  await addHeroAvatar(row, manifest, match.awayTeam, awayEmotion, "away");
}

function addLiveBadge(w, minute) {
  const row = w.addStack();
  row.addSpacer();
  if (UI.liveBadgeOffsetX > 0) row.addSpacer(UI.liveBadgeOffsetX);
  const badge = row.addStack();
  badge.backgroundColor = UI.liveBadge;
  badge.cornerRadius = UI.liveBadgeRadius;
  badge.setPadding(UI.liveBadgePadY, UI.liveBadgePadX, UI.liveBadgePadY, UI.liveBadgePadX);
  const text = badge.addText(liveBadgeText(minute));
  text.font = Font.heavySystemFont(UI.liveBadgeFont);
  text.textColor = Color.white();
  text.lineLimit = 1;
  if (UI.liveBadgeOffsetX < 0) row.addSpacer(Math.abs(UI.liveBadgeOffsetX));
  row.addSpacer();
}

function liveBadgeText(minute) {
  const value = String(minute || "").replace("'", "");
  if (/^\d+$/.test(value)) return value + "' EM DIRETO";
  return value || "EM DIRETO";
}

async function addHeroAvatar(row, manifest, teamName, emotion, side) {
  const box = row.addStack();
  box.layoutVertically();
  box.size = new Size(UI.avatarBox, UI.avatarBox);
  box.centerAlignContent();
  if (UI.avatarTopGap > 0) box.addSpacer(UI.avatarTopGap);
  const imageRow = box.addStack();
  imageRow.layoutHorizontally();
  imageRow.centerAlignContent();
  imageRow.addSpacer();
  const image = await loadAvatar(manifest, teamName, emotion);
  if (image) {
    const avatar = imageRow.addImage(makeAvatarCanvas(image, side));
    avatar.imageSize = new Size(UI.avatarBox, UI.avatarBox);
  } else {
    const flag = imageRow.addText(FLAGS[teamName] || "⚽");
    flag.font = Font.systemFont(64);
  }
  imageRow.addSpacer();
  if (UI.avatarBottomGap > 0) box.addSpacer(UI.avatarBottomGap);
}

function makeAvatarCanvas(image, side) {
  const ctx = new DrawContext();
  ctx.size = new Size(UI.avatarBox, UI.avatarBox);
  ctx.opaque = false;
  ctx.respectScreenScale = true;

  const imgW = image.size.width;
  const imgH = image.size.height;
  const ratio = imgW / imgH;

  let drawW, drawH;
  if (ratio >= 1) {
    drawW = UI.avatarSize;
    drawH = UI.avatarSize / ratio;
  } else {
    drawH = UI.avatarSize;
    drawW = UI.avatarSize * ratio;
  }

  const offsetX = side === "away" ? UI.awayAvatarOffsetX : UI.homeAvatarOffsetX;
  const x = (UI.avatarBox - drawW) / 2 + offsetX;
  const y = (UI.avatarBox - drawH) / 2 + UI.avatarOffsetY;
  ctx.drawImageInRect(image, new Rect(x, y, drawW, drawH));
  return ctx.getImage();
}

function addScoreBlock(row, match) {
  const col = row.addStack();
  col.layoutVertically();
  col.centerAlignContent();
  col.size = new Size(UI.scorePanelWidth, UI.scoreBlockHeight);

  const names = col.addStack();
  names.centerAlignContent();
  addCompactTeamName(names, match.homeTeam, UI.homeTeamNameOffsetX);
  addVsText(names);
  addCompactTeamName(names, match.awayTeam, UI.awayTeamNameOffsetX);

  col.addSpacer(UI.namesToScoreGap);
  const scorePanel = col.addStack();
  scorePanel.layoutHorizontally();
  scorePanel.centerAlignContent();
  if (UI.scoreGlow) {
    scorePanel.backgroundImage = makeScorePanelImage();
  } else {
    scorePanel.backgroundColor = UI.panel;
  }
  scorePanel.cornerRadius = UI.scorePanelRadius;
  scorePanel.setPadding(UI.scorePanelPadY, UI.scorePanelPadX, UI.scorePanelPadY, UI.scorePanelPadX);
  scorePanel.size = new Size(UI.scorePanelWidth, UI.scorePanelHeight);
  addScoreNumber(scorePanel, match.homeScore, scoreColor(Number(match.homeScore), Number(match.awayScore)));
  scorePanel.addSpacer(UI.scoreNumberGap);
  const dash = scorePanel.addText("-");
  dash.font = Font.heavySystemFont(UI.scoreDashFont);
  dash.textColor = UI.vs;
  scorePanel.addSpacer(UI.scoreNumberGap);
  addScoreNumber(scorePanel, match.awayScore, scoreColor(Number(match.awayScore), Number(match.homeScore)));

  col.addSpacer(5);
  const timeRow = col.addStack();
  timeRow.layoutHorizontally();
  timeRow.centerAlignContent();
  timeRow.addSpacer();
  const df = new DateFormatter();
  df.useShortTimeStyle();
  const updatedText = timeRow.addText("⟳ Atualizado " + df.string(new Date()));
  updatedText.font = Font.systemFont(8);
  updatedText.textColor = new Color("#ffffff", 0.22);
  updatedText.lineLimit = 1;
  timeRow.addSpacer();
}

function addVsText(stack) {
  const box = stack.addStack();
  box.layoutVertically();
  box.size = new Size(UI.vsWidth, 0);
  if (UI.vsTopGap > 0) box.addSpacer(UI.vsTopGap);
  const row = box.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();
  row.addSpacer(Math.max(0, UI.vsOffsetX));
  const vs = row.addText("vs");
  vs.font = Font.heavySystemFont(UI.vsFont);
  vs.textColor = UI.vs;
  vs.lineLimit = 1;
  row.addSpacer(Math.max(0, -UI.vsOffsetX));
  if (UI.vsBottomGap > 0) box.addSpacer(UI.vsBottomGap);
}

function makeScorePanelImage() {
  const width = UI.scorePanelWidth;
  const height = UI.scorePanelHeight;
  const ctx = new DrawContext();
  ctx.size = new Size(width, height);
  ctx.opaque = false;
  ctx.respectScreenScale = true;

  for (let i = 0; i < 6; i++) {
    const inset = i * Math.max(1, UI.scoreGlowRadius / 10);
    const alpha = UI.scoreGlowOpacity * (1 - i / 7);
    ctx.setFillColor(new Color(UI.scoreGlowColor, alpha));
    ctx.fillEllipse(new Rect(inset, Math.max(0, height * 0.16 - i), width - inset * 2, height * 0.68 + i * 2));
  }

  ctx.setFillColor(UI.panel);
  ctx.fillRect(new Rect(0, 0, width, height));
  return ctx.getImage();
}

function addCompactTeamName(stack, teamName, offsetX) {
  const box = stack.addStack();
  box.size = new Size(UI.teamNameWidth, 0);
  box.centerAlignContent();
  const leftPad = Math.max(0, offsetX || 0);
  const rightPad = Math.max(0, -(offsetX || 0));
  box.addSpacer(leftPad || null);
  const name = box.addText(displayName(teamName));
  name.font = Font.heavySystemFont(UI.teamNameFont);
  name.textColor = COLORS.text;
  name.lineLimit = 1;
  name.minimumScaleFactor = UI.teamNameMinScale;
  box.addSpacer(rightPad || null);
}

function addScoreNumber(stack, value, color) {
  const text = stack.addText(String(value));
  text.font = Font.blackSystemFont(UI.scoreFont);
  text.textColor = color || COLORS.text;
  text.lineLimit = 1;
}

function scoreColor(teamScore, opponentScore) {
  if (teamScore === opponentScore) return UI.scoreDraw;
  if (teamScore > opponentScore) return UI.scoreWin;
  return UI.scoreLose;
}

function scoreEmotion(teamScore, opponentScore) {
  if (teamScore > opponentScore) return "happy";
  if (teamScore < opponentScore) return "sad";
  return "neutral";
}

async function loadAvatar(manifest, teamName, emotion) {
  const team = manifest.teams.find((item) => item.name === teamName);
  if (!team) return null;

  const url = team.avatars[emotion];
  if (!url) return null;

  const fm = FileManager.local();
  const cacheDir = getCacheDir(fm);
  const fileName = teamName + "_" + emotion + ".png";
  const localPath = fm.joinPath(cacheDir, fileName);

  if (fm.fileExists(localPath)) {
    return fm.readImage(localPath);
  }

  const image = await new Request(url).loadImage();
  fm.writeImage(localPath, image);
  return image;
}

// ─────────────────────────────────────────────
// Cartão de calendário
// ✅ Fix 2: calcula a hora do primeiro/último jogo de hoje e passa para addScheduleHeader
// ─────────────────────────────────────────────

function renderScheduleCard(w, matches) {
  w.backgroundGradient = makeBackground(UI.scheduleBgTop, UI.scheduleBgBottom);
  w.setPadding(12, UI.schedulePaddingRight, 8, UI.schedulePaddingLeft);

  if (matches.length === 0) {
    addScheduleHeader(w, { day: "Hoje", dateText: monthDayLabel(new Date()) }, "", "");
    w.addSpacer(18);
    const row = w.addStack();
    row.addSpacer();
    const text = row.addText("Sem jogos por agora, aproveite para descansar");
    text.font = Font.mediumSystemFont(14);
    text.textColor = COLORS.muted;
    row.addSpacer();
    w.addSpacer();
    return;
  }

  const firstTime = matches[0]?.time ?? "";
  const lastTime  = matches[matches.length - 1]?.time ?? "";

  addScheduleHeader(w, matches[0], firstTime, lastTime);
  w.addSpacer(6);
  const card = w.addStack();
  card.layoutVertically();
  card.backgroundColor = new Color("#121b30", 0.7);
  card.cornerRadius = 10;
  card.setPadding(0, 0, 0, 0);
  for (let i = 0; i < Math.min(matches.length, 4); i++) {
    addScheduleRow(card, matches[i]);
    if (i < Math.min(matches.length, 4) - 1) card.addSpacer(4);
  }
}

function addScheduleHeader(w, match, firstTime, lastTime) {
  const header = w.addStack();
  header.layoutHorizontally();
  header.centerAlignContent();

  const day = header.addText(match.day || "Hoje");
  day.font = Font.heavySystemFont(18);
  day.textColor = COLORS.text;
  day.lineLimit = 1;

  header.addSpacer(8);

  let timeRange = "";
  if (firstTime && lastTime && firstTime !== lastTime) {
    timeRange = " · " + firstTime + "–" + lastTime;
  } else if (firstTime) {
    timeRange = " · " + firstTime;
  }

  const sub = header.addText(
    (match.dateText || monthDayLabel(new Date())) + timeRange
  );
  sub.font = Font.heavySystemFont(12);
  sub.textColor = COLORS.muted;
  sub.lineLimit = 1;
  sub.minimumScaleFactor = 0.75;

  header.addSpacer();
  const brand = header.addText("🏆 FIFA");
  brand.font = Font.heavySystemFont(15);
  brand.textColor = UI.trophy;
  brand.lineLimit = 1;
}

// ✅ Fix 3: a cor do resultado distingue os três estados vitória / empate / derrota
function addScheduleRow(card, match) {
  const row = card.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();
  row.backgroundColor = UI.scheduleRow;
  row.cornerRadius = 8;
  row.setPadding(3, 8, 3, 8);
  row.size = new Size(UI.scheduleRowWidth, UI.scheduleRowHeight);

  addFixedText(row, match.time, 45, Font.heavySystemFont(13), COLORS.muted, "left", 0.8);
  addScheduleTeam(row, match.homeTeam, false);
  addFixedText(row, "VS", 30, Font.heavySystemFont(13), UI.vs, "center", 1);
  addScheduleTeam(row, match.awayTeam, true);

  if (match.state === "post") {
    const h = Number(match.homeScore);
    const a = Number(match.awayScore);
    const resultText = match.homeScore + "-" + match.awayScore;
    const resultColor = h === a ? UI.scoreDraw : h > a ? UI.scoreWin : UI.scoreLose;
    addFixedText(row, resultText, 45, Font.heavySystemFont(13), resultColor, "right", 0.8);
  } else {
    addFixedText(row, "Por jogar", 45, Font.heavySystemFont(11), COLORS.faint, "right", 0.8);
  }
}

function addFixedText(row, value, width, font, color, align, scale) {
  const box = row.addStack();
  box.size = new Size(width, 0);
  box.centerAlignContent();
  if (align === "right") box.addSpacer();
  const time = box.addText(value);
  time.font = font;
  time.textColor = color;
  time.lineLimit = 1;
  time.minimumScaleFactor = scale;
  if (align === "center") {
    time.centerAlignText();
  } else if (align === "right") {
    time.rightAlignText();
  }
  if (align === "left" || align === "center") box.addSpacer();
}

function addScheduleTeam(row, name, flagAfter) {
  const team = row.addStack();
  team.layoutHorizontally();
  team.centerAlignContent();
  team.size = new Size(80, 0);

  if (!flagAfter) addScheduleFlag(team, name);
  const text = team.addText(displayName(name));
  text.font = Font.heavySystemFont(13);
  text.textColor = COLORS.text;
  text.lineLimit = 1;
  text.minimumScaleFactor = 0.65;
  if (flagAfter) addScheduleFlag(team, name);
}

function addScheduleFlag(team, name) {
  const flag = team.addText((FLAGS[name] || "⚽") + " ");
  flag.font = Font.systemFont(10);
  flag.textColor = COLORS.text;
  flag.lineLimit = 1;
}

function addTiny(stack, value) {
  const text = stack.addText(value);
  text.font = Font.mediumSystemFont(10);
  text.textColor = COLORS.muted;
  text.lineLimit = 1;
}

function addFooter(w) {
  w.addSpacer();
  const row = w.addStack();
  row.addSpacer();
  const df = new DateFormatter();
  df.useShortTimeStyle();
  const text = row.addText("Atualizado em " + df.string(new Date()));
  text.font = Font.systemFont(8);
  text.textColor = COLORS.faint;
}

function renderError(w, error) {
  w.backgroundGradient = makeBackground(UI.scheduleBgTop, UI.scheduleBgBottom);
  w.setPadding(16, 20, 10, 22);
  addScheduleHeader(w, { day: "FIFA", dateText: monthDayLabel(new Date()) }, "", "");
  w.addSpacer(14);
  const text = w.addText("Falha ao carregar: " + error.message);
  text.font = Font.systemFont(12);
  text.textColor = COLORS.live;
  text.lineLimit = 3;
}
