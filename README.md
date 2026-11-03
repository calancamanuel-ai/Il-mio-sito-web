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

Le pagine in `/lab/` sono prove di lavoro, non collegate dalla navigazione (in versione 2: `/lab/riordino`, fase B). La prova a parallasse della versione 1 è nella storia del ramo `lab-hero-livelli`. Le bozze delle tre direzioni della fase 1 sono nella storia git (commit "Fase 1: tre direzioni creative").

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


### Illustrazioni (versione 2)

Le illustrazioni si generano con Gemini usando i prompt in `riferimenti/immagini/PROMPT.md` e si salvano in `riferimenti/immagini/` (non pubblicate). Poi:

```sh
node tools/prepara-immagini.mjs   # scontorna dove serve, ritaglia, crea AVIF/WebP in public/immagini e aggiorna src/content/immagini.json
```

Se un'immagine esce poco nitida, prima la si ripulisce con `python tools/nitidezza.py` (OpenCV, ingrandimento x2; istruzioni in testa al file). Lo script decide da solo se scontornare (bordo di un colore uniforme e acceso, per esempio magenta); si può forzare con i suffissi `-scontorna` o `-pieno`. `-telefono` e `-computer` indicano versioni diverse della stessa immagine. Riporta il peso di ogni immagine e controlla il budget dell'hero (400 KB su telefono, 900 KB su computer).
