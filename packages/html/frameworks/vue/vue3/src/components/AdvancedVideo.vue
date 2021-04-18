<template>
  <video src="https://res.cloudinary.com/demo/video/upload/sample"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdvancedVideo',
  props: {
    cldVideo: Object,
  },
});
</script>
