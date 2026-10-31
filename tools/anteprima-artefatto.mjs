// Prepara dist/ per un'anteprima navigabile come artefatto privato su claude.ai.
// Uso: node tools/anteprima-artefatto.mjs <cartella di uscita>
// - link e risorse da assoluti a relativi (l'artefatto non sta alla radice del dominio)
// - la home diventa home.html; index.html è una pagina d'ingresso che rimanda alla home
// - i font vengono incorporati nel CSS come data URI
// Non tocca dist/ e non serve al sito pubblicato: è solo uno strumento di revisione.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const src = 'dist';
const out = process.argv[2];
if (!out) { console.error('uso: node tools/anteprima-artefatto.mjs <cartella>'); process.exit(1); }
if (existsSync(out)) rmSync(out, { recursive: true });
mkdirSync(join(out, 'risorse'), { recursive: true });

// pagine alla radice e nelle sottocartelle (es. lab/flusso.html -> lab-flusso.html: tutto resta alla radice)
const pages = readdirSync(src, { recursive: true }).map(String).filter((f) => f.endsWith('.html') && !f.startsWith('_astro'));
const flat = (f) => f.replace(/\.html$/, '').replaceAll('/', '-');
const names = new Map(pages.map((f) => [f.replace(/\.html$/, ''), flat(f)]));

const fixUrl = (u) => {
  if (!u.startsWith('/') || u.startsWith('//')) return u;
  const m = u.match(/^\/([^?#]*)([?#].*)?$/);
  const path = m[1];
  const rest = m[2] || '';
  if (path === '') return 'home.html' + rest;
  if (path.startsWith('_astro/')) return path.replace('_astro/', 'risorse/') + rest; // "_" è riservato negli artefatti
  if (path.includes('.')) return path + rest;
  if (names.has(path)) return `${names.get(path)}.html${rest}`;
  return path + rest; // per esempio api/contatto: resta un indirizzo relativo che non risponde
};

for (const f of pages) {
  let html = readFileSync(join(src, f), 'utf8');
  html = html.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, '');
  html = html.replace(/(href|src|action)="([^"]*)"/g, (_, a, u) => `${a}="${fixUrl(u)}"`);
  html = html.replace(/`\/contatti\?/g, '`contatti.html?');
  writeFileSync(join(out, f === 'index.html' ? 'home.html' : `${flat(f)}.html`), html);
}

for (const f of readdirSync(join(src, '_astro'))) {
  if (f.endsWith('.js')) { copyFileSync(join(src, '_astro', f), join(out, 'risorse', f)); continue; }
  if (!f.endsWith('.css')) continue;
  let css = readFileSync(join(src, '_astro', f), 'utf8');
  css = css.replace(/url\(\/_astro\/([^)]+\.woff2)\)/g, (_, file) =>
    `url(data:font/woff2;base64,${readFileSync(join(src, '_astro', file)).toString('base64')})`);
  writeFileSync(join(out, 'risorse', f), css);
}
copyFileSync(join(src, 'favicon.svg'), join(out, 'favicon.svg'));

// Pagina d'ingresso: l'artefatto la avvolge nel proprio scheletro HTML.
writeFileSync(join(out, 'index.html'), `<title>Anteprima sito Manuel</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
  :root { color-scheme: dark; --bg: #0a0d0b; --ink: #e7efe9; --action: #4ade80; }
  body { background: var(--bg); color: var(--ink); font: 18px/1.5 Georgia, serif; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  main { max-width: 40rem; padding-block: 15vh; }
  a { color: var(--action); }
</style>
<main>
  <h1>Apertura della home…</h1>
  <p>Se non si apre da sola, <a href="home.html">vai alla home</a>.</p>
  <p>Pagine: ${['home', ...[...names.values()].filter((n) => !['index', '404'].includes(n))].map((n) => `<a href="${n}.html">${n}</a>`).join(' · ')}</p>
</main>
<script>/* #nome-pagina nel link dell'artefatto apre quella pagina (es. #lab-flusso) */ var h = location.hash.slice(1); location.replace(h && /^[a-z-]+$/.test(h) ? h + '.html' : 'home.html');</script>
`);
console.log('anteprima pronta in', out);
