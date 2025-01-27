
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['www.eduhublearning.online'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
})

