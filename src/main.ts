import { createApp, getCurrentInstance } from "vue";
import App from "./App.vue";
import router from "@/ruoter";
import "@/assets/css/base.css";
import "./assets/iconfonts/iconfont.css";
import { ElButton, ElCalendar, ElDialog, ElInput, ElIcon, ElRate } from "element-plus";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { getCookie } from "@/utils/utils.ts";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import VueMarkdownEditor from "@kangc/v-md-editor";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import Prism from "prismjs";
import Particles from "particles.vue3";
import homeApi from "@/service/homeApi";
VueMarkdownEditor.use(vuepressTheme, {
  Prism
});
Prism.highlightAll();
const app = createApp(App);
app.config.globalProperties.$isLogin = !!getCookie("USER_LOGIN");
app.use(ElButton).use(ElCalendar).use(ElDialog).use(ElInput).use(ElIcon).use(ElRate);
app.use(VueMarkdownEditor).use(Particles)
app.use(router);
router.beforeEach((to: any, from: any, next: any) => {
  if (to.name === "Write") {
    homeApi.getBlogger().then((res: any) => (res.data[0].author ? next() : next("/")));
  } else {
    next();
  }
});
app.mount("#app");
