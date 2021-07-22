import axios from "@/utils/axios";
export default class homeApi {
  static getRecord(params: any) {
    return axios.get(`/getRecord?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`);
  }
  static updateLike(_id: string) {
    return axios.get(`/like?`, _id);
  }
}
