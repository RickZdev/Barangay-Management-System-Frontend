import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        pure_funcs: ["console.log"],
      },
    },
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate third-party libraries into a separate chunk
          if (id.includes("node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
});
