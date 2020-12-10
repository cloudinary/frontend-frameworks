import React from 'react';
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

import {
  HtmlLayer,
  plugins
} from '../../html/dist'

interface ImgProps {
  transformation: CloudinaryImage,
  plugins?:  plugins
}

export class CldImg extends React.Component <ImgProps> {
  myRef: React.RefObject<HTMLImageElement>;
  imageInstance: HtmlLayer;

  constructor(props: ImgProps) {
    super(props);
    this.myRef = React.createRef();
  }

  /**
   * On mount creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated transformableImg and the plugins to be used
   */
  componentDidMount() {
    this.imageInstance = new HtmlLayer(
      this.myRef.current,
      this.props.transformation,
      this.props.plugins,
    )
  }

  /**
   * On update we cancel running plugins and update image instance with the state of user
   * transformableImg and the state of plugins
   */
  componentDidUpdate() {
    this.imageInstance.cancelCurrentlyRunningPlugins();
    // call render again with plugins and reset toBeCanceled
    this.imageInstance.update(this.props.transformation, this.props.plugins)
  }

  /**
   * On unmount we cancel the currently running plugins
   */
  componentWillUnmount() {
    // safely cancel running events on unmount
    this.imageInstance.cancelCurrentlyRunningPlugins()
  }

  render() {
    return <img {...this.props} ref={this.myRef} />
  }
}
