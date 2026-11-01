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

Le pagine in `/lab/` sono prove di lavoro (in fase 3 il 3D), non collegate dalla navigazione. Le bozze delle tre direzioni della fase 1 sono nella storia git (commit "Fase 1: tre direzioni creative").

## Form di contatto

Il form invia JSON a `/api/contatto`. L'endpoint (Cloudflare Worker con Turnstile e inoltro a n8n) arriva in fase 5: fino ad allora il form valida i campi e dice che l'invio non è ancora attivo.

## Anteprima navigabile per la revisione

Per rivedere il sito senza Cloudflare, `tools/anteprima-artefatto.mjs` trasforma `dist/` in una versione con link relativi e font incorporati, pubblicabile come artefatto privato su claude.ai:

```bash
npm run build
node tools/anteprima-artefatto.mjs /percorso/anteprima
```

È solo uno strumento di revisione: non cambia il sito pubblicato.

## HDRI del 3D

L'illuminazione della scena 3D usa un HDRI di Poly Haven (CC0) ridotto per stare nel budget:

```bash
node tools/riduci-hdri.mjs studio_small_09_1k.hdr public/3d/studio_small_09_512.hdr.gz 512
```

Immagini d'archivio: in `src/assets/archivio/`, con fonte e licenza in `src/content/archivio.ts` (crediti nel footer).

## Movimento (fase 4)

GSAP 3.15 + ScrollTrigger e Lenis 1.3.27 (npm). Si caricano dopo il primo disegno e solo se il movimento non è ridotto (`src/layouts/BaseLayout.astro` → `src/scripts/motion.ts`): il JavaScript iniziale resta sotto i 50 KB. Scene in `src/scripts/motion-scenes.ts`, entrate delle sezioni in `src/scripts/motion-enter.ts`.

Tema giorno/notte: segue il sistema; `?tema=chiaro` o `?tema=scuro` nell'indirizzo lo forzano (utile per i test).
