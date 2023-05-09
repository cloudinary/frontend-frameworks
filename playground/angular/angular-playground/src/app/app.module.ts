import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CloudinaryModule} from "@cloudinary/ng"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CloudinaryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
