// Riduce un HDRI .hdr (RGBE) a metà larghezza e lo salva compresso con gzip.
// Uso: node tools/riduci-hdri.mjs <ingresso.hdr> <uscita.hdr.gz> [larghezza=512]
// Serve a stare nel budget del 3D (< 1,5 MB per pagina): il browser lo decomprime
// con DecompressionStream e lo legge con HDRLoader.parse().
import { readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { FloatType } from 'three';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

const [input, output, w = '512'] = process.argv.slice(2);
const buf = readFileSync(input);
const loader = new HDRLoader().setDataType(FloatType);
const { data, width, height } = loader.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const W = Number(w), H = Math.round((height * W) / width), f = width / W;

const rgbe = new Uint8Array(W * H * 4);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  let r = 0, g = 0, b = 0, n = 0;
  for (let yy = Math.floor(y * f); yy < Math.floor((y + 1) * f); yy++)
    for (let xx = Math.floor(x * f); xx < Math.floor((x + 1) * f); xx++) {
      const i = (yy * width + xx) * 4; r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
    }
  r /= n; g /= n; b /= n;
  const m = Math.max(r, g, b), o = (y * W + x) * 4;
  if (m < 1e-32) continue;
  const e = Math.ceil(Math.log2(m) + 1e-9), s = 256 / 2 ** e;
  rgbe[o] = Math.min(255, r * s); rgbe[o + 1] = Math.min(255, g * s); rgbe[o + 2] = Math.min(255, b * s); rgbe[o + 3] = e + 128;
}
const header = Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${H} +X ${W}\n`, 'ascii');
const out = gzipSync(Buffer.concat([header, Buffer.from(rgbe)]), { level: 9 });
writeFileSync(output, out);
console.log(`${width}x${height} -> ${W}x${H}, ${(out.length / 1024).toFixed(0)} KB compressi`);
