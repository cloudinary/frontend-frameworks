<script lang="ts">
  // Helper wrapper for responsive tests
  // Svelte testing library does not yet support passing child components
  // so we create the AdvancedImage using cldImg & advancedImgProps props

  import {AdvancedImage} from '../../src/index';
  import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
  import {onMount} from "svelte";

  const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});
  export let width: number = 250; //update container width
  export let cldImg = undefined; //set child element
  export let advancedImgProps = {}; //set child element props
  let parentElement; // ref to wrapper div

  onMount(()=>{
    Object.defineProperty(parentElement, 'clientWidth', {value: 250, configurable: true});
  });
</script>

<div bind:this={parentElement} id="wrapper">
    {#if cldImg}
        <AdvancedImage cldImg={cldImg} {...advancedImgProps} />
    {:else}
        <slot />
    {/if}
</div>