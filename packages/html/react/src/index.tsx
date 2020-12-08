import * as React from 'react'
import {
  HtmlLayer,
  placeholder,
  accessibility,
  lazyload,
  responsive,
  cancelCurrentlyRunningPlugins,
  isBrowser,
  serverSideSrc
} from '../../html/dist'

export class CldImg extends React.Component {
  private myRef: React.RefObject<unknown>;
  private canceled: any[];
  private imageInstance: HtmlLayer;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      transformation: props.transformation,
      plugins: props.plugins
    }
  }

  /**
   * On mount creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated transformableImg, the plugins to be used, and an empty array to hold state
   * of cancelled plugins
   */
  componentDidMount() {
    this.canceled = []; // holds 'canceled' resolves
    this.imageInstance = new HtmlLayer(
      this.myRef.current,
      // @ts-ignore
      this.state.transformation,
      // @ts-ignore
      this.state.plugins,
      this.canceled
    )
  }

  /**
   * On update we cancel running plugins and update image instance with the state of user
   * transformableImg, the state of plugins, and we reset the state of the canceled plugins
   */
  componentDidUpdate() {
    cancelCurrentlyRunningPlugins(this.canceled);
    // call render again with plugins and reset toBeCanceled
    // @ts-ignore
    this.imageInstance.update(this.state.transformation, this.state.plugins, [])
  }

  /**
   * On unmount we cancel the currently running plugins
   */
  componentWillUnmount() {
    // safely cancel running events on unmount
    cancelCurrentlyRunningPlugins(this.canceled)
  }

  render() {
    if (isBrowser()) {
      console.log('client');
      // @ts-ignore
      return <img suppressHydrationWarning {...this.props} ref={this.myRef} />
    } else {
      console.log('server');
      const src = serverSideSrc(
        '', // src
        // @ts-ignore
        this.state.plugins,
        // @ts-ignore
        this.props.transformation
      );
      return <img {...this.props} src={src} />
    }
  }
}

export {placeholder, accessibility, lazyload, responsive};

