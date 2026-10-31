# Verifiche su documentazione ufficiale e ripieghi

Registro delle verifiche fatte su fonti ufficiali e dei lavori fatti con un ripiego (regola "Rete" di CLAUDE.md). Aggiornato al 31 ottobre 2026, fase 3.

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

## Ripieghi rifatti

- Illuminazione 3D: HDRI vero di Poly Haven ("Studio Small 09", CC0) al posto della luce generata in codice.
- Immagini: quattro immagini d'archivio di pubblico dominio (Met Museum, Internet Archive) in home, Chi sono, Casi d'uso e Contatti, con crediti nel footer.
- Documentazione: rilette le pagine ufficiali elencate sopra (prima solo riassunti della ricerca web).

## Ripieghi ancora aperti

| Cosa | Perché | Come rifarlo |
| --- | --- | --- |
| Pagina della licenza di Poly Haven | `polyhaven.com` è bloccato; licenza CC0 confermata via ricerca web | Autorizzare `polyhaven.com` e rileggere https://polyhaven.com/license |
| Foto e mappe da Wikimedia Commons | L'API risponde "troppe richieste" (429) anche a richieste distanziate: limite sull'indirizzo condiviso | Riprovare più avanti, poche richieste |
| Openverse | Raggiungibile, ma le ricerche non rispondono entro 60 s | Riprovare più avanti |
| Carte storiche della zona | La carta Borghi 1819 (David Rumsey) è CC BY-NC-SA: non commerciale, esclusa | Cercare carte in pubblico dominio su Wikimedia quando risponde |
| Prestazioni 3D su telefono vero | Misure fatte con WebGL emulato in software (SwiftShader) | Prova di Manuel sul telefono |
