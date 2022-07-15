<template>
  <video :src="url" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdvancedVideo",
  props: {
    url: String,
  },
});
</script>
