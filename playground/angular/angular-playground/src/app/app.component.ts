import {Component} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/url-gen";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cloudinaryImage = new CloudinaryImage("sample", {cloudName: "demo"});
  title = 'angular-playground';
}
