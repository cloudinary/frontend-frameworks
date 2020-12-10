// import * as Effect from '@cloudinary/base/actions/effect/Effect';
import {isBrowser} from "./isBrowser";
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export function accessibility(element: HTMLImageElement, cloudinaryImage: CloudinaryImage, toBeCanceled: Array<any>): Promise<void | string> | string {
  if(isBrowser()){
    return new Promise((resolve) => {
      toBeCanceled.push(()=>{
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
