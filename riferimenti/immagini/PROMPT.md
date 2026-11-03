# Prompt per Gemini (versione 2)

## Riferimenti studiati (solo per lo stile: non vanno nel sito e non si copiano)

Trovati con Openverse il 3 novembre 2026. Da ognuno prendo solo un'idea di composizione o di dettaglio.

| # | Riferimento | Licenza | Cosa prendo |
| --- | --- | --- | --- |
| 1 | [Low Poly Isometric Rooms](https://sketchfab.com/3d-models/d53af0ad289a403598ee2cb41d84608b) | CC BY 4.0 | Più stanze come blocchi affiancati con le pareti tagliate su due lati: l'ufficio "casa delle bambole" |
| 2 | [Low Poly Room](https://sketchfab.com/3d-models/a6bf7976f3ac401e96907aa5b8a0c1c1) | CC BY 4.0 | Una stanza sola su una lastra di pavimento con lo spessore visibile: il modello dei dettagli delle stanze |
| 3 | [Low Poly Isometric Bathroom](https://sketchfab.com/3d-models/12b69f5f17f542d0a61c1f9b628c20d2) | CC BY 4.0 | La base che "galleggia" sul fondo, con un bordo netto: facile da ritagliare |
| 4 | [Aerial View of Messy Cubicle](https://www.flickr.com/photos/31437555@N00/1950406926) | CC BY-ND 2.0 | Il caos visto dall'alto: carte che coprono il piano e debordano dai bordi della scrivania |
| 5 | [World's Messiest Office Cubicle](https://www.flickr.com/photos/31437555@N00/1950409800) | CC BY-ND 2.0 | Pile che franano sulla tastiera, buste e cartelline aperte |
| 6 | [Messy Desk](https://www.flickr.com/photos/71539256@N00/357361903) | CC BY 2.0 | Monitor circondato da oggetti, post-it e scatole: la reception nel caos |
| 7 | [my messy desk…](https://www.flickr.com/photos/41808955@N00/1225208026) | CC BY 2.0 | Scrivania con due monitor e cavi aggrovigliati: il laboratorio software nel caos |

**Fonti che non ho potuto usare.**
- Wikimedia Commons risponde "troppe richieste" (429).
- Art Institute of Chicago chiede una verifica anti-bot (403).
- Met: la vecchia API di ricerca è stata ritirata il 1° ottobre 2026; con la nuova non ho trovato interni d'ufficio utili.
- Le immagini di Flickr e Sketchfab le ho viste tramite le miniature di Openverse, perché `live.staticflickr.com`, `www.flickr.com`, `sketchfab.com` e `media.sketchfab.com` sono bloccati dal filtro di rete.

## Quante immagini servono

| Quando | Immagini | Nomi file | Servono per |
| --- | --- | --- | --- |
| **Fase B/C, indispensabili (4)** | ufficio in ordine, ufficio nel caos, dettaglio reception, dettaglio amministrazione | `ufficio-ordine`, `ufficio-caos`, `stanza-reception`, `stanza-amministrazione` | Hero (riordino) e sezione "Le stanze": la home deve avere almeno 4 immagini vere |
| Facoltativa, prima di tutto (1) | prova di stile su una stanza | `_prova-stile` (il trattino basso dice allo script di ignorarla) | Decidere lo stile senza sprecare tentativi |
| Fase D, più avanti (fino a 7) | le altre 3 stanze, le versioni "nel caos" dei dettagli, il foglio della 404 | — | Pagine servizio e 404 |

**Adesso: 4 immagini**, più una facoltativa. Ordine: 1 → 2 → 3 → 4.

## Regole per tutte

- **Formato**: quadrato **1:1**. Funziona sia su telefono sia su computer, e le stanze toccabili restano negli stessi punti.
- **Ordine**:
  - Prima l'**ufficio in ordine**.
  - Poi, nella stessa chat, allega quell'immagine e chiedi la versione nel caos: l'inquadratura resta identica, ed è indispensabile perché i caratteri si ricompongono cella per cella.
  - I dettagli delle stanze si chiedono allegando l'ufficio in ordine.
- Niente persone, niente testo, niente loghi, niente filigrane.
- Salva in `riferimenti/immagini/` con i nomi della tabella (png o jpg), poi lancia `node tools/prepara-immagini.mjs`.
- Se Gemini scrive lettere su fogli o schermi, rigenera aggiungendo: "Ogni scritta è solo una barra piena arrotondata: nessuna lettera, nessun numero".

**Palette nei prompt**: "Circuito", scelta da Manuel il 3 novembre 2026. Nelle illustrazioni:
- fondo blu notte #0b1220, pareti e pavimenti blu ardesia #111a2e e #1e2a44;
- chiaro #e6edf7, grigio blu #94a3b8;
- blu #3b82f6 per piste del circuito e schermi;
- verde #34d399 solo per ciò che è "in ordine";
- luce calda ambrata solo nell'ordine.

Il ciano #22d3ee resta riservato ai pulsanti del sito: non compare nelle illustrazioni.

---

## 0. Prova di stile (facoltativa)

```
Illustrazione isometrica in sezione, vista dall'alto a 30°, come una casa delle bambole tagliata: una sola stanza di un piccolo ufficio italiano, la reception, su una lastra di pavimento con lo spessore visibile e due pareti tagliate, con un bancone, un telefono fisso, uno schermo, una pianta, una sedia. Stile illustrazione vettoriale pulita con piccoli dettagli, contorni sottili scuri, ombre piatte, leggera grana. La stanza galleggia al centro su un fondo blu notte uniforme #0b1220. Colori: pavimento e pareti in blu ardesia #111a2e e #1e2a44, mobili chiari #e6edf7 e legno caldo, accenti blu #3b82f6, una pianta verde #34d399, luce di una lampada calda. Ordinata e tranquilla. Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo.
```

## 1. Ufficio in ordine (da generare per primo)

```
Illustrazione isometrica in sezione, vista dall'alto a 30°, come una casa delle bambole tagliata: un piccolo ufficio italiano su un solo piano, appoggiato su una lastra di pavimento con lo spessore visibile e le pareti tagliate su due lati, diviso in cinque stanze ben distinte da pareti basse, ognuna riconoscibile dagli oggetti:
1. in alto a sinistra la reception: bancone, telefono fisso, tablet, un piccolo schermo;
2. in alto a destra l'amministrazione: scrivania con raccoglitori allineati, uno scaffale con faldoni in fila, una stampante;
3. al centro il commerciale: tavolo con due sedie e un portatile aperto, una lavagna bianca vuota;
4. in basso a sinistra la vetrina online: una scrivania con un grande monitor e un tablet su un supporto;
5. in basso a destra il laboratorio software: una scrivania con due monitor e un piccolo server ordinato.
Tra le stanze, sul pavimento, corrono sottili piste luminose blu #3b82f6 come quelle di un circuito stampato, che collegano le stanze a quattro piccoli nodi quadrati.
Tutto è in perfetto ordine: scrivanie sgombre, fogli impilati con cura, cavi nascosti, piante curate. Luce calda di fine giornata dalle finestre, lampade accese, atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. L'ufficio occupa il centro dell'immagine con un margine intorno e galleggia su un fondo blu notte uniforme #0b1220.
Colori: pareti e pavimenti in blu ardesia #111a2e e #1e2a44, mobili chiari #e6edf7 e legno caldo, grigio blu #94a3b8 per i dettagli, blu #3b82f6 per le piste e gli schermi, verde #34d399 solo per ciò che è in ordine (spunte sulle cartelle, piante), luce calda ambrata dalle lampade.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 2. Ufficio nel caos (nella stessa chat, allegando l'immagine 1)

```
Modifica l'immagine allegata mantenendo esattamente la stessa inquadratura, la stessa prospettiva, le stesse pareti, gli stessi mobili nella stessa posizione e lo stesso stile. Cambia solo lo stato dell'ufficio: ora è sommerso dal lavoro ripetitivo.
Visto dall'alto, le carte coprono i piani delle scrivanie e debordano oltre i bordi; pile di fogli instabili che franano sulle tastiere, raccoglitori aperti e caduti, cartelline aperte, buste strappate, post-it gialli attaccati intorno agli schermi, scatole aperte, una stampante che sputa fogli sul pavimento, il telefono della reception con la cornetta staccata, sugli schermi tanti piccoli riquadri di notifica rossi e arancioni, tazze di caffè vuote, cavi aggrovigliati dietro le scrivanie. Le piste blu sul pavimento sono spente e coperte di carte, i nodi spenti.
Luce fredda e un po' piatta di neon, niente luce calda. Stessi colori di base (#0b1220, #111a2e, #1e2a44, #e6edf7), nessun verde, con in più rosso e arancione solo per le notifiche e giallo per i post-it.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 3. Dettaglio: la reception in ordine (allegando l'immagine 1)

```
Usa l'immagine allegata come riferimento di stile, colori e luce. Disegna solo la reception di quell'ufficio, ingrandita: la stessa stanza con gli stessi mobili, in isometria vista dall'alto a 30°, su una lastra di pavimento con lo spessore visibile e due pareti tagliate, che galleggia al centro su un fondo blu notte uniforme #0b1220.
Bancone pulito, telefono fisso con la cornetta al suo posto, un tablet che mostra una sola notifica verde #34d399, uno schermo con un calendario ordinato fatto di blocchi colorati, una pianta, una sedia, un vassoio con tre buste impilate. Una pista luminosa blu #3b82f6 esce dal bancone e scende dal bordo della lastra. Luce calda di lampada, atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. Colori: #111a2e, #1e2a44, #e6edf7, #94a3b8, legno caldo, blu #3b82f6, verde #34d399 solo sugli oggetti in ordine.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 4. Dettaglio: l'amministrazione in ordine (allegando l'immagine 1)

```
Usa l'immagine allegata come riferimento di stile, colori e luce. Disegna solo l'amministrazione di quell'ufficio, ingrandita: la stessa stanza con gli stessi mobili, in isometria vista dall'alto a 30°, su una lastra di pavimento con lo spessore visibile e due pareti tagliate, che galleggia al centro su un fondo blu notte uniforme #0b1220.
Scrivania con un raccoglitore aperto e i fogli allineati, uno scaffale con faldoni in fila ordinati per colore, ognuno con una piccola spunta verde #34d399, una stampante spenta con un solo foglio nel vassoio, uno schermo con una tabella fatta di righe colorate, una lampada accesa. Una pista luminosa blu #3b82f6 entra dallo scaffale e scende dal bordo della lastra. Luce calda, atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. Colori: #111a2e, #1e2a44, #e6edf7, #94a3b8, legno caldo, blu #3b82f6, verde #34d399 solo sugli oggetti in ordine.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

**Prima di caricare**:
- Guarda le immagini 1 e 2 una dopo l'altra: pareti, scrivanie e finestre devono stare negli stessi punti. Se Gemini ha spostato qualcosa, rigenera la 2 aggiungendo "stessa identica inquadratura dell'immagine allegata".
- I dettagli 3 e 4 devono sembrare la stessa stanza dell'immagine 1, non per forza identici al pixel.
