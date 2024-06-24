import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // publicDir: 'src/assets'
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
