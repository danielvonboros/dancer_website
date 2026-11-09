import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The day of the build, YYYY-MM-DD. The prerendered HTML marks a
 * production "current" as of this day; the browser then checks again
 * against the visitor's own date (see src/hooks/useCurrent.ts).
 */
const pad = (n: number) => String(n).padStart(2, '0')
const now = new Date()
const buildDay = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { __BUILD_DAY__: JSON.stringify(buildDay) },
})
