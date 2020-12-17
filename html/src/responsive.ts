import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugin} from "./types";
import {scale} from "@cloudinary/base/actions/resize";
import debounce from 'lodash.debounce';

/**
 * Returns the responsive plugin
 */
export function responsive(steps?: number | number[]): plugin{
  return responsivePlugin.bind(null, steps);
}

function responsivePlugin(steps?: number | number[], element?:HTMLImageElement, cloudinaryImage?: CloudinaryImage, runningPlugins?: Function[]): Promise<void | string> | string {
  return new Promise((resolve)=>{
    runningPlugins.push(()=>{
      //window.removeEventListener('resize', resizeEvent);
      resolve('canceled');
    });
    const containerSize = element.parentElement.clientWidth;
    //cloudinaryImage.resize(scale().width(containerSize).setActionTag('responsive'));

    cloudinaryImage.resize(scale().width(containerSize));


    window.addEventListener('resize', debounce(()=>{
      let resizeValue = element.parentElement.clientWidth;

      if(typeof steps === 'number'){
        resizeValue = Math.ceil(resizeValue/steps)*steps;
      }

      if(typeof steps === 'object'){

      }

      element.src = cloudinaryImage.resize(scale().width(resizeValue)).toURL();

    }, 100));

    resolve();
  });
}



/*
  step 100px

    60 then round 100
    150 round 200
 */
