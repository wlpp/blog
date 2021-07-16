<template>
  <transition name="pop">
    <div class="login" v-if="isLogin">
      <div class="login-title">信息填写</div>
      <div class="login-center clearfix">
        <i class="iconfont iconuser"></i>
        <div class="login-input">
          <input type="text" v-model="name" @keyup.enter="onConfirm" />
          <div class="login-text">起个响当当的名字吧！</div>
        </div>
      </div>
      <div class="login-center clearfix">
        <i class="iconfont iconyouxiang"></i>
        <div class="login-input">
          <input type="text" v-model="email" @keyup.enter="onConfirm" />
          <div class="login-text">整个静鸡鸡的邮箱吧！</div>
        </div>
      </div>
      <div class="login-button sure" @click="onConfirm">确定</div>
      <div class="login-button close" @click="onClose">关闭</div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { setCookie } from "@/utils/utils.ts";
import articleApi from "@/service/articleApi";
export default defineComponent({
  props: {
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  setup(prop, content) {
    const state = reactive({
      name: "",
      email: "",
      name_msg: "起个响当当的名字吧！",
      email_msg: "整个静鸡鸡的邮箱吧！"
    });
    const { proxy }: any = getCurrentInstance();
    const onConfirm = () => {
      const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (state.name === "") {
        ElMessage.error("昵称不能为空");
        return;
      }
      if (state.email === "") {
        ElMessage.error("邮箱不能为空");
        return;
      }
      if (!reg.test(state.email)) {
        ElMessage.error("邮箱格式不正确");
        return;
      }
      const params = {
        name: state.name,
        email: state.email
      };
      articleApi.addReader(params).then((res: any) => {
        if (res.code === 200) {
          setCookie(24, "USER_LOGIN", true);
          setCookie(24, "b_user", state.name);
          content.emit("close");
          ElMessage.success(res.message);
          proxy.$isLogin = true;
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      });
    };
    const onClose = () => {
      content.emit("close");
    };
    return {
      ...toRefs(state),
      onConfirm,
      onClose
    };
  }
});
</script>
<style lang="scss" scoped>
.login {
  width: 350px;
  height: 426px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 6px 5px 12px 0px #999;
  background-color: #fff;
  z-index: 999;
  &-title {
    font-size: 24px;
    margin-top: 62px;
    padding-left: 40px;
    box-sizing: border-box;
    color: #333;
    margin-bottom: 50px;
  }
  &-center {
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  &-input {
    width: 230px;
    height: 30px;
    position: relative;
    input {
      z-index: 2;
      transition: all 0.5s;
      padding-left: 10px;
      color: #333;
      width: 100%;
      height: 30px;
      border: 0;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      outline: none;
      position: relative;
      &:focus {
        border: 1px solid #1e90ff;
        ~ .login-text {
          top: 0;
          z-index: 3;
          opacity: 1 !important;
          margin-top: -15px;
        }
      }
    }
  }
  &-text {
    background: #fff;
    padding: 0 5px;
    position: absolute;
    z-index: 0;
    opacity: 0;
    height: 20px;
    top: 50%;
    margin-top: -10px;
    font-size: 14px;
    left: 5px;
    color: #1e90ff;
    line-height: 20px;
    transition: all 0.5s;
  }
  &-button {
    cursor: pointer;
    width: 270px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 10px;
    color: #fff;
    font-size: 14px;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  .sure {
    background-color: #1e90ff;
    margin-top: 44px;
  }
  .close {
    background-color: #666;
  }
  .iconuser {
    font-size: 25px;
  }
  .iconyouxiang {
    font-size: 23px;
  }
}
.pop-enter-active {
  -webkit-animation: popIn 0.4s;
  animation: popIn 0.4s;
}

.pop-leave-active {
  -webkit-animation: popOut 0.4s;
  animation: popOut 0.4s;
}
</style>
