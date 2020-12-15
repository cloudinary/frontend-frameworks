import React from 'react';
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

import {
  HtmlLayer,
  plugins
} from '../../html/dist'

interface ImgProps {
  transformation: CloudinaryImage,
  plugins?:  plugins,
  [x: string]: any
}

export class CldImg extends React.Component <ImgProps> {
  imageRef: React.RefObject<HTMLImageElement>;
  htmlLayerInstance: HtmlLayer;

  constructor(props: ImgProps) {
    super(props);
    this.imageRef = React.createRef();
  }

  /**
   * On mount creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated cloudinaryImage and the plugins to be used
   */
  componentDidMount() {
    this.htmlLayerInstance = new HtmlLayer(
      this.imageRef.current,
      this.props.transformation,
      this.props.plugins,
    )
  }

  /**
   * On update we cancel running plugins and update image instance with the state of user
   * cloudinaryImage and the state of plugins
   */
  componentDidUpdate() {
    this.htmlLayerInstance.cancelCurrentlyRunningPlugins();
    // call html layer to update the dom again with plugins and reset toBeCanceled
    this.htmlLayerInstance.update(this.props.transformation, this.props.plugins)
  }

  /**
   * On unmount we cancel the currently running plugins
   */
  componentWillUnmount() {
    // safely cancel running events on unmount
    this.htmlLayerInstance.cancelCurrentlyRunningPlugins()
  }

  render() {
    const {
      transformation,
      plugins,
      ...otherProps // Assume any other props are for the base element
    } = this.props;
    return <img {...otherProps} ref={this.imageRef} />
  }
}
