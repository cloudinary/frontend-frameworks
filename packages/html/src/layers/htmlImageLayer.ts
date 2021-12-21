import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {Plugins, HtmlPluginState, AnalyticsOptions} from '../types'
import cloneDeep from 'lodash.clonedeep';
import {render} from '../utils/render';

export class HtmlImageLayer{
  private imgElement: any;
  htmlPluginState: HtmlPluginState;
  constructor(element: HTMLImageElement | null, userCloudinaryImage: CloudinaryImage, plugins?: Plugins, analyticsOptions?: AnalyticsOptions){
    this.imgElement = element;
    this.htmlPluginState = {cleanupCallbacks:[], pluginEventSubscription: []};
    const pluginCloudinaryImage  = cloneDeep(userCloudinaryImage);

    render(element, pluginCloudinaryImage, plugins, this.htmlPluginState)
        .then(()=>{ // when resolved updates the src
          this.htmlPluginState.pluginEventSubscription.forEach(fn=>{fn()});
            this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL({
                trackedAnalytics: {
                    sdkCode: analyticsOptions.sdkCode,
                    sdkSemver: analyticsOptions.sdkSemver,
                    techVersion: analyticsOptions.techVersion,
                }
            }));
        });
  }

  /**
   * Called when component is updated and re-triggers render
   * @param userCloudinaryImage
   * @param plugins
   * @param analyticsOptions
   */
  update(userCloudinaryImage: CloudinaryImage, plugins: any, analyticsOptions?: AnalyticsOptions){
    const pluginCloudinaryImage  = cloneDeep(userCloudinaryImage);
    render(this.imgElement, pluginCloudinaryImage, plugins, this.htmlPluginState)
        .then(()=>{
          this.imgElement.setAttribute('src', pluginCloudinaryImage.toURL({
              trackedAnalytics: {
                  sdkCode: analyticsOptions.sdkCode,
                  sdkSemver: analyticsOptions.sdkSemver,
                  techVersion: analyticsOptions.techVersion,
              }
          }));
        });
  }
}
