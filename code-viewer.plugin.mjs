// Dev-only source code viewer for E2B/local previews.
//
// Exposes a read-only file tree + code viewer at `/__src` (plus JSON APIs
// `/__src/tree` and `/__src/file?path=<rel>`).
//
// PRODUCTION SAFETY: this plugin only registers a `configureServer` hook,
// which Vite runs exclusively under `astro dev`. `astro build` never calls
// it, so `/__src` cannot leak into the static build. Verified by checking
// that `dist/__src` does not exist after build.

import fs from 'node:fs';
import path from 'node:path';

const ROUTE = '/__src';
const MAX_FILE_BYTES = 256 * 1024;
const MAX_TREE_FILES = 3000;

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', '.astro', '.vercel', '.netlify',
  '.cache', 'coverage',
]);
const BINARY_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.svg',
  '.woff', '.woff2', '.ttf', '.otf', '.eot', '.mp4', '.webm', '.mp3',
  '.pdf', '.zip', '.tar', '.gz',
]);

/** Resolve a user-supplied relative path safely inside root. Returns null if unsafe. */
function safeResolve(root, rel) {
  if (typeof rel !== 'string' || rel.length === 0 || rel.length > 512) return null;
  const norm = path.posix.normalize(rel.replace(/\\/g, '/'));
  if (norm.startsWith('..') || path.posix.isAbsolute(norm)) return null;
  const abs = path.join(root, norm);
  if (abs !== root && !abs.startsWith(root + path.sep)) return null;
  return { rel: norm, abs };
}

function buildTree(root) {
  let count = 0;
  function walk(dirAbs, dirRel) {
    const entries = fs.readdirSync(dirAbs, { withFileTypes: true })
      .sort((a, b) => (a.isDirectory() === b.isDirectory()
        ? a.name.localeCompare(b.name)
        : a.isDirectory() ? -1 : 1));
    const nodes = [];
    for (const e of entries) {
      if (count >= MAX_TREE_FILES) break;
      const rel = dirRel ? `${dirRel}/${e.name}` : e.name;
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        nodes.push({ name: e.name, path: rel, type: 'dir', children: walk(path.join(dirAbs, e.name), rel) });
      } else if (e.isFile()) {
        count += 1;
        nodes.push({ name: e.name, path: rel, type: 'file' });
      }
    }
    return nodes;
  }
  return walk(root, '');
}

