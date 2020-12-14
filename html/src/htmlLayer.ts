import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export type plugins = ((element: HTMLImageElement, cloudinaryImage: CloudinaryImage, runningPlugins: Function[]) => string | Promise<string | void>)[];

export class HtmlLayer{
  private img: any;
  runningPlugins: [];
  constructor(element: HTMLImageElement | null, cloudinaryImage: CloudinaryImage, plugins?: plugins){
    this.img = element;
    this.runningPlugins = []; // holds running plugins
    this.render(element, cloudinaryImage, plugins)
        .then(()=>{ // when resolved updates the src
          this.removeAttributes();
          this.img.setAttribute('src', cloudinaryImage.toURL());
          //console.log('here', cloudinaryImage.toURL());
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
    this.render(this.img, cloudinaryImage, plugins)
        .then(()=>{
          this.img.setAttribute('src', cloudinaryImage.toURL());
        });
  }

  /**
   * Removes non HTML attributes
   */
  removeAttributes(){
    this.img.removeAttribute('transformation');
    this.img.removeAttribute('plugins');
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
