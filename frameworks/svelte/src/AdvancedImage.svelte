<script lang="ts">
  import type {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';
  import {afterUpdate, onDestroy} from 'svelte';
  import {HtmlLayer, isBrowser, serverSideSrc} from '@cloudinary/html';
  import type { plugins as Plugins } from '@cloudinary/html';

  // Props passed by user
  export let cldImg: CloudinaryImage; // Required prop
  export let plugins: Plugins = []; // Optional prop

  // Internal variables used by this component
  let imgElement: HTMLImageElement; // Reference to underlying <img> element
  let htmlLayerInstance: HtmlLayer; // Updates dom using given cldImg & plugins

  /**
   * Bind imgElement to the underlying <img> element.
   * @param node - the underlying <img> element's node.
   */
  const bindImage = (node) => (imgElement = node);

  /**
   * On mount: Create a new HTMLLayer instance
   * On props change: Cancel running plugins and update image instance
   */
  afterUpdate(() => {
    if (!htmlLayerInstance) {
      if (imgElement) {
        htmlLayerInstance = new HtmlLayer(imgElement, cldImg, plugins);
      }
    } else {
      htmlLayerInstance.cancelCurrentlyRunningPlugins();
      htmlLayerInstance.update(cldImg, plugins);
    }
  });

  /**
   * On unmount we cancel the currently running plugins
   * This is the only lifecycle method that runs on the server,
   * so we must check for existence of htmlLayerInstance
   */
  onDestroy(() => {
    if (htmlLayerInstance) {
      htmlLayerInstance.cancelCurrentlyRunningPlugins();
    }
  });
</script>

{#if isBrowser()}
    <!-- svelte-ignore a11y-no-img- -->
    <img use:bindImage {...$$restProps}/>
{:else}
    <img src={serverSideSrc(plugins, cldImg)} {...$$restProps}/>
{/if}