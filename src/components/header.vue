<template>
  <div class="header">
    <div class="header_auto">
      <div class="header_nav">
        <router-link :to="'/'" active-class="active">主页</router-link>
        <router-link :to="'/books'" active-class="active">书单</router-link>
        <router-link :to="'/'">行博</router-link>
        <router-link :to="'/mine'" active-class="active">关于</router-link>
        <!-- <li class="active" :class="" @click="toLink('/')">主页</li>
        <li @click="toLink('/books')">书单</li>
        <li>行博</li>
        <li>简介</li> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const toLink = (link: string) => {
      router.push(link);
    };
    return {
      toLink
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/css/mixins.scss";
.header {
  position: relative;
  height: 80px;
  margin-bottom: 15px;
  background: url("../assets/images/h_bg.png") top / cover no-repeat;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 2px 5px 0 #e9e9e9;
  box-sizing: border-box;
  z-index: 10;
  &_auto {
    width: 1000px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 auto;
  }

  &_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    a {
      margin: 0 15px;
      color: #999;
      padding: 10px 5px;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        color: $color;
      }
      &.active {
        color: $color;
      }
    }
  }
}
</style>
