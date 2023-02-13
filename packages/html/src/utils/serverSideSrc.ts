/**
 * Calculates the SSR src based on plugins
 * @param plugins The plugins array of plugins passed in by the user
 * @param serverCloudinaryImage {CloudinaryImage}
 * @return {string} return the src
 */
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import cloneDeep from 'lodash.clonedeep'
import {BaseAnalyticsOptions, Plugins} from "../types";

export  function serverSideSrc(plugins?: Plugins, serverCloudinaryImage?: CloudinaryImage, analyticsOptions?: BaseAnalyticsOptions): string {
  const clonedServerCloudinaryImage  = cloneDeep(serverCloudinaryImage);
  if(plugins){
    for(let i = 0; i < plugins.length; i++){
      const response = plugins[i](null, clonedServerCloudinaryImage);
      if(!response){ //lazyload
        break;
      }
    }
  }
  return clonedServerCloudinaryImage.toURL(analyticsOptions ? {trackedAnalytics: analyticsOptions} : null);
}
