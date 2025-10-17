// generate-normalize-svgIcons2.ts
// Normalizes SVGs by replacing literal colors and internal vars with CSS vars (--icon-colorN),
// preserving chained relationships, filters, gradients, and symbols.

import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import * as CSS from "css";

const INPUT_DIR = path.resolve("src/Data/Icons");
const OUTPUT_DIR = path.resolve("public/Icons");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ------------------------------
// Color utilities
// ------------------------------
function toLowerTrim(s: string) {
  return s.trim().toLowerCase();
}

function isHexColor(v: string) {
  return /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v.trim());
}

function rgbToHex(r: number, g: number, b: number) {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

function parseRgbToHex(v: string): string | null {
  const m = v
    .trim()
    .toLowerCase()
    .match(/^rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(?:\s*,\s*[0-9.]+)?\s*\)$/);
  if (!m) return null;
  const r = Math.min(255, parseInt(m[1]));
  const g = Math.min(255, parseInt(m[2]));
  const b = Math.min(255, parseInt(m[3]));
  return rgbToHex(r, g, b);
}

function isLiteralColor(v: string) {
  const t = toLowerTrim(v);
  if (!t) return false;
  if (t === "none") return false;
  if (t.startsWith("url(")) return false;
  if (t.startsWith("var(")) return false;
  return isHexColor(t) || !!parseRgbToHex(t);
}

function normalizeColorLiteral(v: string): string {
  const t = toLowerTrim(v);
  if (isHexColor(t)) return t;
  const hex = parseRgbToHex(t);
  return hex ? hex : t;
}

function isVarRef(v: string) {
  return /^\s*var\(\s*--[A-Za-z0-9_-]+\s*(?:,\s*[^)]+)?\)\s*$/.test(v);
}

function extractVarName(v: string): string | null {
  const m = v.match(/var\(\s*(--[A-Za-z0-9_-]+)\s*(?:,.*)?\)/);
  return m ? m[1] : null;
}

// ------------------------------
// Helpers
// ------------------------------
function stripCdata(txt: string) {
  return txt.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
}

type VarMap = Map<string, string>;
type ColorMap = Map<string, string>;

// include filters as color properties
const COLOR_PROPS = new Set([
  "fill",
  "stroke",
  "stop-color",
  "flood-color",
  "lighting-color",
  "color-interpolation-filters",
]);

function ensureColorVarForLiteral(
  literal: string,
  colorMap: ColorMap,
  discoveredOrder?: string[]
): string {
  const norm = normalizeColorLiteral(literal);
  if (colorMap.has(norm)) return colorMap.get(norm)!;
  const next = `--icon-color${colorMap.size}`;
  colorMap.set(norm, next);
  if (discoveredOrder) discoveredOrder.push(norm);
  return next;
}

// ------------------------------
// CSS Parsing
// ------------------------------
function collectDefinedVarsFromCss(cssText: string): VarMap {
  const map: VarMap = new Map();
  let ast: CSS.Stylesheet | null = null;
  try {
    ast = CSS.parse(cssText, { silent: true });
  } catch {
    return map;
  }
  if (!ast || !ast.stylesheet) return map;

  for (const rule of ast.stylesheet.rules ?? []) {
    if (rule.type !== "rule") continue;
    for (const decl of (rule as CSS.Rule).declarations ?? []) {
      const d = decl as CSS.Declaration;
      if (!d.property || !d.value) continue;
      if (d.property.startsWith("--")) {
        map.set(d.property.trim(), d.value.trim());
      }
    }
  }
  return map;
}

function collectDefinedVarsFromSvgRoot(svg: Element): VarMap {
  const map: VarMap = new Map();
  const styleAttr = svg.getAttribute("style");
  if (!styleAttr) return map;
  for (const part of styleAttr.split(";")) {
    const p = part.trim();
    if (!p) continue;
    const m = p.match(/^(--[A-Za-z0-9_-]+)\s*:\s*(.+)$/);
    if (!m) continue;
    map.set(m[1], m[2].trim());
  }
  return map;
}

