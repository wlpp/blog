import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
      keepAlive: true
    },
    component: () => import("@/views/Home/index.vue")
  },
  {
    path: "/article/:id",
    name: "Article",
    meta: {
      title: "文章"
    },
    component: () => import("@/views/Article/index.vue")
  },
  {
    path: "/books",
    name: "Books",
    meta: {
      title: "markdown"
    },
    component: () => import("@/views/books/index.vue")
  },
  {
    path: "/mine",
    name: "Mine",
    meta: {
      title: "markdown"
    },
    component: () => import("@/views/mine/index.vue")
  },
  {
    path: "/write",
    name: "Write",
    meta: {
      title: "markdown"
    },
    component: () => import("@/views/Write/index.vue")
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
