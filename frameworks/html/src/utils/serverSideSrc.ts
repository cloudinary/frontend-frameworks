/**
 * Calculates the SSR src based on plugins
 * @param src {string}
 * @param plugins The plugins array of plugins passed in by the user
 * @param serverCloudinaryImage {CloudinaryImage}
 * @return {string} return the src
 */
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import cloneDeep from 'lodash/cloneDeep'

export  function serverSideSrc(src: string, plugins: any, serverCloudinaryImage: CloudinaryImage): string {
  const clonedServerCloudinaryImage  = cloneDeep(serverCloudinaryImage);
  if(plugins){
    for(let i = 0; i < plugins.length; i++){
      const response = plugins[i](src, clonedServerCloudinaryImage);
      if(!response){ //lazyload
        break;
      }
    }
  }
  return clonedServerCloudinaryImage.toURL();
}
