/**
 * Calculates the SSR src based on plugins
 * @param src
 * @param plugins
 * @param transformableImage
 * @return {string} return the src
 */
import TransformableImage from "@cloudinary/base/transformation/TransformableImage";

export  function serverSideSrc(src: string, plugins: any, transformableImage: TransformableImage): Promise<void | string> | string {
  for(let i = 0; i < plugins.length; i++){
    const response = plugins[i](src, transformableImage);
    if(!response){ //lazyload
      break;
    }
  }
  return transformableImage.toURL();
}
