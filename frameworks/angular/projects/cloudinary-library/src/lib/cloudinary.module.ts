import { NgModule, enableProdMode } from '@angular/core';
import { CloudinaryImageComponent } from './cloudinary-image.component';
import { CloudinaryVideoComponent } from './cloudinary-video.component';

/**
 * Enables production mode. Added to remove
 * ng reflects from dom.
 */
enableProdMode();

@NgModule({
  imports: [
  ],
  declarations: [CloudinaryImageComponent, CloudinaryVideoComponent],
  exports: [CloudinaryImageComponent, CloudinaryVideoComponent]
})
export class CloudinaryModule { }
