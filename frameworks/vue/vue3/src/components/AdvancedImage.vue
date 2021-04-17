<template>
  <img src="https://res.cloudinary.com/demo/image/upload/sample" alt="">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdvancedImage',
  props: {
    cldImage: Object,
  },
});
</script>
