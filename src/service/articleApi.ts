import axios from "@/utils/axios";
export default class homeApi {
  static createArticle(params: any) {
    return axios.post("/createArticle", params);
  }
  static getArticle(id: number) {
    return axios.get(`/getArticle?id=${id}`);
  }
  static updateArticle(params: any) {
    return axios.post(`/updateArticle`, params);
  }
  static addReader(params: any) {
    return axios.post(`/addReader`, params);
  }
  static likeArticle(params: any) {
    return axios.post(`/likeArticle`, params);
  }
  static getComment(params: any) {
    return axios.get(`/getComment?articleId=${params.articleId}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`);
  }
  static addComment(params: any) {
    return axios.post(`/addComment`, params);
  }
}
