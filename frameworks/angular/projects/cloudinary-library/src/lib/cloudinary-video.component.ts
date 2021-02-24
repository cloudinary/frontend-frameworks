import {Component, OnInit, Input, ElementRef, EventEmitter, Output, OnChanges} from '@angular/core';
import {CloudinaryVideo} from '@cloudinary/base';
import {
  HtmlVideoLayer,
  plugins
} from '@cloudinary/html';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'advanced-video',
  template: `<video (play)="emitPlayEvent()"></video>`,
})
export class CloudinaryVideoComponent implements OnInit, OnChanges {
  constructor(private el: ElementRef) { }

  @Input('cldVid') cldVid: CloudinaryVideo;
  @Input('sources') sources: object;
  @Input('plugins') plugins: plugins;
  @Output() play: EventEmitter<any> = new EventEmitter();


  htmlVideoLayerInstance: HtmlVideoLayer;


  // Supported video attributes
  videoAttributes = [
    this.el.nativeElement.attributes.controls,
    this.el.nativeElement.attributes.loop,
    this.el.nativeElement.attributes.muted,
    this.el.nativeElement.attributes.poster,
    this.el.nativeElement.attributes.preload
  ];

  /**
   * On init creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated cloudinaryImage and the plugins to be used
   */
  ngOnInit() {
    console.log('vid att ang',       typeof this.videoAttributes);
    this.htmlVideoLayerInstance = new HtmlVideoLayer(
      this.el.nativeElement.children[0],
      this.cldVid,
      this.sources,
      null,
      this.videoAttributes
      );
  }

  ngOnChanges() {
    if (this.htmlVideoLayerInstance) {
      this.htmlVideoLayerInstance.update(this.cldVid, this.plugins, this.videoAttributes);
    }
  }


  emitPlayEvent(): void {
    console.log('emitPlay');
    this.play.emit();
  }
}
