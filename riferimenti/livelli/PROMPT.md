# Prompt per Gemini: livelli della prova /lab/hero-livelli

**Immagini previste: 10.** Una scena di riferimento (non va sul sito), due sfondi (computer e telefono), un primo piano e sei oggetti. Se il piano gratuito ti limita, il minimo indispensabile è 8: riferimento, uno sfondo solo e sei oggetti. Lo sfondo per telefono si ricava ritagliando quello per computer (resta un po' sfocato, ma è il livello più lontano). Senza primo piano la scena funziona lo stesso.

## Come si usano

1. Genera prima la **scena di riferimento** (prompt 0) e tienila finché ti piace davvero: decide lo stile di tutto il resto.
2. Per ogni altro prompt, **allega la scena di riferimento** nella stessa chat e incolla il testo.
3. Salva i file in `riferimenti/livelli/` con questi nomi (png o jpg):
   `scena-riferimento`, `sfondo-computer`, `sfondo-telefono`, `primo-piano`, `oggetto-email`, `oggetto-whatsapp`, `oggetto-pdf`, `oggetto-foglio`, `oggetto-postit`, `oggetto-scontrino`.
4. Lancia `node tools/prepara-livelli.mjs`. Lo script scontorna, ripulisce, ritaglia e crea le versioni AVIF/WebP. Poi controlla i bordi in `riferimenti/livelli/controllo.png`.

**Perché il magenta e non il verde #00FF00.** La palette del sito è verde (#4ade80) e l'oggetto WhatsApp è verde: con un fondo verde lo scontorno mangerebbe parte dei soggetti. Il magenta #FF00FF non compare in nessun soggetto. Lo script legge comunque il colore dai bordi, quindi funziona con qualsiasi fondo uniforme.

**Se Gemini scrive testo o lettere** dentro le immagini (succede spesso su email e scontrini), rigenera aggiungendo: "Le righe di testo sono solo barre piene arrotondate, nessuna lettera, nessun numero".

---

## 0. Scena di riferimento (16:9)

> Illustrazione orizzontale 16:9 in stile stampa risograph a pochi inchiostri piatti, con grana di stampa visibile e un leggero fuori registro tra i colori. Notte, sotto un portico emiliano di mattoni: archi a tutto sesto in fila che si perdono in profondità, qualche finestra calda accesa al piano di sopra, pavimento di pietra. In primo piano il bordo di un banco di lavoro con pile di carte disordinate. Sulla parte sinistra della scena fluttuano nell'aria, in disordine e a distanze diverse, una busta da lettera, un fumetto di chat verde, un documento con un'etichetta rossa, un foglio di calcolo a celle verdi, un post-it giallo e uno scontrino lungo. La metà destra della scena resta calma e quasi vuota, con poco dettaglio.
> Palette rigorosa: fondo quasi nero verdastro #0a0d0b, superfici verde scurissimo #131a15 e #24302a, carta bianco-verde #e7efe9, verde segnale #4ade80, azzurro #7dd3fc, rosa #fca5a5, ambra #fbbf24 solo per luci e post-it. Niente viola, niente sfumature morbide, niente bagliori, niente persone. Nessun testo, nessuna lettera, nessun numero, nessun logo.

## 1. Sfondo per computer (21:9, senza scontorno)

> Usa l'immagine allegata solo come riferimento di stile: stessi inchiostri risograph, stessa grana, stessa palette, stessa luce notturna.
> Illustrazione panoramica 21:9 del solo portico emiliano di notte, vista frontale e un po' dal basso: una lunga fila regolare di archi di mattoni, pilastri, qualche finestra calda accesa sopra gli archi, pavimento di pietra scuro. Nessun oggetto volante, nessun banco, nessuna carta. Molto scuro e a basso contrasto, soprattutto nella fascia centrale orizzontale, che deve restare calma e uniforme perché sopra ci andranno elementi dell'interfaccia. L'immagine riempie tutto il riquadro fino ai bordi. Nessun testo, nessuna lettera, nessun logo, nessuna persona.

## 2. Sfondo per telefono (9:16, senza scontorno)

> Usa l'immagine allegata solo come riferimento di stile: stessi inchiostri risograph, stessa grana, stessa palette, stessa luce notturna.
> Illustrazione verticale 9:16 dello stesso portico emiliano di notte, visto in prospettiva lungo il porticato: archi di mattoni che si allontanano verso il fondo, qualche finestra calda accesa in alto, pavimento di pietra scuro. Nessun oggetto volante, nessun banco, nessuna carta. Molto scuro e a basso contrasto, con la fascia centrale verticale calma e uniforme perché sopra ci andranno elementi dell'interfaccia. L'immagine riempie tutto il riquadro fino ai bordi. Nessun testo, nessuna lettera, nessun logo, nessuna persona.

## 3. Primo piano (21:9, su magenta)

> Usa l'immagine allegata solo come riferimento di stile: stessi inchiostri risograph, stessa grana, stessa palette.
> Striscia orizzontale 21:9: solo il bordo anteriore di un banco di lavoro scuro che occupa il terzo inferiore dell'immagine, con due pile di carte e cartelline disordinate, una nell'angolo in basso a sinistra e una in basso a destra. Il centro del bordo è quasi libero. Colori scuri: #131a15, #24302a, carta in ombra #9aab9f. Tutto il resto dell'immagine, sopra il banco, è un fondo piatto e uniforme magenta puro #FF00FF, senza ombre, sfumature o riflessi magenta sugli oggetti. Nessun testo, nessuna lettera, nessun logo.

## 4–9. Oggetti che volano (1:1, su magenta)

Stessa apertura per tutti e sei, cambia solo la riga **Soggetto**:

> Usa l'immagine allegata solo come riferimento di stile: stessi inchiostri risograph, stessa grana, stesso leggero fuori registro, stessa palette.
> Un solo oggetto, isolato, centrato, intero, con ampio margine intorno, leggermente inclinato come se stesse cadendo nell'aria. Vista frontale, quasi piatta, con una piccola ombra propria sull'oggetto ma nessuna ombra proiettata sul fondo. Contorni netti.
> **Soggetto:** [vedi sotto]
> Fondo piatto e uniforme magenta puro #FF00FF che arriva fino ai bordi, senza sfumature, texture o vignettatura. Nessun riflesso magenta sull'oggetto. Le righe di testo sono solo barre piene arrotondate: nessuna lettera, nessun numero, nessun logo.

| File | Soggetto |
| --- | --- |
| `oggetto-email` | una busta da lettera chiusa color carta #e7efe9 con il lembo triangolare in tono #c9d6cc e un francobollo azzurro #7dd3fc |
| `oggetto-whatsapp` | un fumetto di chat con codina in basso a sinistra, verde scuro #1f3b2e, con tre barre di testo: una verde #4ade80 e due grigio-verdi #9aab9f |
| `oggetto-pdf` | un foglio di documento verticale color carta con l'angolo in alto a destra piegato e un'etichetta rettangolare rosa #fca5a5 in alto a sinistra, sotto alcune barre di testo chiare |
| `oggetto-foglio` | un foglio di calcolo orizzontale color carta con una griglia di celle piene: la prima fila verde #4ade80 chiaro, le altre verde pallido |
| `oggetto-postit` | un post-it quadrato giallo ambra #fbbf24 con l'angolo in basso a destra sollevato e due barre di scrittura più scure |
| `oggetto-scontrino` | uno scontrino lungo e stretto in verticale color carta, con il bordo inferiore a zigzag strappato e barre di stampa scure di lunghezze diverse |

---

## Peso previsto

Lo script tiene la somma sotto **600 KB sul telefono** e **1,5 MB sul computer**. Se sfora, abbassa la qualità a passi. Ogni tipo di oggetto si scarica una volta sola, anche se compare due volte nella scena. Con immagini di prova lo script ha prodotto circa 30–40 KB sul telefono e 50–70 KB sul computer. Con le illustrazioni vere mi aspetto 150–300 KB sul telefono e 300–600 KB sul computer: il peso lo fa quasi tutto lo sfondo.