// normalize internal var definitions: replace literal leafs with our vars
function normalizeDefinedVars(
  definedVars: VarMap,
  colorMap: ColorMap,
  discoveredOrder: string[]
): VarMap {
  const newVars: VarMap = new Map();

  for (const [name, val] of definedVars.entries()) {
    if (isLiteralColor(val)) {
      const varName = ensureColorVarForLiteral(val, colorMap, discoveredOrder);
      newVars.set(name, `var(${varName})`);
    } else if (isVarRef(val)) {
      const ref = extractVarName(val)!;
      // keep chains intact
      if (definedVars.has(ref)) newVars.set(name, val);
      else newVars.set(name, val); // leave external as-is
    } else {
      newVars.set(name, val);
    }
  }

  return newVars;
}

// Replace literal colors and internal var refs in CSS rules
function replaceColorDeclarationsInCss(
  cssText: string,
  colorMap: ColorMap,
  definedVars: VarMap,
  discoveredOrder: string[]
): string {
  let ast: CSS.Stylesheet | null = null;
  try {
    ast = CSS.parse(cssText, { silent: true });
  } catch {
    return cssText;
  }
  if (!ast?.stylesheet) return cssText;

  for (const rule of ast.stylesheet.rules ?? []) {
    if (rule.type !== "rule") continue;
    for (const decl of (rule as CSS.Rule).declarations ?? []) {
      const d = decl as CSS.Declaration;
      if (!d.property || !d.value) continue;
      const prop = d.property.toLowerCase();

      if (COLOR_PROPS.has(prop)) {
        let val = d.value.trim();
        if (isLiteralColor(val)) {
          const lit = normalizeColorLiteral(val);
          const varName = ensureColorVarForLiteral(lit, colorMap, discoveredOrder);
          d.value = `var(${varName})`;
        } else if (isVarRef(val)) {
          const ref = extractVarName(val)!;
          if (definedVars.has(ref)) {
            const defVal = definedVars.get(ref)!;
            if (isLiteralColor(defVal)) {
              const varName = ensureColorVarForLiteral(defVal, colorMap, discoveredOrder);
              d.value = `var(${varName})`;
            } else if (isVarRef(defVal)) {
              // chain var
              d.value = defVal;
            }
          }
        }
      }
    }
  }

  return CSS.stringify(ast, { compress: true });
}

// ------------------------------
// Inline style processing
// ------------------------------
function rewriteInlineStyleValue(
  styleText: string,
  colorMap: ColorMap,
  definedVars: VarMap,
  discoveredOrder: string[]
): string {
  const parts = styleText.split(";");
  const out: string[] = [];

  for (const part of parts) {
    const p = part.trim();
    if (!p) continue;
    const m = p.match(/^([A-Za-z-]+)\s*:\s*(.+)$/);
    if (!m) {
      out.push(p);
      continue;
    }

    const prop = m[1].toLowerCase();
    let val = m[2].trim();

    if (COLOR_PROPS.has(prop)) {
      if (isLiteralColor(val)) {
        const varName = ensureColorVarForLiteral(val, colorMap, discoveredOrder);
        val = `var(${varName})`;
      } else if (isVarRef(val)) {
        const ref = extractVarName(val)!;
        if (definedVars.has(ref)) {
          const defVal = definedVars.get(ref)!;
          if (isLiteralColor(defVal)) {
            const varName = ensureColorVarForLiteral(defVal, colorMap, discoveredOrder);
            val = `var(${varName})`;
          }
        }
      }
    }
    out.push(`${prop}:${val}`);
  }

  return out.join(";");
}

