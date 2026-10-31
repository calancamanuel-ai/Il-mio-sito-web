# Regole del progetto

Riferimento unico: `docs/PIANO.md`. Se una regola qui sotto e il piano sembrano in conflitto, vince il piano. Il piano vince anche sulle skill: se una skill chiede qualcosa che lo contraddice, segui il piano e scrivilo nel riepilogo di fase.

## Obiettivo

Il sito ha un solo compito: far prenotare una call conoscitiva di 20 minuti. Ogni pagina e ogni demo chiudono con "Prenota una call". Ogni effetto deve passare il test: "aiuta a capire o a contattarmi?".

## Ordine di priorità

1. **Prestazioni e accessibilità.**
2. **Chiarezza e contatto.**
3. **Creatività.** Dentro i limiti sopra, preferisci sempre l'opzione distintiva a quella standard. Se una soluzione è quella che userebbe chiunque, cerca un'alternativa.

## Budget di prestazioni (Lighthouse mobile 95+ in tutte e quattro le categorie)

| Metrica | Limite |
| --- | --- |
| JavaScript in home al primo caricamento | < 50 KB compressi (3D escluso, caricato dopo) |
| LCP | < 2,5 s su 4G lento |
| CLS | < 0,05 |
| INP | < 200 ms |
| 3D per pagina | < 1,5 MB; modelli GLB < 400 KB; pixel ratio max 2; 60 fps su un telefono di tre anni fa |
| Contrasto testo | almeno WCAG AA |

- Titolo e pulsante della home sono HTML puro, visibili prima del 3D.
- **Un solo momento 3D pesante** in tutto il sito ("La macchina del flusso", home). Il dispositivo 3D della pagina Siti web resta leggero.
- **Fallback obbligatori**: con `prefers-reduced-motion` o senza WebGL, immagine statica del fotogramma finale ed etichette in HTML. Ogni animazione rispetta `prefers-reduced-motion`; nessun contenuto resta nascosto se lo script non parte.
- Isole Astro: il 3D solo in `client:visible`; niente framework UI se basta JavaScript vanilla.
- Navigazione completa da tastiera, focus visibile, testi alternativi, testo mai sotto 16 px su mobile.
- Barra fissa in basso su mobile con "Chiama" e "WhatsApp", pulsanti di almeno 44 px, piatta (niente vetro, pillola o ombra).

## Stack

Astro statico + TypeScript, Cloudflare Workers static assets (`wrangler.jsonc`), three.js vanilla, GSAP + ScrollTrigger + Lenis solo dove servono. Font e librerie da npm (`@fontsource`), mai da CDN. Niente Vite standalone, Netlify o Vercel. Prima di usare API o configurazioni di librerie e servizi, verifica la documentazione aggiornata.

## Regole sulle skill

Regia: pro-design. Direzione visiva: design-taste-frontend. 3D: sito-3d-premium e threejs-web-3d. Animazioni: gsap-scroll-animation. Test: playwright-cli. Revisione finale: web-design-guidelines. Quello che il piano fissa vince; per il resto vale la tabella "chi vince su cosa" di pro-design.

