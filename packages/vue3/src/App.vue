<template>
  <div>
    <AdvancedImage :cldImg="img" :plugins="[responsive(100)]" />
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
} from "./index";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";

export default defineComponent({
  name: "App",
  components: {
    AdvancedImage,
    AdvancedVideo,
  },
  setup(props) {
    const img = new CloudinaryImage("sample", { cloudName: "demo" });

    return {
      img,
      responsive,
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
