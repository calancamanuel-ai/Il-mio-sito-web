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

## Struttura dell'ufficio (decisa il 3 novembre 2026)

Si legge dal davanti (l'angolo in basso, il più vicino a chi guarda) verso il fondo, nell'ordine dei nodi del circuito:

| Dove | Stanza | Nodo |
| --- | --- | --- |
| Angolo in basso, davanti | Reception con l'ingresso | Ricevi |
| Centro | Commerciale | Capisci |
| In alto, contro le pareti con le finestre | Amministrazione | Archivia |
| Lato sinistro | Vetrina online | ramo laterale |
| Lato destro | Laboratorio software | ramo laterale |

L'ultimo nodo, "avvisa", torna verso l'angolo in basso, dove la pista esce dalla lastra e continua nella pagina.

## 1. Ufficio in ordine (allegando la versione attuale di `ufficio-ordine` come riferimento di guscio e stile)

```
Usa l'immagine allegata come riferimento per lo stile, i colori, la luce e il guscio dell'ufficio: stessa inquadratura isometrica dall'alto a 30°, stessa lastra di pavimento con lo spessore visibile, stesse pareti esterne di mattoni tagliate, stesse finestre sulle pareti di fondo, stesso fondo blu notte uniforme #0b1220. Riorganizza invece l'interno così, dal davanti (l'angolo in basso, il più vicino a chi guarda) verso il fondo:
1. davanti, nell'angolo in basso: la reception, con un bancone alto e curvo rivolto verso chi guarda, sopra un telefono fisso e un tablet, una sedia dietro il bancone, due poltroncine d'attesa e uno zerbino sul bordo anteriore della lastra, come un ingresso aperto;
2. al centro: il commerciale, con un tavolo, due sedie e un portatile aperto, una lavagna bianca vuota;
3. in fondo, in alto contro le pareti con le finestre: l'amministrazione, con una scrivania, una sedia, scaffali con faldoni in fila con piccole spunte verdi #34d399 e una stampante;
4. sul lato sinistro: la vetrina online, con una scrivania, una sedia e un grande monitor rivolto verso l'esterno;
5. sul lato destro: il laboratorio software, con una scrivania, una sedia, due monitor e un piccolo server ordinato.
Ogni zona è separata dalle altre da pareti basse a mezza altezza, così che ogni stanza si riconosca a colpo d'occhio. Ogni scrivania ha la sua sedia.
Sul pavimento corrono sottili piste luminose blu #3b82f6 come quelle di un circuito stampato: entrano dall'angolo in basso, passano dalla reception, dal commerciale e arrivano all'amministrazione, con due rami verso la vetrina e il laboratorio; quattro piccoli nodi quadrati lungo il percorso; una pista torna verso l'angolo in basso e scende dal bordo della lastra.
Tutto è in perfetto ordine, luce calda di fine giornata dalle finestre e dalle lampade, atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa.
Colori: pareti e pavimenti in blu ardesia #111a2e e #1e2a44, mobili chiari #e6edf7 e legno caldo, grigio blu #94a3b8 per i dettagli, blu #3b82f6 per le piste e gli schermi, verde #34d399 solo per ciò che è in ordine.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 2. Ufficio nel caos (nella stessa chat, allegando la nuova immagine 1)

```
Modifica l'immagine allegata mantenendo esattamente la stessa inquadratura, la stessa prospettiva, le stesse pareti, gli stessi mobili nella stessa posizione e lo stesso stile. Cambia solo lo stato dell'ufficio: ora è sommerso dal lavoro ripetitivo.
Visto dall'alto, le carte coprono i piani delle scrivanie e debordano oltre i bordi; pile di fogli instabili che franano sulle tastiere, raccoglitori aperti e caduti, cartelline aperte, buste strappate, post-it gialli attaccati intorno agli schermi, scatole aperte, una stampante che sputa fogli sul pavimento, il telefono della reception con la cornetta staccata, sugli schermi tanti piccoli riquadri di notifica rossi e arancioni, tazze di caffè vuote, cavi aggrovigliati dietro le scrivanie. Davanti all'ingresso, sullo zerbino, una pila di buste e pacchi non aperti.
Luce fredda e un po' piatta di neon, niente luce calda. Stessi colori di base (#0b1220, #111a2e, #1e2a44, #e6edf7), nessun verde, con in più rosso e arancione solo per le notifiche e giallo per i post-it.
Le sedie e i mobili restano esattamente dove sono nell'immagine allegata, alcune sedie girate o spostate di poco. Le piste blu sul pavimento sono spente: grigie, senza luce, coperte di carte.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 3. Dettaglio: la reception in ordine (allegando la nuova immagine 1)

```
Usa l'immagine allegata come riferimento di stile, colori e luce. Disegna solo la reception di quell'ufficio, quella nell'angolo in basso vicino all'ingresso, ingrandita: gli stessi mobili, in isometria vista dall'alto a 30°. Non disegnare il guscio dell'ufficio intero né le altre stanze: inquadra solo questa stanza da vicino, come un ingrandimento, con la lastra di pavimento tagliata ai bordi della stanza, che galleggia al centro su un fondo blu notte uniforme #0b1220.
Bancone alto e curvo pulito, telefono fisso con la cornetta al suo posto, un tablet che mostra una sola notifica verde #34d399, una sedia dietro il bancone, due poltroncine d'attesa, lo zerbino dell'ingresso, un vassoio con tre buste impilate, una pianta. Una pista luminosa blu #3b82f6 entra dal bordo della lastra e passa sotto il bancone. Luce calda di lampada, atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. Colori: #111a2e, #1e2a44, #e6edf7, #94a3b8, legno caldo, blu #3b82f6, verde #34d399 solo sugli oggetti in ordine.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 4. Dettaglio: l'amministrazione in ordine (allegando la nuova immagine 1)

```
Usa l'immagine allegata come riferimento di stile, colori e luce. Disegna solo l'amministrazione di quell'ufficio, quella in fondo contro le pareti con le finestre, ingrandita: gli stessi mobili, in isometria vista dall'alto a 30°. Non disegnare il guscio dell'ufficio intero né le altre stanze: inquadra solo questa stanza da vicino, come un ingrandimento, con la lastra di pavimento tagliata ai bordi della stanza, che galleggia al centro su un fondo blu notte uniforme #0b1220.
Scrivania con un raccoglitore aperto e i fogli allineati, una sedia, scaffali con faldoni in fila ordinati per colore, ognuno con una piccola spunta verde #34d399, una stampante spenta con un solo foglio nel vassoio, uno schermo con una tabella fatta di righe colorate, una finestra con luce calda, una lampada accesa. Una pista luminosa blu #3b82f6 entra dal bordo della lastra e arriva allo scaffale. Atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. Colori: #111a2e, #1e2a44, #e6edf7, #94a3b8, legno caldo, blu #3b82f6, verde #34d399 solo sugli oggetti in ordine.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

**Prima di caricare**:
- La reception deve stare davanti, nell'angolo in basso, e ogni scrivania deve avere la sua sedia.
- Guarda le immagini 1 e 2 una dopo l'altra: guscio, pareti, mobili e sedie devono stare negli stessi punti. Se Gemini ha spostato qualcosa, rigenera la 2 aggiungendo "stessa identica inquadratura dell'immagine allegata". Allineamento e sagoma li verifico io.
- I dettagli 3 e 4 si generano solo dopo la nuova immagine 1. Devono essere ingrandimenti di quella stanza, non l'ufficio intero.
- Le immagini attuali (prima versione) restano finché non arrivano le nuove: vanno sostituite con gli stessi nomi.
