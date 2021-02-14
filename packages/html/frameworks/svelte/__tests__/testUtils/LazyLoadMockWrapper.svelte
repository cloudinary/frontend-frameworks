<script lang="ts">
  // Helper wrapper for lazy load tests

  import {AdvancedImage, lazyload} from '../../src/index';
  import {CloudinaryImage} from '@cloudinary/base/assets/CloudinaryImage';

  const cloudinaryImage = new CloudinaryImage('sample', {cloudName: 'demo'});
</script>

<div style="height: 1000px"></div>
<AdvancedImage cldImg={cloudinaryImage} plugins={[lazyload()]}/>
