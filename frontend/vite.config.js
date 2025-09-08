import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        main: "./index.html",
        client: "./src/main.jsx",
        server: "./src/entry-server.jsx",
      },
    },
  },
  ssr: {
    noExternal: [
      // SEO
      "react-helmet-async",

  
    ],
  },
});
