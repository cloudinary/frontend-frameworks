import { Component, OnInit } from '@angular/core';
import { html } from '../../../../../html/dist';


@Component({
  selector: 'cld-img',
  template: `
    <div></div>
  `,
  styles: []
})
export class CldImg implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(html());
  }

}


