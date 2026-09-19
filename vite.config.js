import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: 상대 경로로 빌드
export default defineConfig({
  plugins: [react()],
  base: './',
})
