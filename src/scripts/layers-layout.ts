/**
 * Geometria della "macchina del flusso" a livelli (prova 2.5D, /lab/hero-livelli).
 * Tutte le misure sono frazioni della scena (0..1), in due disposizioni:
 *   wide = orizzontale (computer, tablet), tall = verticale (telefono, sotto i 761 px).
 * La usano sia il markup statico (fotogramma finale senza script) sia la coreografia allo scroll.
 */
export type Pt = { x: number; y: number };
export type Layout = 'wide' | 'tall';

export const nodes = [
  { label: 'Ricevi', text: 'Raccoglie email, messaggi e moduli in un unico punto.' },
  { label: 'Leggi con Claude', text: 'Capisce cosa chiede il cliente ed estrae i dati utili.' },
  { label: 'Archivia', text: 'Scrive i dati nel foglio o nel gestionale, senza copia e incolla.' },
  { label: 'Notifica', text: 'Ti avvisa sul telefono solo quando serve una tua decisione.' },
];

export const outputs = [
  { title: 'Bozza di preventivo', meta: 'pronta da rivedere' },
  { title: 'Riga in tabella', meta: 'cliente · richiesta · data' },
  { title: 'Notifica', meta: '"Nuova richiesta da approvare"' },
];

/** I sei oggetti del caos: ogni tipo è un'immagine (o un segnaposto disegnato). */
export const kinds = ['email', 'whatsapp', 'pdf', 'foglio', 'postit', 'scontrino'] as const;
export type Kind = (typeof kinds)[number];

/** Dove sta ogni oggetto nel caos: x, y (centro), r (gradi), s (larghezza in frazione della scena), d (profondità). */
type Place = { x: number; y: number; r: number; s: number };
export const chaos: { kind: Kind; d: number; wide: Place; tall: Place }[] = [
  { kind: 'email', d: 0.7, wide: { x: 0.07, y: 0.2, r: -14, s: 0.1 }, tall: { x: 0.14, y: 0.05, r: -12, s: 0.24 } },
  { kind: 'whatsapp', d: 1.25, wide: { x: 0.17, y: 0.3, r: 9, s: 0.11 }, tall: { x: 0.45, y: 0.04, r: 8, s: 0.25 } },
  { kind: 'pdf', d: 0.9, wide: { x: 0.06, y: 0.55, r: 11, s: 0.075 }, tall: { x: 0.8, y: 0.07, r: 12, s: 0.18 } },
  { kind: 'foglio', d: 1.1, wide: { x: 0.18, y: 0.66, r: -8, s: 0.1 }, tall: { x: 0.25, y: 0.15, r: -7, s: 0.24 } },
  { kind: 'postit', d: 1.45, wide: { x: 0.12, y: 0.85, r: 16, s: 0.065 }, tall: { x: 0.62, y: 0.15, r: 15, s: 0.17 } },
  { kind: 'scontrino', d: 0.75, wide: { x: 0.24, y: 0.12, r: -5, s: 0.045 }, tall: { x: 0.9, y: 0.19, r: -9, s: 0.1 } },
  { kind: 'email', d: 1.35, wide: { x: 0.26, y: 0.86, r: 7, s: 0.09 }, tall: { x: 0.08, y: 0.2, r: 10, s: 0.2 } },
  { kind: 'whatsapp', d: 0.8, wide: { x: 0.03, y: 0.85, r: -10, s: 0.08 }, tall: { x: 0.44, y: 0.21, r: -6, s: 0.19 } },
];

export const layouts: Record<Layout, { start: Pt; end: Pt; nodes: Pt[]; outs: Pt[] }> = {
  wide: {
    start: { x: 0.3, y: 0.5 },
    end: { x: 0.8, y: 0.5 },
    nodes: [{ x: 0.36, y: 0.43 }, { x: 0.48, y: 0.57 }, { x: 0.6, y: 0.43 }, { x: 0.72, y: 0.57 }],
    outs: [{ x: 0.895, y: 0.27 }, { x: 0.895, y: 0.5 }, { x: 0.895, y: 0.73 }],
  },
  tall: {
    start: { x: 0.28, y: 0.26 },
    end: { x: 0.28, y: 0.69 },
    nodes: [{ x: 0.24, y: 0.33 }, { x: 0.32, y: 0.42 }, { x: 0.24, y: 0.51 }, { x: 0.32, y: 0.6 }],
    outs: [{ x: 0.5, y: 0.765 }, { x: 0.5, y: 0.85 }, { x: 0.5, y: 0.935 }],
  },
};

/** Curva morbida (Catmull-Rom -> Bézier) che passa dai nodi, in un riquadro w x h (di base 1000 x 1000). */
export function flowPath(l: Layout, w = 1000, h = 1000): string {
  const L = layouts[l];
  const p = [L.start, ...L.nodes, L.end].map((q) => ({ x: +(q.x * w).toFixed(1), y: +(q.y * h).toFixed(1) }));
  let d = `M${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c;
    const c1 = { x: b.x + (c.x - a.x) / 6, y: b.y + (c.y - a.y) / 6 };
    const c2 = { x: c.x - (e.x - b.x) / 6, y: c.y - (e.y - b.y) / 6 };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${c.x} ${c.y}`;
  }
  return d;
}
