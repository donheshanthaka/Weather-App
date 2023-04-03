import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,
  },
  define: {
    'process.env': {
      VITE_APP_OPENWEATHER_API_KEY: JSON.stringify(process.env.VITE_APP_OPENWEATHER_API_KEY),
    },
  },
})
