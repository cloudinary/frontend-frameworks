<template>
  <div>
    <AdvancedImage
      url="https://res.cloudinary.com/demo/image/upload/sample.jpg"
    />
  </div>
  <div>
    <AdvancedVideo url="https://res.cloudinary.com/demo/video/upload/dog.mp4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdvancedImage from "@/components/AdvancedImage.vue";
import AdvancedVideo from "@/components/AdvancedVideo.vue";

export default defineComponent({
  name: "App",
  components: {
    AdvancedImage,
    AdvancedVideo,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
