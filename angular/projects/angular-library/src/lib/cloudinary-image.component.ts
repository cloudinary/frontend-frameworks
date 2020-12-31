import {Component, OnInit, Input, ElementRef, Renderer2} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import {
  HtmlLayer,
  plugins
} from '../../../../../html/dist';


@Component({
  selector: 'cld-img',
  template: `
    <img />
  `,
  styleUrls: ['./cloudinary-image.component.css']
})
export class CloudinaryImageComponent implements OnInit {
  @Input('transformation') transformation: CloudinaryImage;
  @Input('plugins') plugins: plugins;
  htmlLayerInstance: HtmlLayer;
  constructor(private el: ElementRef) { }

  /**
   * On init creates a new HTMLLayer instance and initialises with ref to img element,
   * user generated cloudinaryImage and the plugins to be used
   */
  ngOnInit() {
    this.htmlLayerInstance = new HtmlLayer(this.el.nativeElement.children[0], this.transformation, this.plugins);
  }

  /**
   * On update we cancel running plugins and update image instance with the state of user
   * cloudinaryImage and the state of plugins
   */
  ngOnChanges() {
    if(this.htmlLayerInstance){
      this.htmlLayerInstance.cancelCurrentlyRunningPlugins();
      this.htmlLayerInstance.update(this.transformation, this.plugins)
    }
  }

  /**
   * On destroy we cancel the currently running plugins
   */
  ngOnDestroy() {
    // safely cancel running events on destroy
    this.htmlLayerInstance.cancelCurrentlyRunningPlugins()
  }
}
