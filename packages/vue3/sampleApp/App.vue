<template>
  <div>
    <AdvancedImage :cldImg="cldImg" :plugins="plugins" />
  </div>
  <div>
    <AdvancedVideo url="https://res.cloudinary.com/demo/video/upload/dog.mp4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  AdvancedImage,
  AdvancedVideo,
  accessibility,
  responsive,
  lazyload,
  placeholder,
} from "../src";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";

export default defineComponent({
  name: "App",
  components: {
    AdvancedImage,
    AdvancedVideo,
  },
  setup(props) {
    const cldImg = new CloudinaryImage(
      "sample",
      { cloudName: "demo" },
      { analytics: false }
    );

    const plugins = [responsive({ steps: 100 })];

    return {
      cldImg,
      plugins,
    };
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
