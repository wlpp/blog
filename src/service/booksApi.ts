import axios from "@/utils/axios";
export default class homeApi {
  static getBooks() {
    return axios.get("/getBooks");
  }
}
