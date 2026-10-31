/**
 * "La macchina del flusso": il caos dell'ufficio entra a sinistra, attraversa
 * quattro nodi e esce ordinato a destra. Tutto è geometria in codice (nessun GLB).
 *
 * Coreografia, guidata da un solo valore 0..1 (in fase 4 lo darà lo scroll):
 *   0.00  caos visibile, nodi spenti
 *   0.40  i nodi si accendono uno alla volta
 *   0.70  gli elementi attraversano la catena
 *   1.00  restano solo i risultati ordinati
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { looks, type LookId } from './flow-looks';

export interface FlowScene {
  setProgress(t: number): void;
  select(i: number | null): void;
  dispose(): void;
  info(): { calls: number; triangles: number };
}

interface Options {
  onLabels?: (pts: { x: number; y: number; visible: boolean }[], portrait: boolean) => void;
  onSelect?: (i: number) => void;
  /** Movimento leggero della camera col puntatore (solo desktop). */
  orbit?: boolean;
  /** HDRI equirettangolare (.hdr o .hdr.gz) per l'illuminazione: Poly Haven, CC0. */
  hdri?: string;
}

/** Scarica l'HDRI (anche compresso con gzip) e lo prepara come mappa d'ambiente. */
async function loadHdri(url: string): Promise<THREE.DataTexture> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HDRI ${res.status}`);
  let buf = await res.arrayBuffer();
  // compresso con gzip? si riconosce dai primi due byte, non dal nome del file
  const head = new Uint8Array(buf, 0, 2);
  if (head[0] === 0x1f && head[1] === 0x8b) {
    buf = await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }
  const loader = new HDRLoader();
  const tex = new THREE.DataTexture();
  // stessa preparazione di HDRLoader.load(): filtri lineari, flipY, spazio colore lineare
  (loader as unknown as { _applyTexData(t: THREE.Texture, d: unknown): void })._applyTexData(tex, loader.parse(buf));
  tex.needsUpdate = true;
  tex.mapping = THREE.EquirectangularReflectionMapping;
  return tex;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => v * v * (3 - 2 * v);

export function createFlowScene(canvas: HTMLCanvasElement, lookId: LookId, opts: Options = {}): FlowScene {
  const look = looks[lookId];
  const lite = !matchMedia('(min-width: 761px) and (pointer: fine)').matches;
  const M = look.materials(lite);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  look.lights(scene);
  // Illuminazione: HDRI da studio di Poly Haven (512x256, 315 KB). Il renderer lo prefiltra da solo
  // (PMREM 256 px, il minimo di three.js). Finché non arriva, bastano le luci della variante.
  let envTex: THREE.DataTexture | null = null;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  const root = new THREE.Group();
  scene.add(root);

  // Disposizione: il flusso corre lungo u (sinistra -> destra); in verticale diventa alto -> basso.
  let portrait = false;
  const P = (u: number, v: number, z = 0) => (portrait ? new THREE.Vector3(v * 1.2, -u * 1.02, z) : new THREE.Vector3(u, v, z));

  const geos: THREE.BufferGeometry[] = [];
  const g = <T extends THREE.BufferGeometry>(x: T) => { geos.push(x); return x; };
  const card = g(new RoundedBoxGeometry(0.92, 0.62, 0.04, 2, 0.035));
  const bubble = g(new RoundedBoxGeometry(0.86, 0.46, 0.06, 3, 0.16));
  const strip = g(new THREE.BoxGeometry(0.62, 0.06, 0.012));
  const tab = g(new THREE.BoxGeometry(0.22, 0.22, 0.012));
  const nodeGeo = look.board ? g(new RoundedBoxGeometry(0.72, 0.72, 0.16, 2, 0.03)) : g(new RoundedBoxGeometry(0.62, 0.62, 0.62, 4, 0.12));
  const pinGeo = g(new THREE.BoxGeometry(0.07, 0.16, 0.03));
  const collarGeo = g(new THREE.CylinderGeometry(0.1, 0.1, 0.12, 24));

  // --- il caos: email, WhatsApp, PDF, fogli ---
  const kinds = ['email', 'wa', 'pdf', 'sheet'] as const;
  const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
  const chaos: { obj: THREE.Group; home: THREE.Vector3; rot: THREE.Euler }[] = [];
  for (let i = 0; i < 10; i++) {
    const kind = kinds[i % 4];
    const obj = new THREE.Group();
    const body = new THREE.Mesh(kind === 'wa' ? bubble : card, kind === 'wa' ? M.wa : kind === 'pdf' ? M.paper : M.paper);
    obj.add(body);
    if (kind === 'email') { const s = new THREE.Mesh(strip, M.node); s.position.set(0, 0.12, 0.03); s.rotation.z = 0.0; obj.add(s); }
    if (kind === 'pdf') { const t = new THREE.Mesh(tab, M.pdf); t.position.set(0.3, 0.17, 0.03); obj.add(t); }
    if (kind === 'sheet') for (let r = 0; r < 3; r++) { const s = new THREE.Mesh(strip, M.wa); s.position.set(0, 0.15 - r * 0.15, 0.03); obj.add(s); }
    const home = new THREE.Vector3(-4.3 + rnd() * 1.6, -1.25 + rnd() * 2.5, -0.5 + rnd() * 0.9);
    const rot = new THREE.Euler((rnd() - 0.5) * 0.6, (rnd() - 0.5) * 0.9, (rnd() - 0.5) * 1.3);
    root.add(obj);
    chaos.push({ obj, home, rot });
  }

  // --- la catena: quattro nodi ---
  const nodeU = [-1.6, -0.55, 0.55, 1.6];
  const nodes = nodeU.map((u, i) => {
    const grp = new THREE.Group();
    const mesh = new THREE.Mesh(nodeGeo, M.node);
    mesh.userData.index = i;
    grp.add(mesh);
    if (look.board) {
      for (let k = 0; k < 4; k++) for (const side of [-1, 1]) {
        const pin = new THREE.Mesh(pinGeo, M.pin!);
        pin.position.set(-0.24 + k * 0.16, side * 0.42, -0.02);
        grp.add(pin);
      }
    } else {
      for (const side of [-1, 1]) {
        const c = new THREE.Mesh(collarGeo, M.connector);
        c.rotation.z = Math.PI / 2;
        c.position.x = side * 0.36;
        grp.add(c);
      }
    }
    root.add(grp);
    return { grp, mesh, u, v: i % 2 ? -0.18 : 0.18 };
  });

  // --- i risultati ordinati ---
  const outs = [0.85, 0, -0.85].map((v, i) => {
    const grp = new THREE.Group();
    if (i === 0) { grp.add(new THREE.Mesh(card, M.out)); for (let r = 0; r < 3; r++) { const s = new THREE.Mesh(strip, M.track); s.position.set(0, 0.15 - r * 0.15, 0.03); grp.add(s); } }
    if (i === 1) { const bar = new THREE.Mesh(g(new RoundedBoxGeometry(1.3, 0.26, 0.05, 2, 0.04)), M.out); grp.add(bar); }
    if (i === 2) { grp.add(new THREE.Mesh(bubble, M.out)); const dot = new THREE.Mesh(g(new THREE.CircleGeometry(0.07, 20)), M.track); dot.position.set(-0.28, 0, 0.04); grp.add(dot); }
    grp.scale.setScalar(0.001);
    root.add(grp);
    return { grp, v };
  });

  // --- la linea di flusso (tubo luminoso o pista) ---
  let track: THREE.Object3D | null = null;
  let path: THREE.Curve<THREE.Vector3> | null = null;
  let board: THREE.Mesh | null = null;

  function build() {
    if (track) { root.remove(track); track.traverse((o) => { if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose(); }); }
    const pts = [P(-2.6, 0, 0), ...nodes.map((n) => P(n.u, n.v, 0)), P(2.6, 0, 0)];
    if (look.tracks === 'tube') {
      path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      track = new THREE.Mesh(new THREE.TubeGeometry(path, 240, 0.05, 12, false), M.track);
    } else {
      const cp = new THREE.CurvePath<THREE.Vector3>();
      const grp = new THREE.Group();
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const mid = portrait ? new THREE.Vector3(b.x, a.y, 0) : new THREE.Vector3(a.x, b.y, 0);
        for (const [s, e] of [[a, mid], [mid, b]] as const) {
          const len = s.distanceTo(e);
          if (len < 1e-3) continue;
          cp.add(new THREE.LineCurve3(s.clone(), e.clone()));
          const seg = new THREE.Mesh(new THREE.BoxGeometry(len + 0.09, 0.09, 0.02), M.track);
          seg.position.copy(s).add(e).multiplyScalar(0.5);
          seg.rotation.z = Math.atan2(e.y - s.y, e.x - s.x);
          grp.add(seg);
        }
      }
      path = cp;
      track = grp;
    }
    root.add(track);
    nodes.forEach((n) => n.grp.position.copy(P(n.u, n.v, 0)));
    // in verticale i risultati si mettono in colonna sotto la catena
    outs.forEach((o, i) => o.grp.position.copy(portrait ? P(3.0 + i * 0.62, 0, 0) : P(3.55, o.v, 0)));
    if (look.board) {
      if (!board) { board = new THREE.Mesh(g(new THREE.PlaneGeometry(1, 1)), M.board!); root.add(board); }
      board.scale.set(60, 60, 1);
      board.position.set(0, 0, -0.62);
    }
    fit();
  }

  // camera: FOV 35, inquadra tutta la macchina; leggera orbita col puntatore su desktop
  const look0 = new THREE.Vector3();
  const aim = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  let dist = 12;
  function fit() {
    const w = portrait ? 4.3 : 9.6, h = portrait ? 9.6 : 3.6;
    const vf = THREE.MathUtils.degToRad(camera.fov);
    const hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    dist = Math.max(w / 2 / Math.tan(hf / 2), h / 2 / Math.tan(vf / 2)) * 1.08;
  }
  function placeCamera() {
    // in verticale l'inclinazione va di lato: così non schiaccia la catena, che corre dall'alto in basso
    const tilt = THREE.MathUtils.degToRad((portrait ? 6 : look.tilt) + cur.y * 4);
    const az = THREE.MathUtils.degToRad((portrait ? -look.tilt * 0.6 : 0) + cur.x * 7);
    camera.position.set(Math.sin(az) * Math.cos(tilt) * dist, Math.sin(tilt) * dist, Math.cos(az) * Math.cos(tilt) * dist);
    camera.up.set(0, 1, 0);
    camera.lookAt(look0);
  }

  // post-processing: bagliore lieve solo sugli accenti, solo su schermi grandi
  let composer: EffectComposer | null = null;
  const wantBloom = look.bloom && !lite;
  if (wantBloom) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(256, 256), 0.32, 0.35, 0.97));
    composer.addPass(new OutputPass());
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    composer?.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const p = w / h < 0.9;
    if (p !== portrait || !path) { portrait = p; build(); } else fit();
    dirty = true;
  }

  // --- stato ---
  let progress = 0;
  let selected: number | null = null;
  const tmp = new THREE.Vector3();
  const start = new THREE.Vector3();
  // si ridisegna solo quando qualcosa cambia: a riposo la scena non costa nulla
  let dirty = true;
  if (opts.hdri && look.envIntensity > 0) {
    loadHdri(opts.hdri).then((t) => {
      envTex = t;
      scene.environment = t;
      scene.environmentIntensity = look.envIntensity;
      dirty = true;
    }).catch(() => { /* senza HDRI restano le luci della variante */ });
  }

  function apply() {
    if (!path) return;
    const t = progress;
    path.getPointAt(0, start);
    chaos.forEach((c, i) => {
      const s = clamp01((t - 0.6 - i * 0.016) / 0.22);
      const home = P(c.home.x, c.home.y, c.home.z);
      if (s <= 0) {
        c.obj.position.copy(home);
        c.obj.rotation.copy(c.rot);
        c.obj.scale.setScalar(1);
        c.obj.visible = true;
      } else {
        const lead = clamp01(s / 0.25);
        const along = clamp01((s - 0.25) / 0.75);
        if (along <= 0) c.obj.position.lerpVectors(home, start, ease(lead));
        else path!.getPointAt(ease(along), c.obj.position);
        c.obj.rotation.set(c.rot.x * (1 - lead), c.rot.y * (1 - lead), c.rot.z * (1 - lead));
        c.obj.scale.setScalar(1 - 0.55 * lead);
        c.obj.visible = along < 0.98;
      }
    });
    nodes.forEach((n, i) => {
      const on = t >= 0.4 + i * 0.075 || selected === i;
      n.mesh.material = on ? M.nodeOn : M.node;
      const pulse = selected === i ? 1.08 : 1;
      n.grp.scale.setScalar(pulse);
    });
    const lit = clamp01((t - 0.4) / 0.3);
    M.track.emissiveIntensity = 0.15 + lit * (look.bloom ? 1.6 : 0.9);
    outs.forEach((o, i) => {
      const s = ease(clamp01((t - 0.8 - i * 0.05) / 0.1));
      o.grp.scale.setScalar(Math.max(0.001, s));
    });
  }

  // --- etichette HTML e tap sui nodi ---
  function emitLabels() {
    if (!opts.onLabels) return;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    opts.onLabels(nodes.map((n, i) => {
      tmp.copy(n.grp.position);
      root.localToWorld(tmp);
      tmp.project(camera);
      return { x: (tmp.x * 0.5 + 0.5) * w, y: (-tmp.y * 0.5 + 0.5) * h, visible: progress >= 0.4 + i * 0.075 || selected === i };
    }), portrait);
  }
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const onDown = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(nodes.map((n) => n.mesh), false)[0];
    if (hit) opts.onSelect?.(hit.object.userData.index as number);
  };
  canvas.addEventListener('pointerdown', onDown);
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    aim.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    aim.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    dirty = true;
  };
  if (opts.orbit) window.addEventListener('pointermove', onMove, { passive: true });

  const timer = new THREE.Timer();
  timer.connect(document);
  function frame() {
    timer.update();
    const moving = Math.abs(aim.x - cur.x) > 0.001 || Math.abs(aim.y - cur.y) > 0.001;
    if (!dirty && !moving) return;
    dirty = false;
    cur.x += (aim.x - cur.x) * 0.06;
    cur.y += (aim.y - cur.y) * 0.06;
    placeCamera();
    apply();
    if (composer) composer.render(); else renderer.render(scene, camera);
    emitLabels();
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  const io = new IntersectionObserver(([e]) => renderer.setAnimationLoop(e.isIntersecting ? frame : null));
  // shader compilati prima del primo disegno, in modo asincrono dove il browser lo permette
  placeCamera();
  apply();
  renderer.compileAsync(scene, camera).catch(() => {}).finally(() => io.observe(canvas));

  return {
    setProgress(t) { const v = clamp01(t); if (v !== progress) { progress = v; dirty = true; } },
    select(i) { selected = i; dirty = true; },
    info: () => ({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles }),
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect(); ro.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      timer.dispose();
      geos.forEach((x) => x.dispose());
      if (track) track.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
      Object.values(M).forEach((m) => (m as THREE.Material | undefined)?.dispose());
      envTex?.dispose();
      composer?.dispose();
      renderer.dispose();
    },
  };
}
