/**
 * Calculates the SSR src based on plugins
 * @param src
 * @param plugins
 * @param transformableImage
 * @return {string} return the src
 */
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export  function serverSideSrc(src: string, plugins: any, transformableImage: CloudinaryImage): Promise<void | string> | string {
  for(let i = 0; i < plugins.length; i++){
    const response = plugins[i](src, transformableImage);
    if(!response){ //lazyload
      break;
    }
  }
  return transformableImage.toURL();
}
