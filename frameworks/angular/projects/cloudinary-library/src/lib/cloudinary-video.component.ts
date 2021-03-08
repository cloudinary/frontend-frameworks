import {Component, OnInit, Input, ElementRef, EventEmitter, Output, OnChanges} from '@angular/core';
import {CloudinaryVideo} from '@cloudinary/base';
import {
  cancelCurrentlyRunningPlugins,
  HtmlVideoLayer,
  plugins,
  videoSources
} from '@cloudinary/html';


/**
 * @memberOf AngularSDK
 * @type {Component}
 * @description The Cloudinary video component
 * @prop {CloudinaryVideo} transformation Generated by @cloudinary/base
 * @prop {plugins} plugins Advanced image component plugins lazyload()
 * @prop videoAttributes Optional attributes include controls, loop, muted, poster, preload, autoplay
 * @prop videoEvents Optional video events include play, loadstart, playing, error, ended
 * @prop {videoSources} sources Optional sources to generate
 * @example
 *  <caption>
 *  Using custom defined resources.
 * </caption>
 *   vid = new CloudinaryVideo('dog', {cloudName: 'demo'});
 *   sources = [
 {
        type: 'mp4',
        codecs: ['vp8', 'vorbis'],
        videoCodec: 'auto'
      },
 {
        type: 'webm',
        codecs: ['avc1.4D401E', 'mp4a.40.2'],
        videoCodec: 'auto'
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
export class CloudinaryVideoComponent implements OnInit, OnChanges {
  constructor(private el: ElementRef) { }

  @Input('cldVid') cldVid: CloudinaryVideo;
  @Input('sources') sources: videoSources;
  @Input('poster') poster: string;
  @Input('plugins') plugins: plugins;

  // Event emitters
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() loadstart: EventEmitter<any> = new EventEmitter();
  @Output() playing: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() ended: EventEmitter<any> = new EventEmitter();


  private htmlVideoLayerInstance: HtmlVideoLayer;
  private videoAttributes: { controls: string; loop: string; muted: string; poster: string; preload: string, autoplay: string, playsinline: string };


  /**
   * On init creates a new HTMLVideoLayer instance and initialises with ref to video element,
   * user generated cloudinaryVideo and the plugins to be used
   */
  ngOnInit() {
    // Supported video attributes taken from <advanced-video> and stored to be used in the inner <video> element
    this.videoAttributes = {
      controls: this.el.nativeElement.attributes.controls,
      loop: this.el.nativeElement.attributes.loop,
      muted: this.el.nativeElement.attributes.muted,
      poster: this.poster,
      preload: this.el.nativeElement.attributes.preload,
      autoplay: this.el.nativeElement.attributes.autoplay,
      playsinline: this.el.nativeElement.attributes.playsinline
    };

    this.htmlVideoLayerInstance = new HtmlVideoLayer(
      this.el.nativeElement.children[0],
      this.cldVid,
      this.sources,
      this.plugins,
      this.videoAttributes
      );
  }

  /**
   * On update we cancel running plugins and update the video instance if the src
   * was changed
   */
  ngOnChanges() {
    if (this.htmlVideoLayerInstance) {
      cancelCurrentlyRunningPlugins(this.htmlVideoLayerInstance.htmlPluginState);
      this.htmlVideoLayerInstance.update(this.cldVid, this.sources, this.plugins, this.videoAttributes);
    }
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
