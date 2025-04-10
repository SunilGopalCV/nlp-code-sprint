import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: import.meta.env.VITE_BASE_PATH || "/nlp-code-sprint",
});
