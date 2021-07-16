import { defineComponent, onMounted, reactive, toRefs } from "vue";
import booksApi from "@/service/booksApi";
interface BooksType {
  id: number;
  title: string;
  author: string;
  difficulty: number;
  evaluation: string;
  pic: string;
}
export default defineComponent({
  setup() {
    const state = reactive({
      value: 3,
      books: <BooksType[]>[]
    });
    onMounted(() => {
      booksApi.getBooks().then((res: any) => {
        state.books = res.data;
      });
    });
    return {
      ...toRefs(state)
    };
  }
});
