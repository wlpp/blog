import { defineComponent, getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import articleApi from "@/service/articleApi";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import homeApi from "@/service/homeApi";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const state = reactive({
      html: "",
      confirVisable: true,
      createVisable: false,
      updateVisable: false,
      isUpdate: false,
      id: "",
      title: "",
      tagNames: "",
      content: ""
    });
    const router = useRouter();
    const createArticle = () => {
      if (state.title === "") {
        ElMessage.error("标题不能为空");
        return;
      }
      if (state.tagNames === "") {
        ElMessage.error("标签不能为空");
        return;
      }
      const params = {
        title: state.title,
        content: state.content,
        tagNames: state.tagNames
      };
      articleApi.createArticle(params).then((res: any) => {
        state.createVisable = false;
        ElMessage.success(res.message);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      });
    };
    const getArticle = () => {
      if (state.id === "") {
        ElMessage.error("文章id不能为空");
        return;
      }
      articleApi
        .getArticle(parseInt(state.id))
        .then((res: any) => {
          if (res.data) {
            state.updateVisable = false;
            state.html = res.data.content;
            state.content = res.data.content;
          } else {
            ElMessage.error("不存在改ID文章");
          }
        })
        .catch((err: any) => {
          ElMessage.error(err.message);
        });
    };

    const onSelect = (type: number) => {
      state.confirVisable = false;
      if (type === 1) {
        state.updateVisable = true;
        state.isUpdate = true;
      }
    };
    const onSave = (text: string, html: string) => {
      state.content = text;
      if (state.isUpdate) {
        ElMessageBox.confirm("此操作将更新文章", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const params = {
            id: parseInt(state.id),
            content: state.content
          };
          articleApi.updateArticle(params).then((res: any) => {
            ElMessage.success(res.message);
            setTimeout(() => {
              router.push("/");
            }, 1000);
          });
        });
        // .catch(() => {
        //   console.log("取消");
        // });
      } else {
        state.createVisable = true;
      }
    };
    onMounted(() => {});
    return {
      ...toRefs(state),
      onSelect,
      onSave,
      createArticle,
      getArticle
    };
  }
});
