import { NgModule } from '@angular/core';
import { AngularLibraryComponent } from './angular-library.component';
import { CloudinaryImageComponent } from './cloudinary-image.component';

@NgModule({
  imports: [
  ],
  declarations: [AngularLibraryComponent, CloudinaryImageComponent],
  exports: [AngularLibraryComponent, CloudinaryImageComponent]
})
export class AngularLibraryModule { }
