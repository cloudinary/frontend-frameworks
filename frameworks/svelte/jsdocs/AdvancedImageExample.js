/*
 * @example
 * <caption>
 *  Please note that the order of the plugins is important. See home for more details.
 * </caption>
 * // Example
 *
 * <script>
 *
 * import {CloudinaryImage} from '@cloudinary/base';
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
