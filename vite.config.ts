import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
  proxy: {
    '/api': {
      target: 'http://62.72.13.34:8001',
      changeOrigin: true,
      secure: false, // If backend is HTTP
    }
  }
},
  // server: {
  //   host: "::",
  //   port: 8081,
  // },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
