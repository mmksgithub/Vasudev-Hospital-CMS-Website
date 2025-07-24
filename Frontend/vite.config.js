import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Use 'localhost' instead of '127.0.0.1'
    port: 5173,        // You can change this to any port you prefer
    strictPort: true,  // Fail if the port is already in use
  },
})
