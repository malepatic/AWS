import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import structuredClone from 'structured-clone';

if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = structuredClone;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    },
})
