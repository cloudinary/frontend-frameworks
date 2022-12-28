import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CloudinaryModule } from '../../../projects/cloudinary-library/src/lib/cloudinary.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CloudinaryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
