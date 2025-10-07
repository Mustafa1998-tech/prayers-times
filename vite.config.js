import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/prayers-times/' : '/';
  return {
    base,
    plugins: [react()],
  };
});
