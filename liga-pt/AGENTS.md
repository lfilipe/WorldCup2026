# AGENTS.md

## What this is

Single-file iOS Scriptable widget (`liga-pt.cjs`) showing **Liga Portugal** match data. Runs inside the [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) app on iOS — not Node.js, not a browser.

## Key files

- `liga-pt.cjs` — the entire widget. ~940 lines of CommonJS.
- `test/mocks.mjs` — mocks of Scriptable APIs for Node.js testing.
- `test/run.mjs` — test runner: loads mocks, executes the widget, outputs JSON.

## Runtime constraints

- **Scriptable APIs only**: `DrawContext`, `LinearGradient`, `ListWidget`, `Request`, `FileManager`, `Color`, `Font`, `Rect`, `Size`, `Path`, `Alert`, `DateFormatter`, `Script`. These are NOT available in Node.js or browsers.
- **No standard JS globals**: no `document`, no `window`, no `fetch` (use `Request`), no `setTimeout`.
- **CommonJS format** despite `"type": "module"` in `package.json` — the `.cjs` extension is deliberate for Scriptable compatibility.

## Data flow

1. Fetches live/scheduled match data from ESPN API (`site.api.espn.com/apis/site/v2/sports/soccer/por.1/scoreboard`).
2. Team names arrive from ESPN → mapped to Portuguese display names via `ESPN_NAME_MAP`.
3. Team logos come directly from the ESPN API response (`team.logo`), cached locally.
4. Falls back to `STATIC_FIXTURES` if ESPN API fails.

## Display logic

- **Live match** (state `"in"`): renders scoreboard card with logos, score, minute, scoring events.
- **Scheduled/completed** (state `"pre"` or `"post"`): renders calendar card with up to 3 matches.
- After all today's matches finish, results stay visible for ~180 minutes before switching to upcoming fixtures.

## Team names

All user-facing team names are in Portuguese. The 18 Liga Portugal teams:
Académico de Viseu, Alverca, Arouca, Benfica, Braga, Casa Pia, Estoril, Estrela, Famalicão, FC Porto, Gil Vicente, Marítimo, Moreirense, Nacional, Rio Ave, Santa Clara, Sporting CP, Vitória SC.

When adding or changing team data:
- Update `ESPN_NAME_MAP` if the ESPN `name` field differs from the display name.
- Update `FLAGS` if adding a new team (all Portuguese clubs use 🇵🇹).
- Update `STATIC_FIXTURES` for offline fallback.

## Testing in Node.js

The widget can be tested outside Scriptable using mock APIs:

```bash
node test/run.mjs
```

This fetches real data from ESPN and generates `test/widget.html` — a visual simulation of the widget that you can open in a browser. The `test/mocks.mjs` file stubs all Scriptable APIs (DrawContext, ListWidget, FileManager, etc.) so the widget code runs unmodified in Node.

To view the widget preview:
```bash
open test/widget.html       # macOS
xdg-open test/widget.html   # Linux
```

## No tooling

There is no linter, formatter, type checker, test suite, or build step configured. There are no CI workflows. Edits are validated by running `node test/run.mjs` or in Scriptable directly.
