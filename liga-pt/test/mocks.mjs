// ─────────────────────────────────────────────
// Mocks das APIs do Scriptable para Node.js
// ─────────────────────────────────────────────

// DateFormatter — suporta padrões: yyyyMMdd, d/M, MM-dd, useShortTimeStyle()
class DateFormatter {
    constructor() {
        this._fmt = null;
        this._style = null;
    }
    set dateFormat(p) { this._fmt = p; this._style = null; }
    useShortTimeStyle() { this._style = "short"; this._fmt = null; }
    string(date) {
        if (this._style === "short") {
            return new Intl.DateTimeFormat("pt-PT", { hour: "2-digit", minute: "2-digit" }).format(date);
        }
        return _fmtDate(date, this._fmt);
    }
}

function _fmtDate(d, pat) {
    const dd = String(d.getDate()).padStart(2, "0");
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = String(d.getFullYear());
    return pat.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd).replace("d/", d.getDate() + "/");
}

// Color
class Color {
    constructor(hex = "#000000", alpha = 1) {
        this.hex = hex.startsWith("#") ? hex : "#" + hex;
        this.alpha = alpha;
    }
    static white() { return new Color("#ffffff", 1); }
    toString() { return this.hex; }
}

// Font
class Font {
    constructor(size, weight) { this.size = size; this.weight = weight; }
    static heavySystemFont(s) { return new Font(s, "heavy"); }
    static mediumSystemFont(s) { return new Font(s, "medium"); }
    static systemFont(s) { return new Font(s, "regular"); }
    static blackSystemFont(s) { return new Font(s, "black"); }
}

// LinearGradient
class LinearGradient {
    constructor() { this.locations = []; this.colors = []; }
}

// Rect, Size, Point
class Rect { constructor(x, y, w, h) { this.x = x; this.y = y; this.width = w; this.height = h; } }
class Size { constructor(w, h) { this.width = w; this.height = h; } }
class Point { constructor(x, y) { this.x = x; this.y = y; } }

// Path
class Path {
    constructor() { this.segments = []; }
    move(p) { this.segments.push({ type: "move", x: p.x, y: p.y }); }
    addLine(p) { this.segments.push({ type: "line", x: p.x, y: p.y }); }
}

// Image
class Image {
    constructor(w = 500, h = 500) { this.size = new Size(w, h); }
}

// DrawContext — regista operações de desenho
class DrawContext {
    constructor() {
        this.size = new Size(0, 0);
        this.opaque = true;
        this.respectScreenScale = false;
        this._ops = [];
    }
    setFillColor(c) { this._ops.push({ op: "setFillColor", color: c }); }
    setStrokeColor(c) { this._ops.push({ op: "setStrokeColor", color: c }); }
    setLineWidth(w) { this._ops.push({ op: "setLineWidth", width: w }); }
    fillRect(r) { this._ops.push({ op: "fillRect", rect: r }); }
    fillEllipse(r) { this._ops.push({ op: "fillEllipse", rect: r }); }
    addPath(p) { this._ops.push({ op: "addPath", path: p }); }
    strokePath() { this._ops.push({ op: "strokePath" }); }
    drawImageInRect(img, r) { this._ops.push({ op: "drawImage", image: img, rect: r }); }
    getImage() { return new Image(this.size.width, this.size.height); }
}

// WidgetNode — base para ListWidget e Stack
class WidgetNode {
    constructor(type) {
        this.type = type;
        this.children = [];
        this.props = {};
    }
    addStack() { const s = new WidgetNode("Stack"); this.children.push(s); return s; }
    addSpacer(gap) { this.children.push({ type: "Spacer", gap }); }
    addText(value) { const t = new WidgetNode("Text"); t.props.value = value; this.children.push(t); return t; }
    addImage(img) { const i = new WidgetNode("Image"); i.props.image = img; this.children.push(i); return i; }
    layoutHorizontally() { this.props.layout = "horizontal"; }
    layoutVertically() { this.props.layout = "vertical"; }
    centerAlignContent() { this.props.align = "center"; }
    centerAlignText() { this.props.textAlign = "center"; }
    rightAlignText() { this.props.textAlign = "right"; }
    setPadding(a, b, c, d) { this.props.padding = [a, b, c, d]; }
    set size(s) { this.props.size = s; }
    set backgroundColor(c) { this.props.backgroundColor = c; }
    set backgroundImage(img) { this.props.backgroundImage = img; }
    set backgroundGradient(g) { this.props.backgroundGradient = g; }
    set cornerRadius(r) { this.props.cornerRadius = r; }
}

// ListWidget
class ListWidget extends WidgetNode {
    constructor() {
        super("ListWidget");
        this.refreshAfterDate = null;
        this.url = "";
    }
    async presentMedium() { /* no-op em teste */ }
}

// Request — usa fetch() do Node.js
class Request {
    constructor(url) { this.url = url; }
    async loadJSON() {
        const res = await fetch(this.url);
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${this.url}`);
        return res.json();
    }
    async loadImage() {
        const res = await fetch(this.url);
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${this.url}`);
        const buf = Buffer.from(await res.arrayBuffer());
        const img = new Image();
        img._buffer = buf;
        return img;
    }
}

// FileManager — usa fs do Node.js com cache em /tmp
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

class FileManager {
    static local() { return new FileManager(); }
    documentsDirectory() { return "/tmp/liga-pt-cache"; }
    joinPath(a, b) { return join(a, b); }
    fileExists(p) { return existsSync(p); }
    createDirectory(p, recursive) { mkdirSync(p, { recursive: recursive !== false }); }
    modificationDate(p) { return statSync(p).mtime; }
    readString(p) { return readFileSync(p, "utf-8"); }
    writeString(p, data) { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, data, "utf-8"); }
    readImage(p) { return new Image(); }
    writeImage(p, img) { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, img._buffer || Buffer.alloc(0)); }
}

// Alert
const ALERT_DEFAULT = Number(process.env.DEFAULT_CHOICE ?? "0");
class Alert {
    constructor() { this.title = ""; this._actions = []; this._cancel = null; }
    addAction(t) { this._actions.push(t); }
    addCancelAction(t) { this._cancel = t; }
    async presentSheet() { return ALERT_DEFAULT; }
}

// Script
class Script {
    static name() { return "liga-pt-test"; }
    static setWidget(w) { globalThis.__widget = w; }
    static complete() { /* no-op */ }
}

// config
const config = { runsInApp: false };

// ─────────────────────────────────────────────
// Exporta tudo para globalThis
// ─────────────────────────────────────────────

const mocks = {
    DateFormatter, Color, Font, LinearGradient,
    Rect, Size, Point, Path, Image, DrawContext,
    WidgetNode, ListWidget,
    Request, FileManager, Alert, Script, config,
};

for (const [name, value] of Object.entries(mocks)) {
    globalThis[name] = value;
}
