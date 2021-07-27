<template>
  <b-header></b-header>
  <router-view></router-view>
  <Particles id="tsparticles" :options="options" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import bHeader from "@/components/header.vue";
import Options from "@/utils/particles.js";
export default defineComponent({
  name: "App",
  components: {
    bHeader
  },
  setup() {
    const options = ref(Options);
    return {
      options
    };
  }
});
</script>
<style lang="scss" scoped>
#tsparticles {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
