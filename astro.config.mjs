// @ts-check
import { defineConfig } from 'astro/config';

// Sito statico: Cloudflare Workers serve la cartella dist/ come static assets.
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
