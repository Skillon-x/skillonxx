import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['date-fns/subWeeks', 'date-fns/subYears', 'date-fns/toDate'],
  },
})
