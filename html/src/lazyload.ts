import {isBrowser} from "./isBrowser";
import TransformableImage from "@cloudinary/base/transformation/TransformableImage";

export function lazyload(element: any, transformableImage: TransformableImage, toBeCanceled: any) {
  if(!isBrowser()){
    return false;
  }
  return new Promise((resolve) => {
    toBeCanceled.push(()=>{
      resolve('canceled');
      clearTimeout(timeout); //signifies clearing events
    });

    const timeout = setTimeout(() => {
      console.log('lazy load done');
      resolve();
    }, 5000); // arbitrary time
  });
}
