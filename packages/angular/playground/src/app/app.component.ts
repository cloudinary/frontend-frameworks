import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'playground';
  people: string[] = [];
  img?: CloudinaryImage;
  attributes = { class: 'attr-class' };

  ngOnInit() {
    this.people = ['spiderman', 'tim', 'timmy'];

    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'demo',
      },
    });

    this.img = cld.image('front_face');
  }
}
