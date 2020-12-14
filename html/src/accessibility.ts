// import * as Effect from '@cloudinary/base/actions/effect/Effect';
import {isBrowser} from "./isBrowser";
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export function accessibility(element: HTMLImageElement, cloudinaryImage: CloudinaryImage, runningPlugins: Function[]): Promise<void | string> | string {
  if(isBrowser()){
    return new Promise((resolve) => {
      runningPlugins.push(()=>{
        resolve('canceled');
      });
      //transformableImage.effect(Effect.grayscale());
      console.log('accessibility done');
      resolve();
    });
  }else {
    //transformableImage.effect(Effect.grayscale());
  }

}
