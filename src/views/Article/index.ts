import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from "vue";
import articleApi from "@/service/articleApi";
import { useRoute, useRouter } from "vue-router";
import goTop from "@/components/goTop.vue";
import Load from "@/components/load.vue";
import Login from "@/components/login.vue";
import { getCookie } from "@/utils/utils.ts";
import { ElMessage } from "element-plus";
interface ArticleType {
  id: number;
  title: string;
  content: string;
  commentNum: number;
  likeNum: number;
  tagNames: string;
  createTime: string;
  updateTime: string;
}

interface CommentType {
  articleId: number;
  guestName: string;
  imageName: string;
  commentText: string;
  replyGuest: string;
  replyText: string;
  createTime: string;
  updateTime: string;
}
export default defineComponent({
  components: {
    goTop,
    Load,
    Login
  },
  setup() {
    const commentRef = ref(null);
    const textareaRef = ref(null);
    const { proxy }: any = getCurrentInstance();
    const state = reactive({
      article: <any>{},
      isLoad: true,
      loginPopup: false,
      isLike: false,
      isreply: false,
      articleIds: <any>[],
      commentList: <CommentType[]>[],
      id: "",
      commentText: "",
      replyGuest: "",
      pageIndex: 1,
      pageSize: 5,
      pageTotal: 0
    });
    const router = useRouter();
    const route = useRoute();
    const init = () => {
      state.id = route.params.id as string;
      state.isLoad = true;
      if (localStorage.getItem("articleIds")) {
        state.articleIds = JSON.parse(localStorage.getItem("articleIds"));
        state.articleIds.includes(parseInt(state.id)) && (state.isLike = true);
      }
      getArticle();
      getComment();
    };
    const getArticle = () => {
      articleApi
        .getArticle(route.params.id)
        .then((res: any) => {
          if (res.code === 400) {
            ElMessage.error(res.message);
            setTimeout(() => {
              history.go(-1);
            }, 1000);
            return;
          }
          res.data &&
            (state.article = {
              createTime: res.data.createTime.slice(0, res.data.createTime.indexOf("T")),
              updateTime: res.data.updateTime.slice(0, res.data.updateTime.indexOf("T")),
              commentNum: 0,
              content: res.data.content,
              id: res.data.id,
              likeNum: res.data.likeNum,
              tagNames: res.data.tagNames,
              title: res.data.title
            });
          state.isLoad = false;
        })
        .catch((err: any) => (state.isLoad = false));
    };
    const addComment = () => {
      if (!proxy.$isLogin) {
        state.loginPopup = true;
        return;
      }
      if (state.commentText === "") {
        ElMessage.error("评论内容不能为空");
        return;
      }
      if (state.commentText.length < 2) {
        ElMessage.error("内容字数小于2");
        return;
      }
      const guestName = getCookie("b_user") || "";
      const params = {
        articleId: parseInt(state.id),
        commentText: state.commentText,
        guestName,
        replyGuest: state.replyGuest,
        replyText: ""
      };
      articleApi.addComment(params).then((res: any) => {
        ElMessage.success("评论成功");
        state.commentText = "";
        getComment();
      });
    };
    const getComment = () => {
      const params = {
        articleId: parseInt(state.id),
        pageIndex: state.pageIndex,
        pageSize: state.pageSize
      };
      articleApi.getComment(params).then((res: any) => {
        state.commentList = res.data.map((item: any) => {
          return {
            ...item,
            imageName: item.guestName.slice(0, 1),
            createTime: item.createTime.slice(0, item.createTime.indexOf("T")),
            updateTime: new Date(item.updateTime).getTime()
          };
        });
        state.pageTotal = res.pageTotal;
      });
    };
    const onLike = () => {
      if (!proxy.$isLogin) {
        state.loginPopup = true;
        return;
      }
      if (state.isLike) return;
      articleApi.likeArticle({ id: route.params.id }).then((res: any) => {
        if (res.code === 200) {
          state.articleIds.push(state.article.id);
          state.articleIds = [...new Set(state.articleIds)];
          localStorage.setItem("articleIds", JSON.stringify(state.articleIds));
          state.isLike = true;
          getArticle();
        }
      });
    };
    const onReply = (replyGuest: string) => {
      state.isreply = true;
      state.replyGuest = replyGuest;
    };
    const onChangePage = (type: string) => {
      switch (type) {
        case "prev":
          if (state.pageIndex <= 1) return;
          state.pageIndex--;
          break;
        case "next":
          if (state.pageIndex >= state.pageTotal) return;
          state.pageIndex++;
          break;
      }
      getComment();
    };
    const onClose = () => (state.loginPopup = false);
    const toComment = () => (commentRef.value as any).scrollIntoView({ behavior: "smooth" });
    onMounted(() => {
      init();
    });
    return {
      ...toRefs(state),
      commentRef,
      textareaRef,
      onLike,
      onClose,
      onReply,
      onChangePage,
      toComment,
      addComment
    };
  }
});
