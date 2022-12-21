<template>
  <div>
    <h1>AdvancedImage</h1>
    <AdvancedImage :cldImg="cldImg" :plugins="plugins" />
    <h1>AdvancedVideo</h1>
    <AdvancedVideo :cldVid="cldVid" controls loop width="600" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AdvancedImage, AdvancedVideo, responsive } from "../dist";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { CloudinaryVideo } from "@cloudinary/url-gen/assets/CloudinaryVideo";

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

    const cldVid = new CloudinaryVideo(
      "docs/walking_talking",
      { cloudName: "demo" },
      { analytics: false }
    );

    const plugins = [responsive({ steps: 100 })];

    return {
      cldImg,
      cldVid,
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
