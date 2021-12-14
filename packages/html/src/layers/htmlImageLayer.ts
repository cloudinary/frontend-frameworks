import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugins, HtmlPluginState} from '../types'
import cloneDeep from 'lodash.cloneDeep'
import {render} from '../utils/render';

export class HtmlImageLayer{
  private imgElement: any;
  htmlPluginState: HtmlPluginState;
  constructor(element: HTMLImageElement | null, userCloudinaryImage: CloudinaryImage, plugins?: Plugins){
    this.imgElement = element;
    this.htmlPluginState = {cleanupCallbacks:[], pluginEventSubscription: []};
    const pluginCloudinaryImage  = cloneDeep(userCloudinaryImage);

    render(element, pluginCloudinaryImage, plugins, this.htmlPluginState)
        .then(()=>{ // when resolved updates the src
          this.htmlPluginState.pluginEventSubscription.forEach(fn=>{fn()});
          this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL());
        });
  }

  /**
   * Called when component is updated and re-triggers render
   * @param userCloudinaryImage
   * @param plugins
   */
  update(userCloudinaryImage: CloudinaryImage, plugins: any){
    const pluginCloudinaryImage  = cloneDeep(userCloudinaryImage);
    render(this.imgElement, pluginCloudinaryImage, plugins, this.htmlPluginState)
        .then(()=>{
          this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL());
        });
  }
}
