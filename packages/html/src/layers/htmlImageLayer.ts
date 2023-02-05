import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugins, HtmlPluginState, BaseAnalyticsOptions} from '../types'
import cloneDeep from 'lodash.clonedeep';
import {render} from '../utils/render';
import {getAnalyticsOptions} from "../utils/analytics";

export class HtmlImageLayer{
  private imgElement: any;
  htmlPluginState: HtmlPluginState;
  constructor(element: HTMLImageElement | null, userCloudinaryImage: CloudinaryImage, plugins?: Plugins, baseAnalyticsOptions?: BaseAnalyticsOptions){
    this.imgElement = element;
    this.htmlPluginState = {cleanupCallbacks:[], pluginEventSubscription: []};
    const pluginCloudinaryImage  = cloneDeep(userCloudinaryImage);

    render(element, pluginCloudinaryImage, plugins, this.htmlPluginState, baseAnalyticsOptions)
        .then((pluginResponse)=>{ // when resolved updates the src
          this.htmlPluginState.pluginEventSubscription.forEach(fn=>{fn()});
          const analyticsOptions = getAnalyticsOptions(baseAnalyticsOptions, pluginResponse);
          this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL(analyticsOptions));
        });
  }

  /**
   * Called when component is updated and re-triggers render
   * @param userCloudinaryImage
   * @param plugins
   * @param baseAnalyticsOptions
   */
  update(userCloudinaryImage: CloudinaryImage, plugins: any, baseAnalyticsOptions?: BaseAnalyticsOptions){
    const pluginCloudinaryImage  = cloneDeep(userCloudinaryImage);
    render(this.imgElement, pluginCloudinaryImage, plugins, this.htmlPluginState)
        .then((pluginResponse)=>{
            const featuredAnalyticsOptions = getAnalyticsOptions(baseAnalyticsOptions, pluginResponse);
            this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL(featuredAnalyticsOptions));
        });
  }
}
