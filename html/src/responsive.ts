import * as Resize from '@cloudinary/base/actions/resize/Resize';
import {isBrowser} from "./isBrowser";
import TransformableImage from "@cloudinary/base/transformation/TransformableImage";

export function responsive(element: any, transformableImage: TransformableImage, toBeCanceled: any){
  if(!isBrowser()){
    return;
  }
  return new Promise((resolve)=>{
    const size = element.parentElement.clientWidth;
    transformableImage.resize(Resize.scale(size))
    console.log('responsive done');
    resolve();
  })
}
