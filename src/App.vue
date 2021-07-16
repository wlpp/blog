<template>
  <b-header></b-header>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import bHeader from "@/components/header.vue";
export default defineComponent({
  name: "App",
  components: {
    bHeader
  },
  setup() {
    onMounted(() => {});
  }
});
</script>

<style>

</style>
