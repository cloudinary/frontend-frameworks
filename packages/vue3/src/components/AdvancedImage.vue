<template>
  <img :src="url" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdvancedImage",
  props: {
    url: String,
  },
});
</script>
