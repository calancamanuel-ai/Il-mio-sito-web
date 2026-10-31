# Il mio sito web

Sito aziendale statico in Astro, pubblicato su Cloudflare Workers (static assets). Piano completo: `docs/PIANO.md`; regole: `CLAUDE.md`; dati mancanti: `MANCANTI.md`.

## Requisiti

Node 22.12 o superiore.

## Avvio

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build e anteprima locale

```bash
npm run build      # genera dist/
npm run preview    # serve dist/ in locale
npx wrangler dev   # serve dist/ come su Cloudflare
```

## Pubblicazione

Il repository è collegato a Cloudflare (Workers Builds): ogni push su GitHub pubblica.
Comando di build: `npm run build`; comando di deploy: `npx wrangler deploy` (config in `wrangler.jsonc`).
I rami diversi da `main` producono un'anteprima, se le build dei rami non di produzione sono attive nel pannello Cloudflare.

Il sito resta con `noindex` (meta, `X-Robots-Tag` in `public/_headers`, `robots.txt`) finché `MANCANTI.md` ha voci bloccanti.

## Dati e segnaposto

Tutti i dati (contatti, dati legali, prezzi) stanno in `src/config/sito.ts`. I valori mancanti sono `"[DA COMPLETARE: ...]"` e vengono evidenziati sul sito.

## Bozze

Le pagine in `/lab/` sono bozze di lavoro (direzioni creative, prove del 3D), non collegate dalla navigazione.
