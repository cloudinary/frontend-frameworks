import * as Effect from '@cloudinary/base/actions/effect/Effect';
import cloneDeep from 'lodash/cloneDeep'
import {isBrowser} from "./isBrowser";
import TransformableImage from "@cloudinary/base/transformation/TransformableImage";

export function placeholder(element: any, transformableImage: TransformableImage, toBeCanceled: any) {
  if(isBrowser()){
    const clonedObject = cloneDeep(transformableImage);
    const plObject = clonedObject.effect(Effect.pixelate(50));
    element.src = plObject.toURL();
    console.log('placeholder loaded');

    return new Promise((resolve: any) => {
      toBeCanceled.push(()=>{
        resolve('canceled');
        clearTimeout(timeout); //signifies clearing events
      });

      const timeout = setTimeout(() => {
        console.log('img loaded');
        resolve();
      }, 5000); // arbitrary time
    });
  }else{
    transformableImage.effect(Effect.pixelate(50));
  }
}
