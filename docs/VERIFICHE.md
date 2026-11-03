# Verifiche su documentazione ufficiale e ripieghi

Registro delle verifiche fatte su fonti ufficiali e dei lavori fatti con un ripiego (regola "Rete" di CLAUDE.md). Aggiornato al 3 novembre 2026, versione 2 fase A (dopo l'apertura dei nuovi domini).

## Versioni e configurazioni verificate

| Cosa | Esito | Fonte |
| --- | --- | --- |
| Astro 7.4.4 | Nessuna modifica necessaria: le novità della v7 (Vite 8, compilatore Rust, rimozione di @astrojs/db) non toccano il progetto | https://docs.astro.build/en/guides/upgrade-to/v7/ |
| `build.format: 'file'`, `trailingSlash: 'never'` | Opzioni valide; `file` genera `/pagina.html` | https://docs.astro.build/en/reference/configuration-reference/ |
| Workers static assets: `assets.directory`, `not_found_handling: "404-page"`, `html_handling: "drop-trailing-slash"` | Opzioni valide; `/pagina.html` e `/pagina/` rimandano a `/pagina` | https://developers.cloudflare.com/workers/static-assets/ e .../routing/advanced/html-handling/ |
| `public/_headers` (noindex, cache) | Supportato per i siti solo statici (senza Worker) | https://developers.cloudflare.com/workers/static-assets/headers/ |
| `compatibility_date` | Corretto a oggi, come indica la guida Astro di Cloudflare; `wrangler deploy --dry-run` senza errori | https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/ |
| Anteprime dei rami | Workers Builds crea una Preview per i rami diversi da quello di produzione | https://developers.cloudflare.com/workers/ci-cd/builds/ |
| GSAP 3.15.0 (per la fase 4) | Uso gratuito anche per siti fatti per clienti; plugin da registrare con `gsap.registerPlugin` | https://gsap.com/licensing/, https://gsap.com/docs/v3/Installation/ |
| Lenis 1.3.27 (per la fase 4) | Ultima stabile (la 2.0 è in sviluppo); pacchetto `lenis`; `respectReducedMotion` attivo di default; integrazione con ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` | README ufficiale su GitHub (darkroomengineering/lenis) |
| three.js 0.186.1 | `HDRLoader` (ex RGBELoader), `Timer`, `compileAsync` confermati. **Correzione**: `PMREMGenerator.fromScene(..., { size })` ha minimo 256, quindi il valore 64 usato prima non aveva effetto ed è stato tolto | https://threejs.org/docs/ (HDRLoader, PMREMGenerator, Timer, WebGLRenderer) |

## Verifiche del 3 novembre 2026 (versione 2, nuovi domini)

| Cosa | Esito | Fonte |
| --- | --- | --- |
| Astro 7.4.4 → **7.4.5** | Aggiornato: solo correzioni (lock file del server, `import.meta.env` con `$`, percorsi con codifica non valida → 400, nomi di tag più rigidi). Build senza errori | https://raw.githubusercontent.com/withastro/astro/main/packages/astro/CHANGELOG.md |
| wrangler 4.156.0 → **4.156.2** | Aggiornato: data di compatibilità predefinita 2026-11-02, dipendenze aggiornate. `compatibility_date` portata a 2026-11-02; `wrangler deploy --dry-run` senza errori | https://raw.githubusercontent.com/cloudflare/workers-sdk/main/packages/wrangler/CHANGELOG.md |
| Workers static assets | Nessun cambiamento rispetto alla configurazione in uso (`assets.directory`, `not_found_handling`, `html_handling`) | https://developers.cloudflare.com/workers/static-assets/ |
| Turnstile (per la fase E) | Validazione lato server obbligatoria su `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`; token valido 300 s; `remoteip` facoltativo | https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ |
| GSAP 3.15.0 / ScrollTrigger | Ultima versione. Confermati `pinSpacing`, `anticipatePin`, `refreshPriority` e `ScrollTrigger.sort()` per i trigger creati fuori ordine | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| Lenis 1.3.27 | Ultima versione. Il README del pacchetto (fonte ufficiale; il sito lenis.darkroom.engineering è una pagina dinamica senza testo leggibile da qui) conferma `autoRaf: false` + `gsap.ticker`, `anchors`, `respectReducedMotion: true` di default, `data-lenis-prevent`, `allowNestedScroll` (costoso). Configurazione attuale corretta | https://unpkg.com/lenis@1.3.27/README.md |
| Fontsource (Fraunces, Geist Mono 5.3.0) | Ultime versioni. Import `@fontsource-variable/<nome>`, `unicode-range` per sottoinsiemi: come nel progetto | https://fontsource.org/docs/getting-started/variable |
| Canvas 2D (per la pioggia) | Pre-disegnare su canvas fuori schermo, coordinate intere, non scalare in `drawImage`, livelli separati per parti statiche e animate | https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas |
| Curva e durate dell'interfaccia | ease-out, sotto i 300 ms, interrompibili; curva `cubic-bezier(0.23, 1, 0.32, 1)` dalla skill di Emil. Messa in `--ease-out` | https://emilkowal.ski/ui/great-animations, skill `animate` |
| LCP | Immagine dell'hero scoperta subito nell'HTML, con priorità alta e senza lazy loading | https://web.dev/articles/optimize-lcp |
| Playwright | Emulazione di `reducedMotion` e `colorScheme` nel contesto: come negli script di test | https://playwright.dev/docs/emulation |
| Met Collection API | La ricerca `v1/search` è stata ritirata il 1° ottobre 2026: si usa `v1.1/search` | risposta 410 dell'API |

## Ripieghi rifatti

- Illuminazione 3D: HDRI vero di Poly Haven ("Studio Small 09", CC0) al posto della luce generata in codice.
- Immagini: quattro immagini d'archivio di pubblico dominio (Met Museum, Internet Archive) in home, Chi sono, Casi d'uso e Contatti, con crediti nel footer.
- Documentazione: rilette le pagine ufficiali elencate sopra (prima solo riassunti della ricerca web).

## Ripieghi ancora aperti

| Cosa | Perché | Come rifarlo |
| --- | --- | --- |
| Pagina della licenza di Poly Haven | `polyhaven.com` ancora bloccato dal filtro (403). Non serve più: il 3D esce nella versione 2 | — |
| Wikimedia Commons | Ancora "troppe richieste" (429) dal server di Wikimedia, non dal filtro | Riprovare più avanti |
| Art Institute of Chicago (`api.artic.edu`) | Risponde con una verifica anti-bot di Cloudflare (403), non dal filtro | Nessuna via automatica; cercare a mano se serve |
| Immagini di Flickr e Sketchfab | `live.staticflickr.com`, `www.flickr.com`, `sketchfab.com`, `media.sketchfab.com` bloccati dal filtro; viste solo come miniature di Openverse | Autorizzare quei domini se servono a grandezza piena |
| PageSpeed Insights (`pagespeedonline.googleapis.com`) | Raggiungibile, ma quota giornaliera esaurita (429) senza chiave API | Lighthouse in locale (come finora) o una chiave API |
| Prova su telefono vero | Le misure sono fatte con Chromium headless | Prova di Manuel sul telefono |