function readFileSafe(root, rel) {
  const r = safeResolve(root, rel);
  if (!r) return { status: 400, body: 'Bad path' };
  let stat;
  try { stat = fs.statSync(r.abs); } catch { return { status: 404, body: 'Not found' }; }
  if (!stat.isFile()) return { status: 400, body: 'Not a file' };
  if (stat.size > MAX_FILE_BYTES) return { status: 413, body: 'File too large' };
  if (BINARY_EXTS.has(path.extname(r.abs).toLowerCase())) return { status: 415, body: 'Binary file' };
  const buf = fs.readFileSync(r.abs);
  if (buf.includes(0)) return { status: 415, body: 'Binary file' };
  return { status: 200, body: buf.toString('utf8') };
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const PAGE = (projectName) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(projectName)} — Source</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body { background: #111; color: #e8e6e1; font: 13px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; display: flex; flex-direction: column; }
  header { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid #262626; background: #141414; flex: none; }
  header .name { font-weight: 700; letter-spacing: .04em; }
  header .file { color: #9a978f; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
  header a { color: #d8b56b; text-decoration: none; border: 1px solid #3a352a; padding: 4px 10px; }
  header a:hover { background: #1e1a12; }
  .wrap { display: flex; flex: 1; min-height: 0; }
  nav { width: 280px; flex: none; overflow: auto; border-right: 1px solid #262626; background: #141414; padding: 8px 0; }
  nav details { padding-left: 12px; }
  nav details > summary { cursor: pointer; padding: 2px 8px 2px 0; color: #b8b4aa; list-style: none; white-space: nowrap; }
  nav details > summary::-webkit-details-marker { display: none; }
  nav details > summary::before { content: '▸ '; color: #6a675f; }
  nav details[open] > summary::before { content: '▾ '; }
  nav .f { display: block; padding: 2px 8px 2px 24px; color: #8f8c84; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  nav .f:hover { color: #e8e6e1; background: #1b1b1b; }
  nav .f.active { color: #d8b56b; background: #1e1a12; }
  main { flex: 1; overflow: auto; min-width: 0; }
  main .empty { padding: 40px; color: #6a675f; }
  pre { padding: 16px 0; tab-size: 2; }
  .line { display: flex; min-width: max-content; }
  .line:hover { background: #171717; }
  .ln { width: 56px; flex: none; text-align: right; padding-right: 16px; color: #4a4842; user-select: none; }
  .lc { padding-right: 32px; white-space: pre; }
  .c-com { color: #6a675f; font-style: italic; }
  .c-str { color: #a8c686; }
  .c-num { color: #d8b56b; }
  .c-kw { color: #c98f7d; }
  .err { padding: 40px; color: #c96a5e; }
  @media (max-width: 720px) { nav { width: 200px; } }
</style>
</head>
<body>
<header>
  <a href="/">← Preview</a>
  <span class="name">${escapeHtml(projectName)}</span>
  <span class="file" id="crumb">source</span>
</header>
<div class="wrap">
  <nav id="tree"><div class="empty" style="padding:16px">loading…</div></nav>
  <main id="code"><div class="empty">Select a file from the tree.</div></main>
</div>
<script>
const treeEl = document.getElementById('tree');
const codeEl = document.getElementById('code');
const crumbEl = document.getElementById('crumb');

function renderTree(nodes, container) {
  for (const n of nodes) {
    if (n.type === 'dir') {
      const d = document.createElement('details');
      d.open = n.path.split('/').length <= 2;
      const s = document.createElement('summary');
      s.textContent = n.name;
      s.title = n.path;
      d.appendChild(s);
      renderTree(n.children || [], d);
      container.appendChild(d);
    } else {
      const a = document.createElement('a');
      a.className = 'f';
      a.href = '#/' + n.path;
      a.textContent = n.name;
      a.title = n.path;
      a.dataset.path = n.path;
      container.appendChild(a);
    }
  }
}

async function loadFile(p) {
  crumbEl.textContent = p;
  treeEl.querySelectorAll('.f').forEach(a => a.classList.toggle('active', a.dataset.path === p));
  codeEl.innerHTML = '<div class="empty">loading…</div>';
  try {
    const res = await fetch('/__src/file?path=' + encodeURIComponent(p));
    if (!res.ok) throw new Error(await res.text());
    const text = await res.text();
    const lines = text.split('\\n');
    let html = '<pre>';
    for (let i = 0; i < lines.length; i++) {
      html += '<div class="line"><span class="ln">' + (i + 1) + '</span><span class="lc">' + highlight(lines[i]) + '\\u200b</span></div>';
    }
    codeEl.innerHTML = html + '</pre>';
  } catch (e) {
    codeEl.innerHTML = '<div class="err">' + escapeHtml('Cannot show file: ' + e.message) + '</div>';
  }
}

// Mirror of the server-side tokenizer, client-side for per-line rendering.
const KEYWORDS = new Set('const let var function return import export from default if else for while do switch case break continue new class extends this true false null undefined async await try catch finally throw typeof in of void delete instanceof'.split(' '));
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function highlight(src) {
  let out = '', i = 0, n = src.length;
  const flush = (t, cls) => { out += cls ? '<span class="' + cls + '">' + esc(t) + '</span>' : esc(t); };
  while (i < n) {
    const c = src[i], two = src.slice(i, i + 2);
    if (two === '//') { flush(src.slice(i), 'c-com'); break; }
    if (two === '/*') { const j = src.indexOf('*/', i + 2); const k = j < 0 ? n : j + 2; flush(src.slice(i, k), 'c-com'); i = k; continue; }
    if (c === '#' && i === 0) { flush(src.slice(i), 'c-com'); break; }
    if (c === '"' || c === "'" || c === String.fromCharCode(96)) {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === '\\\\') j++; j++; }
      j = Math.min(j + 1, n);
      flush(src.slice(i, j), 'c-str'); i = j; continue;
    }
    if (/[0-9]/.test(c) && (i === 0 || /[^0-9a-zA-Z_.$]/.test(src[i - 1]))) {
      let j = i; while (j < n && /[0-9a-zA-Z_.$]/.test(src[j])) j++;
      flush(src.slice(i, j), 'c-num'); i = j; continue;
    }
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i; while (j < n && /[0-9a-zA-Z_$]/.test(src[j])) j++;
      const w = src.slice(i, j);
      flush(w, KEYWORDS.has(w) ? 'c-kw' : null); i = j; continue;
    }
    flush(c, null); i++;
  }
  return out;
}
function escapeHtml(s) { return esc(s); }

function route() {
  const p = decodeURIComponent(location.hash.replace(/^#\\//, ''));
  if (p) loadFile(p);
}
window.addEventListener('hashchange', route);

fetch('/__src/tree').then(r => r.json()).then(tree => {
  treeEl.innerHTML = '';
  renderTree(tree, treeEl);
  route();
}).catch(() => { treeEl.innerHTML = '<div class="err">tree failed</div>'; });
</script>
</body>
</html>`;

export default function devSourceViewer() {
  return {
    name: 'dev-source-viewer',
    configureServer(server) {
      const root = server.config.root;
      const projectName = root.split(path.sep).filter(Boolean).pop() || 'project';

      // NOTE: register specific routes BEFORE the '/__src' page handler —
      // connect matches '/__src' as a prefix, so order matters.
      server.middlewares.use(`${ROUTE}/tree`, (req, res, next) => {
        if (req.method !== 'GET') return next();
        try {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(buildTree(root)));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(e) }));
        }
      });

      server.middlewares.use(`${ROUTE}/file`, (req, res, next) => {
        if (req.method !== 'GET') return next();
        const rel = new URL(req.url, 'http://localhost').searchParams.get('path') ?? '';
        const r = readFileSafe(root, rel);
        res.statusCode = r.status;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(r.body);
      });

      server.middlewares.use(ROUTE, (req, res, next) => {
        if (req.method !== 'GET') return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(PAGE(projectName));
      });
    },
  };
}
