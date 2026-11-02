# Sistema di movimento [BOZZA]

Bozza della fase A (2 novembre 2026), da approvare con il prototipo della fase B. Deriva da `docs/PIANO.md` ("Concetto" e "Sistema di movimento"); se qualcosa qui contraddice il piano, vince il piano.

**Idea in una riga**: chi scorre vive quello che Manuel vende. In alto il sito è nervoso, al centro lavora, in fondo è calmo. Ogni movimento dice in quale di questi tre stati siamo.

## 1. I tre stati

Lo stato dipende dalla posizione nella pagina, non dal tempo. Ogni sezione dichiara il suo con `data-stato="caos|elaborazione|calma"`; una sola variabile globale `--quiete` (0 → 1), aggiornata dallo scroll, regola densità, velocità e ampiezza degli effetti in tutta la pagina.

| | Caos | Elaborazione | Calma |
| --- | --- | --- | --- |
| Dove | Hero, inizio pagina | Le stanze, "Costruisci", Come lavoro, Prezzi | Quando non conviene, FAQ, invito finale |
| `--quiete` | 0 – 0,25 | 0,25 – 0,75 | 0,75 – 1 |
| Ritmo | Irregolare: ritardi casuali, tempi sfalsati | Regolare: passo fisso, tutto in colonna | Lento: pochi movimenti ampi |
| Durata tipica | 120 – 260 ms, a scatti | 300 – 500 ms, costante | 700 – 1200 ms |
| Curva | `steps()` e `power3.out` con piccoli rimbalzi di posizione (±2 px) | `power2.inOut`, `none` per i flussi continui | `expo.out`, `sine.inOut` |
| Caratteri | Pioggia fitta (fino a 100% delle colonne), tremolio, glifi che cambiano | Caratteri che scorrono lungo il circuito, si fermano e si decodificano | Pochissimi caratteri (≤ 5% delle colonne), lenti, che si spengono |
| Colore | Ciano e blu, qualche glifo fuori palette spento | Ciano sul circuito, verde quando un dato è "in ordine" | Verde stabile; luce calda solo nelle illustrazioni |
| Layout | Elementi leggermente fuori posto (rotazioni ±2°, spostamenti ±8 px) che si assestano | Allineati a una griglia a colonne visibile solo nel movimento | Molto spazio, composizioni ferme |

## 2. Gli strumenti (sempre gli stessi, dosati dallo stato)

