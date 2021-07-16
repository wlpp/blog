import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import alias from "@rollup/plugin-alias";
import styleImport from "vite-plugin-style-import";
import Markdown from "vite-plugin-md";
// const fs = require("fs");
// const dotenv = require("dotenv");
// const envConfig = dotenv.parse(fs.readFileSync(".env.development"));
// let NODE_ENV = "";
// for (const k in envConfig) {
//   NODE_ENV = envConfig["NODE_ENV"];
// }
// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://www.wlppo.top:3333",
  //       // target: "http://localhost:3333",
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, "")
  //     }
  //   }
  // },
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
