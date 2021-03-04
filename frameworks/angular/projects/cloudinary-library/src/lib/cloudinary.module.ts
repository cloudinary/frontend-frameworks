import { NgModule } from '@angular/core';
import { CloudinaryImageComponent } from './cloudinary-image.component';
import { CloudinaryVideoComponent } from './cloudinary-video.component';

@NgModule({
  imports: [
  ],
  declarations: [CloudinaryImageComponent, CloudinaryVideoComponent],
  exports: [CloudinaryImageComponent, CloudinaryVideoComponent]
})
export class CloudinaryModule { }
