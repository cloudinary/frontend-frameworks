import {isBrowser} from "./isBrowser";
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export function lazyload(element: any, transformableImage: CloudinaryImage, toBeCanceled: any): Promise<void | string> | string | boolean {
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
