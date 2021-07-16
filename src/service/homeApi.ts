import axios from "@/utils/axios";
export default class homeApi {
  static getAllArticle(params: any) {
    return axios.get(`/allArticle?title=${params.queryTitle}&tagNames=${params.queryTags}&pageIndex=${params.queryIndex}&pageSize=${params.querySize}`);
  }
  static getTags() {
    return axios.get("/tags");
  }
  static getBlogger() {
    return axios.get("/blogger");
  }
}
