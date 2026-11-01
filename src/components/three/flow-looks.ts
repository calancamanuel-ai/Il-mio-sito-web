/**
 * Il look di "La macchina del flusso": "Vetro e luce", scelto da Manuel a fine fase 3
 * (la variante "Scheda elettronica" resta nella storia git).
 * Colori dalla palette Terminale: tubi = accento (#4ade80), nodi = secondario (#7dd3fc).
 */
import * as THREE from 'three';

export type LookId = 'vetro';

export interface Look {
  id: LookId;
  /** Inclinazione della camera in gradi (0 = frontale, 90 = dall'alto). */
  tilt: number;
  bloom: boolean;
  /** lite = telefono: niente trasparenza calcolata (costa un secondo rendering della scena). */
  materials: (lite: boolean) => {
    node: THREE.Material;
    nodeOn: THREE.Material;
    connector: THREE.Material;
    track: THREE.MeshStandardMaterial;
    paper: THREE.Material;
    wa: THREE.Material;
    pdf: THREE.Material;
    out: THREE.Material;
  };
  envIntensity: number;
  lights: (scene: THREE.Scene) => void;
}

const GREEN = 0x4ade80;
const BLUE = 0x7dd3fc;

export const looks: Record<LookId, Look> = {
  /** Variante 1: vetro satinato e tubi di luce, come una macchina in uno studio buio. */
  vetro: {
    id: 'vetro',
    tilt: 14,
    bloom: true,
    envIntensity: 0.85,
    materials: (lite) => ({
      node: lite
        ? new THREE.MeshStandardMaterial({ color: 0x9fc9dc, roughness: 0.35, metalness: 0, transparent: true, opacity: 0.88 })
        : new THREE.MeshPhysicalMaterial({ color: 0xbfe9fb, roughness: 0.42, metalness: 0, transmission: 0.85, thickness: 0.6, ior: 1.45, attenuationColor: new THREE.Color(BLUE), attenuationDistance: 1.4 }),
      nodeOn: lite
        ? new THREE.MeshStandardMaterial({ color: BLUE, roughness: 0.3, metalness: 0, emissive: new THREE.Color(BLUE), emissiveIntensity: 0.6 })
        : new THREE.MeshPhysicalMaterial({ color: BLUE, roughness: 0.35, metalness: 0, transmission: 0.55, thickness: 0.6, ior: 1.45, emissive: new THREE.Color(BLUE), emissiveIntensity: 0.55 }),
      connector: new THREE.MeshStandardMaterial({ color: 0x9fb4c8, metalness: 1, roughness: 0.32 }),
      track: new THREE.MeshStandardMaterial({ color: 0x0f2a1a, emissive: new THREE.Color(GREEN), emissiveIntensity: 0.15, roughness: 0.4 }),
      paper: new THREE.MeshStandardMaterial({ color: 0xb9c6bd, roughness: 0.8 }),
      wa: new THREE.MeshStandardMaterial({ color: 0x2f7d4f, roughness: 0.6 }),
      pdf: new THREE.MeshStandardMaterial({ color: 0x8c3a3a, roughness: 0.65 }),
      out: new THREE.MeshStandardMaterial({ color: 0xd3ddd6, roughness: 0.55 }),
    }),
    lights: (scene) => {
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(4, 6, 5);
      const rim = new THREE.DirectionalLight(BLUE, 1.4);
      rim.position.set(-5, 2, -4);
      scene.add(key, rim, new THREE.AmbientLight(0x1a2a22, 0.6));
    },
  },
};

export const ACCENT = new THREE.Color(GREEN);
