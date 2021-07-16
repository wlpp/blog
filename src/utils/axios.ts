import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";
axios.defaults.baseURL = import.meta.env.VITE_APP_WEB_URL;
axios.interceptors.response.use(res => {
  if (!res.data) {
    ElMessage.error("服务器异常");
    return Promise.reject(res);
  }
  if (res.data.code !== 200) {
    console.log(`${res.data.code}+${res.data.message}`);
    ElMessage.error(res.data.message);
    // return;
  }
  return res.data;
});

export default axios;
