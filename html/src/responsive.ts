// import * as Resize from '@cloudinary/base/actions/resize/Resize';
import {isBrowser} from "./isBrowser";
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export function responsive(element: any, transformableImage: CloudinaryImage, toBeCanceled: any): Promise<void | string> | string {
  if(!isBrowser()){
    return;
  }
  return new Promise((resolve)=>{
    const size = element.parentElement.clientWidth;
    // transformableImage.resize(Resize.scale(size))
    console.log('responsive done');
    resolve();
  })
}
