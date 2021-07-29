import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
import styleImport from "vite-plugin-style-import";
import Markdown from "vite-plugin-md";
export default defineConfig({
  server: {
    open: "/write"
  },
  base: "/",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/css/mixins.scss";'
      }
    }
  },
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown(),
    alias({
      entries: [{ find: "@", replacement: "/src" }]
    }),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: name => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: name => {
            return `element-plus/lib/${name}`;
          }
        }
      ]
    })
  ]
});
