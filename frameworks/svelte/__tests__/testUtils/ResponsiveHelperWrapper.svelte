<script lang="ts">
  // Helper wrapper for responsive tests

  import {AdvancedImage} from '../../src/index';
  import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
  import {onMount} from "svelte";

  const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});
  export let width: number = 250; //update container width
  export let cldImg = undefined; //set child elements
  export let advancedImgProps = {}; //set child element props
  let div;

  $: style = `width: ${width};`;

  onMount(()=>{
    Object.defineProperty(div, 'clientWidth', {value: 250, configurable: true});
  });
</script>

<div bind:this={div} id="wrapper">
    {#if cldImg}
        <AdvancedImage cldImg={cldImg} {...advancedImgProps} />
    {:else}
        <slot />
    {/if}
</div>