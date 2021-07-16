import { defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from "vue";
import homeApi from "@/service/homeApi";
import { useRouter } from "vue-router";
interface allArticleType {
  _id: string;
  id: number;
  title: string;
  commentNum: number;
  likeNum: number;
  readNum: number;
  tagNames: any;
}
interface tagsType {
  _id: string;
  name: string;
  status: boolean;
}
interface bloggerType {
  name: string;
  like: number;
  article: number;
  comment: number;
  avatar: string;
}
export default defineComponent({
  components: {},
  setup() {
    const state = reactive({
      allArticle: <allArticleType[]>[],
      tagNames: <tagsType[]>[],
      blogger: <bloggerType>{},
      queryTags: "",
      queryTitle: "",
      queryIndex: 1,
      querySize: 5,
      queryTotal: 0,
      isQuery: true,
      isChange: false,
      date: new Date()
    });
    const router = useRouter();
    const getAllArticle = () => {
      const params = {
        queryTitle: state.queryTitle,
        queryTags: state.queryTags,
        queryIndex: state.queryIndex,
        querySize: state.querySize
      };
      homeApi.getAllArticle(params).then((res: any) => {
        state.allArticle =
          res.data &&
          res.data.map((item: allArticleType) => {
            return {
              ...item,
              tagNames: item.tagNames.split(",")
            };
          });
        state.isQuery && (state.queryTotal = res.pageTotal);
        state.isQuery = false;
      });
    };
    const getTags = () => {
      homeApi.getTags().then((res: any) => {
        state.tagNames = res.data;
      });
    };

    const getBlogger = () => {
      homeApi.getBlogger().then((res: any) => {
        state.blogger = res.data && res.data[0];
      });
    };
    getBlogger();
    const onTags = (_idx: number) => {
      // state.tagNames[_idx].status = !state.tagNames[_idx].status;
      // state.queryTags = state.tagNames
      //   .filter(item => item.status)
      //   .map(item => item.name)
      //   .join(",");
      if (state.queryTags === state.tagNames[_idx].name) {
        state.tagNames.map(item => (item.status = false));
        state.queryTags = "";
      } else {
        state.tagNames.map(item => (item.status = false));
        state.tagNames[_idx].status = true;
        state.queryTags = state.tagNames[_idx].name;
      }
      getAllArticle();
    };
    const onChangePage = (type: string) => {
      switch (type) {
        case "prev":
          if (state.queryIndex <= 1) return;
          state.queryIndex--;
          break;
        case "next":
          if (state.queryIndex >= state.queryTotal) return;
          state.queryIndex++;
          break;
      }
      getAllArticle();
    };
    const goArticle = (id: number) => {
      router.push({ path: `/article/${id}` });
    };
    onMounted(() => {
      getAllArticle();
      getTags();
    });
    return {
      ...toRefs(state),
      onTags,
      onChangePage,
      getAllArticle,
      goArticle
    };
  }
});