// ------------------------------
// Core transformation
// ------------------------------
function transformSvgString(svgSource: string) {
  const { window } = new JSDOM(svgSource, { contentType: "image/svg+xml" });
  const doc = window.document;
  const svg = doc.querySelector("svg");
  if (!svg) throw new Error("Invalid SVG: missing <svg>");

  const styleEls = Array.from(doc.querySelectorAll("style"));
  const rawCssBlocks = styleEls.map((el) => stripCdata(el.textContent || ""));

  // collect vars defined inside SVG
  const definedVars: VarMap = new Map([...collectDefinedVarsFromSvgRoot(svg)]);
  for (const cssText of rawCssBlocks) {
    for (const [k, v] of collectDefinedVarsFromCss(cssText)) {
      if (!definedVars.has(k)) definedVars.set(k, v);
    }
  }

  const colorMap: ColorMap = new Map();
  const discoveredOrder: string[] = [];

  // normalize internal var definitions
  const normalizedVars = normalizeDefinedVars(definedVars, colorMap, discoveredOrder);

  // rewrite CSS blocks
  rawCssBlocks.forEach((cssText, idx) => {
    const rewritten = replaceColorDeclarationsInCss(cssText, colorMap, normalizedVars, discoveredOrder);
    styleEls[idx].textContent = rewritten;
  });

  // traverse DOM including symbols and defs
  const walker = doc.createTreeWalker(svg, window.NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();
  while (node) {
    const el = node as Element;
    const tag = el.tagName.toLowerCase();

    const attrsToCheck = ["fill", "stroke"];
    if (tag === "stop") attrsToCheck.push("stop-color");
    if (tag.startsWith("fe")) attrsToCheck.push("flood-color", "lighting-color");

    for (const attr of attrsToCheck) {
      const valRaw = el.getAttribute(attr);
      if (!valRaw) continue;
      let val = valRaw.trim();

      if (isLiteralColor(val)) {
        const varName = ensureColorVarForLiteral(val, colorMap, discoveredOrder);
        el.setAttribute(attr, `var(${varName})`);
      } else if (isVarRef(val)) {
        const ref = extractVarName(val)!;
        if (normalizedVars.has(ref)) {
          const defVal = normalizedVars.get(ref)!;
          if (isLiteralColor(defVal)) {
            const varName = ensureColorVarForLiteral(defVal, colorMap, discoveredOrder);
            el.setAttribute(attr, `var(${varName})`);
          } else {
            el.setAttribute(attr, defVal);
          }
        }
      }
    }

    if (el.hasAttribute("style")) {
      const newStyle = rewriteInlineStyleValue(el.getAttribute("style") || "", colorMap, normalizedVars, discoveredOrder);
      el.setAttribute("style", newStyle);
    }

    node = walker.nextNode();
  }

  // aspect ratio
  let aspectRatio: number | undefined;
  const viewBox = svg.getAttribute("viewBox");
  if (viewBox) {
    const p = viewBox.trim().split(/[\s,]+/);
    if (p.length >= 4) {
      const w = parseFloat(p[2]);
      const h = parseFloat(p[3]);
      if (isFinite(w) && isFinite(h) && w > 0 && h > 0) aspectRatio = w / h;
    }
  }

  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  if (aspectRatio !== undefined) svg.setAttribute("data-aspect-ratio", aspectRatio.toString());

  // add all color vars to root
  const varTokens: string[] = [];
  for (const [lit, varName] of colorMap.entries()) {
    varTokens.push(`;${varName}:${lit}`);
  }

  // reapply normalized internal vars as well
  for (const [k, v] of normalizedVars.entries()) {
    varTokens.push(`;${k}:${v}`);
  }

  const styleBoilerplate = [
    ";display:block",
    aspectRatio ? `;aspect-ratio:${aspectRatio}` : "",
  ];
  const currentStyle = svg.getAttribute("style") || "";
  svg.setAttribute("style", currentStyle + styleBoilerplate.join("") + varTokens.join(""));

  if (discoveredOrder.length) svg.setAttribute("data-original-colors", discoveredOrder.join(","));

  const meta = doc.createElement("metadata");
  meta.textContent = JSON.stringify({
    aspectRatio: aspectRatio ?? null,
    originalColors: discoveredOrder,
  });
  svg.appendChild(meta);

  return { svg: svg.outerHTML, aspectRatio, originalColors: discoveredOrder };
}

// ------------------------------
// Runner
// ------------------------------
function run() {
  ensureDir(OUTPUT_DIR);
  const files = fs.readdirSync(INPUT_DIR).filter(f => f.toLowerCase().endsWith(".svg"));
  if (files.length === 0) return console.warn("No .svg icons found");

  console.log(`Transforming ${files.length} icons...`);
  for (const file of files) {
    const src = path.join(INPUT_DIR, file);
    const dest = path.join(OUTPUT_DIR, file);
    try {
      const srcText = fs.readFileSync(src, "utf8");
      const { svg, originalColors, aspectRatio } = transformSvgString(srcText);
      fs.writeFileSync(dest, svg, "utf8");
      console.log(`✅ ${file} | colors:${originalColors.length} aspect:${aspectRatio ?? "?"}`);
    } catch (e: any) {
      console.error(`❌ ${file}: ${e?.message || e}`);
    }
  }
  console.log(`Done → ${OUTPUT_DIR}`);
}

if (require.main === module) run();
