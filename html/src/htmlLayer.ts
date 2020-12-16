import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {plugins} from './types'
import cloneDeep from 'lodash/cloneDeep'

export class HtmlLayer{
  private img: any;
  runningPlugins: [];
  constructor(element: HTMLImageElement | null, cloudinaryImage: CloudinaryImage, plugins?: plugins){
    this.img = element;
    this.runningPlugins = []; // holds running plugins
    const clone  = cloneDeep(cloudinaryImage);
    this.render(element, clone, plugins)
        .then(()=>{ // when resolved updates the src
          this.img.setAttribute('src', clone.toURL());
        });
  }

  /**
   * Iterate through plugins and break in cases where the response is canceled. The
   * response is canceled if component is updated or unmounted
   * @param element Image element
   * @param cloudinaryImage
   * @param plugins array of plugins passed in by the user
   * @return {Promise<void>}
   */
  async render(element: HTMLImageElement, cloudinaryImage: CloudinaryImage, plugins: any) {
    if(plugins === undefined) return;
    for(let i = 0; i < plugins.length; i++){
      const response = await plugins[i](element, cloudinaryImage, this.runningPlugins);
      if(response === 'canceled'){
        break;
      }
    }
  }

  /**
   * Called when component is updated and re-triggers render
   * @param cloudinaryImage
   * @param plugins
   */
  update(cloudinaryImage: CloudinaryImage, plugins: any){
    const clone  = cloneDeep(cloudinaryImage);
    this.render(this.img, clone, plugins)
        .then(()=>{
          this.img.setAttribute('src', clone.toURL());
        });
  }

  /**
   * Cancels currently running plugins. This is called from unmount or update
   */
  cancelCurrentlyRunningPlugins(): void{
    this.runningPlugins.forEach((fn: any) => {
      fn();// resolve each promise with 'canceled'
    })
  }
}
