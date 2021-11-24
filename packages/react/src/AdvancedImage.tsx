import React from 'react';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';

import {
  HtmlImageLayer,
  Plugins,
  isBrowser,
  serverSideSrc,
  cancelCurrentlyRunningPlugins
} from '@cloudinary/html'

interface ImgProps {
  cldImg: CloudinaryImage,
  plugins?: Plugins,
  [x: string]: any
}

/**
 * @mixin ReactSDK
 * @description The Cloudinary React SDK contains components like <AdvancedImage> to easily render your media assets from Cloudinary.
 * The SDK also comes with support for optional js plugins that make the components smart, with features like lazy loading, placeholder, accessibility & responsiveness
 *
 * @example
 * <caption>
 *  Please note that the order of the plugins is important. See home for more details.
 * </caption>
 * // Example
 * import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
 * import {
 *  AdvancedImage,
 *  accessibility,
 *  responsive,
 *  lazyload,
 *  placeholder
 * } from '@cloudinary/react';
 *
 * const App = () => {
 *
 * const myCld = new Cloudinary({ cloudName: 'demo'});
 * let img = myCld().image('sample');
 *
 *   return (
 *      <div>
 *         <div style={{height: "1000px"}}/>
 *         <AdvancedImage
 *            cldImg={img}
 *            plugins={[lazyload(), responsive(100), placeholder()]}
 *         />
 *      </div>
 *   )
 * };
 *
 *
 *
 *
 *
 */

/**
 * @memberOf ReactSDK
 * @type {Component}
 * @description The Cloudinary image component
 * @prop {CloudinaryImage} cldImg Generated by @cloudinary/url-gen
 * @prop {Plugins} plugins Advanced image component plugins accessibility(), responsive(), lazyload(), placeholder()
 */
class AdvancedImage extends React.Component <ImgProps> {
  imageRef: React.RefObject<HTMLImageElement>;
  htmlLayerInstance: HtmlImageLayer;

  constructor(props: ImgProps) {
    super(props);
    this.imageRef = React.createRef();
  }

  /**
   * On mount creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated cloudinaryImage and the plugins to be used
   */
  componentDidMount() {
    this.htmlLayerInstance = new HtmlImageLayer(
      this.imageRef.current,
      this.props.cldImg,
      this.props.plugins
    )
  }

  /**
   * On update we cancel running plugins and update image instance with the state of user
   * cloudinaryImage and the state of plugins
   */
  componentDidUpdate() {
    cancelCurrentlyRunningPlugins(this.htmlLayerInstance.htmlPluginState);
    // call html layer to update the dom again with plugins and reset toBeCanceled
    this.htmlLayerInstance.update(this.props.cldImg, this.props.plugins)
  }

  /**
   * On unmount we cancel the currently running plugins
   */
  componentWillUnmount() {
    // safely cancel running events on unmount
    cancelCurrentlyRunningPlugins(this.htmlLayerInstance.htmlPluginState);
  }

  render() {
    const {
      cldImg,
      plugins,
      ...otherProps // Assume any other props are for the base element
    } = this.props;
    if (isBrowser()) { // on client side render
      return <img suppressHydrationWarning {...otherProps} ref={this.imageRef} />
    } else { // on server side render
      const src = serverSideSrc(
        this.props.plugins,
        this.props.cldImg
      );
      return <img {...otherProps} src={src} />
    }
  }
}

export { AdvancedImage };