**Eccezioni volute alle regole di design-taste-frontend** (passa `--allow` all'inspector solo per queste e scrivilo nel report):

- **Monospace**: solo etichette dei nodi, numeri tecnici, barra di stato, modalità terminale, effetto di decodifica dei titoli. Mai testo corrente. Al massimo due famiglie in tutto (display + mono).
- **Linee**: solo la linea di flusso e le piste della mappa a circuito. Linee piene ≥ 2 px, colore piatto della palette, nessun bagliore fuori dalla scena 3D. Nessun'altra linea sottile, divisore o griglia decorativa.
- **Bagliori e bloom**: solo dentro la scena 3D, mai nell'HTML.

**Una "cosa viva" per pagina**, massimo 2–3 scene allo scroll per pagina:

| Pagina | Cosa viva | Scene e dettagli |
| --- | --- | --- |
| Home | "Costruisci la tua automazione" | 3D "La macchina del flusso", "Il lunedì mattina", linea di flusso |
| Automazioni | Calcolatore di risparmio | Schemi di workflow SVG animati, prima/dopo con cursore |
| Software AI | Simulazione WhatsApp | Frammento di interfaccia di un software su misura |
| Siti web | Dispositivo 3D leggero con i progetti dimostrativi | Confronto tra gli stili dei progetti |
| Casi d'uso | Filtro dei "log di sistema" per settore | — |
| Chi sono | Mappa a circuito: tap su un paese | — |
| Contatti | Form intelligente; "chiedi al sito" solo se confermato | — |

Leggeri e non contati: barra di stato, "vista tecnica", cursore con scia (solo desktop), tema giorno/notte, 404, modalità terminale.

**Immagini**: la soglia di 4 immagini reali per pagina si raggiunge con frammenti di interfaccia in HTML marcati `data-ui` (dati d'esempio dichiarati), mappe e foto d'archivio con licenza commerciale (crediti nel footer), foto vera di Manuel (segnaposto finché manca). Mai foto stock con persone, mai immagini trovate presentate come lavori propri. Se i domini delle collezioni aperte sono bloccati, disegna e segnalalo.

**Processo**: stop a fine fase e scelte richieste (3 direzioni, 2 varianti del 3D) prevalgono su "chiedi al massimo una volta". Revisione: ciclo di pro-design, massimo 3 giri, poi report di cosa resta aperto (sostituisce il voto 8 di sito-3d-premium).

## Filtro anti-template (da non fare)

- Niente blob sfumati, card in vetro, griglie bento generiche, icone stock, gradienti viola-blu da startup AI.
- Niente frasi fatte: "Trasforma il tuo business", "Soluzioni innovative", "Il futuro è adesso" e simili.
- Niente animazione uguale su ogni sezione: ogni effetto ha un motivo.

## Contenuti

- **Solo contenuti veri o segnaposto.** Mai inventare dati, prezzi, recensioni, clienti, testimonianze o numeri. I dati mancanti vivono solo in `src/config/sito.ts` come `"[DA COMPLETARE: ...]"` e sono elencati in `MANCANTI.md` (cosa, dove compare, se blocca il lancio). Aggiorna `MANCANTI.md` a ogni sessione.
- **Fiducia senza testimonianze** (sezione Fiducia del piano): persona vera (foto segnaposto, consulente non agenzia, territorio), trasparenza (prezzi "da", preventivo fisso, tempi di risposta e passi dopo il primo contatto), onestà ("Quando non conviene automatizzare"), prova pratica (demo, sito, vista tecnica). Lo spazio per testimonianze e casi veri esiste ma resta nascosto finché `testimonianze` in `sito.ts` è vuota.
- **Portfolio**: casi studio brevi (brief dichiarato inventato, scelte di design e perché, cosa fa il sito, anteprima), il lavoro prima del testo; almeno un progetto sobrio e classico; una riga semplice dice che il sito di Manuel è una vetrina delle sue capacità, non l'unico stile che propone.
- Esempi e progetti dimostrativi sono dichiarati come tali ("esempio", "progetto dimostrativo").
- Prezzi solo da `src/config/sito.ts`. Stime del calcolatore sempre con le ipotesi scritte sotto.
- Testi derivati da `riferimenti/messaggi.md`, marcati `[BOZZA]` finché non approvati.
- Tono: concreto, ore risparmiate ed errori evitati; microcopy umano e un po' ironico, mai gergo.
- **Sito solo in italiano.** Nomi di codice in inglese, URL e testi in italiano.
- **`noindex`** su tutto il sito finché `MANCANTI.md` ha voci bloccanti.

## Consegna

- **Prima di ogni consegna: screenshot a 390 e 1440 px** (per il 3D anche a più profondità di scroll e 0/50/100% delle sezioni pinnate), Lighthouse mobile, inspector di design-taste-frontend. Se il WebGL esce nero negli screenshot automatici, dirlo e chiedere verifica sul telefono.
- Un ramo per fase; unione su `main` solo dopo anteprima approvata. A fine fase: riepilogo breve (scelte minori, fonti), link di anteprima, screenshot, Lighthouse, `MANCANTI.md` aggiornato. Poi fermarsi.
- Un componente per file, nessun file oltre 500 righe, niente cartelle nuove fuori dalla struttura del piano senza dirlo. Aggiorna il README quando cambiano avvio, test o deploy.
