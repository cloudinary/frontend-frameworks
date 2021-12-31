import {Component, OnInit, Input, ElementRef, EventEmitter, Output, OnChanges, OnDestroy} from '@angular/core';
import {CloudinaryVideo} from '@cloudinary/url-gen';
import {
  cancelCurrentlyRunningPlugins,
  HtmlVideoLayer,
  Plugins,
  VideoSources
} from '@cloudinary/html';


/**
 * @memberOf AngularSDK
 * @type {Component}
 * @description The Cloudinary video component.
 * @prop {CloudinaryVideo} transformation Generated by @cloudinary/url-gen
 * @prop {Plugins} plugins Advanced image component plugins lazyload()
 * @prop videoAttributes Optional attributes include controls, loop, muted, poster, preload, autoplay
 * @prop videoEvents Optional video events include play, loadstart, playing, error, ended
 * @prop {VideoSources} sources Optional sources to generate
 * @example
 *  <caption>
 *  Using custom defined resources.
 * </caption>
 *   vid = new CloudinaryVideo('dog', {cloudName: 'demo'});
 *   sources = [
 {
        type: 'mp4',
        codecs: ['vp8', 'vorbis'],
        transcode: videoCodec(auto())
},
 {
        type: 'webm',
        codecs: ['avc1.4D401E', 'mp4a.40.2'],
         transcode: videoCodec(auto())
      }];
 *
 * <advanced-video [cldvid]="vid" [sources]="sources" controls></advanced-video>
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advanced-video',
  template: `<video (play)="emitPlayEvent()"
                    (loadstart)="emitLoadstartEvent()"
                    (playing)="emitPlayingEvent()"
                    (error)="emitErrorEvent"
                    (ended)="emitEndedEvent">
            </video>`,
})
export class CloudinaryVideoComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private el: ElementRef) { }

  @Input('cldVid') cldVid: CloudinaryVideo;
  @Input('sources') sources: VideoSources;
  @Input('plugins') plugins: Plugins;
  @Input('poster') poster: string;

  // Event emitters
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() loadstart: EventEmitter<any> = new EventEmitter();
  @Output() playing: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() ended: EventEmitter<any> = new EventEmitter();

  // supported video attributes
  controls = this.el.nativeElement.attributes.controls;
  loop = this.el.nativeElement.attributes.loop;
  muted = this.el.nativeElement.attributes.muted;
  preload = this.el.nativeElement.attributes.preload;
  autoPlay = this.el.nativeElement.attributes.autoplay;
  playsInline = this.el.nativeElement.attributes.playsInline;

  private htmlVideoLayerInstance: HtmlVideoLayer;

  /**
   * On init creates a new HTMLVideoLayer instance and initializes with ref to video element,
   * user generated cloudinaryVideo and the plugins to be used.
   */
  ngOnInit() {
    this.htmlVideoLayerInstance = new HtmlVideoLayer(
      this.el.nativeElement.children[0],
      this.cldVid,
      this.sources,
      this.plugins,
      this.getVideoAttributes()
      );
  }

  /**
   * On update, we cancel running plugins and update the video instance if the src
   * was changed.
   */
  ngOnChanges() {
    if (this.htmlVideoLayerInstance) {
      cancelCurrentlyRunningPlugins(this.htmlVideoLayerInstance.htmlPluginState);
      this.htmlVideoLayerInstance.update(this.cldVid, this.sources, this.plugins, this.getVideoAttributes());
    }
  }

  /**
   * On destroy, we cancel the currently running plugins.
   */
  ngOnDestroy() {
    // Safely cancel running events on destroy
    cancelCurrentlyRunningPlugins(this.htmlVideoLayerInstance.htmlPluginState);
  }

  /**
   * Returns video attributes.
   */
  getVideoAttributes() {
    return {
      controls: this.controls,
      loop: this.loop,
      muted: this.muted,
      poster: this.poster,
      preload: this.preload,
      autoplay: this.autoPlay,
      playsinline: this.playsInline
    };
  }

  emitPlayEvent() {
    this.play.emit();
  }

  emitLoadstartEvent() {
    this.loadstart.emit();
  }

  emitPlayingEvent() {
    this.playing.emit();
  }

  emitErrorEvent() {
    this.error.emit();
  }

  emitEndedEvent() {
    this.ended.emit();
  }
}
