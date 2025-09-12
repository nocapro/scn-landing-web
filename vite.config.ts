import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-slot",
            "lucide-react",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
          "landing-components": [
            "./src/components/Header.tsx",
            "./src/components/Footer.tsx",
            "./src/components/sections/Contribute.tsx",
            "./src/components/sections/ContextCost.tsx",
            "./src/components/sections/DesignDecisions.tsx",
            "./src/components/sections/Faq.tsx",
            "./src/components/sections/Hero.tsx",
            "./src/components/sections/Playground.tsx",
            "./src/components/sections/QuickStart.tsx",
            "./src/components/sections/Solution.tsx",
            "./src/components/sections/TokenEconomics.tsx",
            "./src/components/sections/UseCases.tsx",
          ],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    sourcemap: false,
    cssCodeSplit: true,
    target: "es2020",
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});