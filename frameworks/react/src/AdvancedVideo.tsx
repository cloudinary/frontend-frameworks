import React, { EventHandler, SyntheticEvent } from 'react';
import { CloudinaryVideo } from '@cloudinary/base';

import {
  HtmlVideoLayer,
  Plugins,
  VideoSources,
  cancelCurrentlyRunningPlugins
} from '@cloudinary/html';

type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;

interface VideoProps {
  cldvid: CloudinaryVideo,
  plugins?: Plugins,
  sources?: VideoSources,

  // supported video attributes
  controls?: boolean
  loop?: boolean,
  muted?: boolean,
  poster?: string,
  preload?: string,
  autoplay?: boolean,
  playsinline?: boolean

  // supported video events
  onPlay?: ReactEventHandler<any>,
  onLoadStart?: ReactEventHandler<any>,
  onPlaying?: ReactEventHandler<any>,
  onError?: ReactEventHandler<any>,
  onEnded?: ReactEventHandler<any>
}

class AdvancedVideo extends React.Component <VideoProps> {
  videoRef: React.RefObject<HTMLVideoElement>;
  htmlVideoLayerInstance: HtmlVideoLayer;
  private videoAttributes: object;

  constructor(props: VideoProps) {
    super(props);
    this.videoRef = React.createRef();
  }

  /**
   * On mount creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated cloudinaryImage and the plugins to be used
   */
  componentDidMount() {
    this.videoAttributes = {
      controls: this.props.controls,
      loop: this.props.loop,
      muted: this.props.muted,
      poster: this.props.poster,
      preload: this.props.preload,
      autoplay: this.props.autoplay,
      playsinline: this.props.playsinline
    };

    this.htmlVideoLayerInstance = new HtmlVideoLayer(
      this.videoRef.current,
      this.props.cldvid,
      this.props.sources,
      this.props.plugins,
      this.videoAttributes
    )
  }

  /**
   * On update we cancel running plugins and update image instance with the state of user
   * cloudinaryImage and the state of plugins
   */
  componentDidUpdate() {
    cancelCurrentlyRunningPlugins(this.htmlVideoLayerInstance.htmlPluginState);
    // call html layer to update the dom again with plugins and reset toBeCanceled
    this.htmlVideoLayerInstance.update(this.props.cldvid, this.props.sources, this.props.plugins, this.videoAttributes)
  }

  /**
   * On unmount we cancel the currently running plugins
   */
  componentWillUnmount() {
    // safely cancel running events on unmount
    cancelCurrentlyRunningPlugins(this.htmlVideoLayerInstance.htmlPluginState)
  }

  render() {
    const {
      cldvid,
      plugins,
      sources,
      ...otherProps // Assume any other props are for the base element
    } = this.props;
    return <video {...otherProps} ref={this.videoRef} />
  }
}

export { AdvancedVideo };