1. **Pioggia di codice**: un solo `canvas` per pagina (in home dentro l'hero, poi un canvas sottile che accompagna il circuito). Glifi da un atlante pre-disegnato, mai `fillText` a ogni fotogramma. I glifi sono frammenti veri del lavoro d'ufficio (vedi §6). Densità = `1 − --quiete`.
2. **Decodifica**: un titolo o un'immagine entra come caratteri che si assestano nella forma finale. Il testo vero è nel DOM da subito (leggibile da screen reader e Google): l'effetto copre solo lo strato visivo (`aria-hidden`). Durata massima 700 ms per un titolo, una volta per visita.
3. **Circuito**: le piste (linee piene, ≥ 2 px, colore piatto) escono dall'hero e scendono lungo la pagina. Si "accendono" sotto il dato che le percorre; a ogni sezione entrano in un nodo. Sono il filo che collega una scena alla successiva.
4. **Profondità**: 3 livelli per scena (sfondo, illustrazione, interfaccia) con velocità diverse allo scroll (0,6 / 1 / 1,15). Solo `transform`, mai `top`/`left`.
5. **Cursore** (solo desktop, puntatore fine): nel raggio di 80 px i glifi della pioggia si ricompongono per 600 ms in una parola sensata ("pagato", "richiamato", "archiviato"), poi tornano caos. Niente scia, niente cursore personalizzato.

## 3. Le scene della home

| # | Sezione | Stato | Scena | Collegamento con la successiva |
| --- | --- | --- | --- | --- |
| 1 | Hero, il riordino | Caos → ordine | Ufficio nel caos → pioggia → circuito e nodi → ufficio in ordine (§5) | Le piste del circuito escono dal fondo dell'ufficio |
| 2 | Le stanze | Elaborazione | L'ufficio in ordine resta; tocchi una stanza: zoom sulla stanza, "prima" e "dopo" si decodificano | Un dato esce dalla stanza scelta e scende nella pista |
| 3 | Costruisci la tua automazione | Elaborazione | I tre blocchi scelti si collegano con le stesse piste; i caratteri del "cosa arriva" li attraversano | La richiesta compilata diventa una riga che scende |
| 4 | Come lavoro | Elaborazione | I 5 passi come nodi su una pista verticale; ognuno si accende quando lo raggiungi | La pista rallenta |
| 5 | Prezzi | Elaborazione → calma | Le cifre si decodificano una volta; nessun altro effetto | — |
| 6 | Quando non conviene | Calma | Un solo nodo spento, volutamente fermo | La luce si allarga |
| 7 | FAQ e invito finale | Calma | Quasi immobile; l'ultimo carattere della pagina entra nel pulsante "Prenota una call" | — |

Le altre pagine usano gli stessi strumenti: la loro "cosa viva" (vedi `CLAUDE.md`) sta nello stato elaborazione, l'invito finale in calma, la 404 è l'unico angolo di caos rimasto.

## 4. Interfaccia (regole di Emil Kowalski)

- Transizioni di pulsanti, menu, stati: ease-out (`cubic-bezier(0.2, 0.7, 0.2, 1)`), 150 – 250 ms, mai oltre 300 ms.
- Pressione: `scale(0.97)` su `:active`, ritorno in 150 ms.
- Menu e pannelli: entrano da dove sono stati aperti; uscita più veloce dell'entrata.
- Niente animazione al primo caricamento su elementi che l'utente deve usare subito (titolo, pulsante "Prenota").
- Hover solo con puntatore fine (`@media (hover: hover)`).

## 5. Il riordino (hero), tappa per tappa

Un solo valore `p` (0 → 1) guidato dallo scroll; tutte le posizioni sono funzioni di `p`, quindi tornando su la scena si rifà al contrario senza stati accumulati.

| `p` | Cosa si vede |
| --- | --- |
| 0 | L'illustrazione dell'ufficio nel caos (immagine vera, è l'LCP), titolo e pulsante in HTML. Tremolio leggero di qualche glifo sopra le carte |
| 0 – 0,2 | L'immagine si scompone in caratteri: le celle si staccano dall'alto, con un rumore che rende il bordo irregolare |
| 0,2 – 0,45 | Pioggia: le colonne cadono a velocità diverse, i frammenti d'ufficio si leggono a tratti |
| 0,45 – 0,7 | I caratteri entrano nelle piste del circuito e attraversano i 4 nodi (ricevi, capisci, archivia, avvisa), che si accendono uno alla volta; ritmo che diventa regolare |
| 0,7 – 0,9 | I caratteri si ordinano in colonne e volano al loro posto nell'ufficio in ordine |
| 0,9 – 1 | L'immagine vera dell'ufficio in ordine sostituisce i caratteri; luce calda; compaiono le stanze toccabili |

**Telefono**: stessa storia, più corta (pin di circa una schermata), meno caratteri, circuito verticale. **Movimento ridotto**: nessun canvas; le due immagini (caos e ordine) in sequenza con le etichette "Prima" e "Dopo", stanze toccabili sull'immagine in ordine.

## 6. I frammenti d'ufficio della pioggia

Parole e numeri d'esempio (dichiarati come tali, nessun dato vero di clienti): "fattura n. 132", "richiamami", "preventivo urgente", "RE: RE: ordine", "scad. 30/11", "+39 3·· ··· ····", "allegato mancante", "sollecito", "IBAN?", "a che punto è?", "bozza_v3_DEF", "conferma appuntamento", "DDT 0451", "pagato?". Nello stato calma restano solo parole risolte: "pagato", "archiviato", "risposto", "fatto".

## 7. Sicurezza e accessibilità

- Mai più di 3 lampeggi al secondo; nessun flash a schermo intero; variazioni di luminosità graduali (≥ 300 ms).
- `prefers-reduced-motion: reduce`: niente pioggia, niente decodifica, niente tremolio né parallasse; immagini statiche e testi subito. Le interazioni (stanze, demo) restano tutte.
- Senza JavaScript: come movimento ridotto. Nessun contenuto parte nascosto dal CSS: gli stati iniziali li imposta lo script.
- Testo sempre sopra un fondo che garantisce WCAG AA: dove passa la pioggia, il testo ha una sua superficie piena.
- Canvas `aria-hidden="true"`; tutto ciò che è significativo è HTML (titoli, stanze come pulsanti con nome, descrizione dell'immagine).

## 8. Prestazioni

- Pioggia: un canvas, DPR massimo 2 (1,5 su telefono), colonne limitate (circa 3.000 glifi su computer, 1.200 su telefono), atlante di glifi pre-renderizzato (anche l'alone, così niente `shadowBlur` a ogni fotogramma).
- Si ridisegna solo quando cambia `p` o nello stato caos con animazione d'ambiente a 30 fps; ferma fuori schermo (IntersectionObserver) e con scheda in background (`visibilitychange`).
- Script della scena caricato dopo il primo disegno (import dinamico in idle); JavaScript iniziale < 80 KB compressi.
- Obiettivo: 60 fps durante lo scroll su un telefono di fascia media, misurato in fase B.

## 9. Da decidere con il prototipo

- Durata del pin dell'hero su computer (proposta: 180% dell'altezza) e su telefono (90%).
- Quanta pioggia resta nelle sezioni centrali (proposta: solo lungo il circuito).
- Se il cursore che ricompone le parole distrae dalla lettura: si prova e si decide.
