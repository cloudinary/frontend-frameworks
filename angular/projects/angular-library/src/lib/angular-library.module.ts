import { NgModule } from '@angular/core';
import { AngularLibraryComponent } from './angular-library.component';
import { CldImg } from './cloudinary-img.component';

@NgModule({
  imports: [
  ],
  declarations: [AngularLibraryComponent, CldImg],
  exports: [AngularLibraryComponent, CldImg]
})
export class AngularLibraryModule { }
