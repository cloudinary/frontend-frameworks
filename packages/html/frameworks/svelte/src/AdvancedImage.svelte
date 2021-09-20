<script lang="ts">
  import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
  import { afterUpdate, onDestroy } from 'svelte';
  import { HtmlImageLayer, isBrowser, serverSideSrc , cancelCurrentlyRunningPlugins} from '@cloudinary/html';
  import { Plugins } from '@cloudinary/html';

  /**
   * @mixin SvelteSDK
   * @description The Cloudinary Svelte SDK contains components like <AdvancedImage> to easily render your media assets from Cloudinary.
   * The SDK also comes with support for optional js plugins that make the components smart, with features like lazy loading, placeholder, accessibility & responsiveness
   *
   * @example
   * <caption>
   *  Please note that the order of the plugins is important. See home for more details.
   * </caption>
   * // Example
   *
   * <script>
   *
   * import {CloudinaryImage} from '@cloudinary/url-gen';
   * import { AdvancedImage, accessibility, responsive, lazyload, placeholder } from '@cloudinary/svelte';
   *
   * const img = new CloudinaryImage('sample', {cloudName: 'demo'});
   *
   * // Close script tag
   * </scr\ipt>
   *
   * <AdvancedImage cldImg={img} plugins={[lazyload(),responsive(), accessibility(), placeholder()]}/>
   *
   */

  // Props passed by user
  export let cldImg: CloudinaryImage; // Required prop
  export let plugins: Plugins = []; // Optional prop

  // Internal variables used by this component
  let imgElement: HTMLImageElement; // Reference to underlying <img> element
  let htmlLayerInstance: HtmlImageLayer; // Updates dom using given cldImg & plugins

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
        htmlLayerInstance = new HtmlImageLayer(imgElement, cldImg, plugins);
      }
    } else {
      cancelCurrentlyRunningPlugins(htmlLayerInstance.htmlPluginState);
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
      cancelCurrentlyRunningPlugins(htmlLayerInstance.htmlPluginState);
    }
  });
</script>

{#if isBrowser()}
    <!-- svelte-ignore a11y-no-img- -->
    <img use:bindImage {...$$restProps}/>
{:else}
    <img src={serverSideSrc(plugins, cldImg)} {...$$restProps}/>
{/if}
