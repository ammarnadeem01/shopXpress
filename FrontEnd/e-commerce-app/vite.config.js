import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    fs: {
      strict: "false",
    },
  },
  envPrefix: "REACT_APP_",
  plugins: [envCompatible(), react()],
});
