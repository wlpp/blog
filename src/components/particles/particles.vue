<template>
  <div id="particles"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import particles from 'particles.js'
export default defineComponent({
  setup() {
    onMounted(() => {
      particlesJS.load("particles", "./particles.json", function () {
        console.log("callback - particles.js config loaded");
      });
    });
  }
});
</script>

<style scoped>
#particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #b61924;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
