import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // Bind the server to 127.0.0.1
    port: 5173, // Set the desired port
  },
});