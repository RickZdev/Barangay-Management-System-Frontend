import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log statements in production
        pure_funcs: ["console.log"], // Treat console.log as pure function
      },
    },
    chunkSizeWarningLimit: 500, // Adjust chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-vendor";
          }
          // Add additional manual chunking logic here as needed
        },
      },
    },
    // Optionally configure additional optimizations
    // optimizeDeps: {
    //   include: ['package-name'], // Explicitly specify dependencies to optimize
    // },
  },
});
