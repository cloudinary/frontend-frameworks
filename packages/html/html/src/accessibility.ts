import * as Effect from '@cloudinary/base/actions/effect/Effect';
import {isBrowser} from "./isBrowser";
import TransformableImage from "@cloudinary/base/transformation/TransformableImage";

export function accessibility(element: any, transformableImage: TransformableImage, toBeCanceled: any): Promise<void | string> | string {
  if(isBrowser()){
    return new Promise((resolve) => {
      toBeCanceled.push(()=>{
        resolve('canceled');
      });
      transformableImage.effect(Effect.grayscale());
      console.log('accessibility done');
      resolve();
    });
  }else {
    transformableImage.effect(Effect.grayscale());
  }

}
