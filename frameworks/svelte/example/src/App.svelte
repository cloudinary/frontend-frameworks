<script lang="ts">
  import {AdvancedImage, responsive, lazyload, placeholder, accessibility} from '@cloudinary/svelte';
  import {CloudinaryImage} from "@cloudinary/base";

  export let text: string;

  const img = new CloudinaryImage('sample', {cloudName: 'demo'});
</script>

<main>
    <div class="title-container">
        <h1 class="title">Cloudinary Svelte Example</h1>
        <p class="text">{text}</p>
        <p class="text">&#8595;</p>
    </div>
    <div>
        <AdvancedImage class="image" cldImg={img} plugins={[lazyload(),responsive(), accessibility(), placeholder()]}/>
    </div>
</main>

<style>
    .title-container {
        text-align: center;
        padding: 1em;
        max-width: 440px;
        margin: 0 auto;
        height: 2000px;
    }

    .title {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    .text {
        color: darkslateblue;
        font-size: 2em;
    }

    :global(.image) {
        width: 100%;
    }
</style>