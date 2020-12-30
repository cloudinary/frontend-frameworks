import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from "../lib/cloudinary-image.component";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {lazyload} from "../public_api";

const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('lazyload', () => {
  let component: CloudinaryImageComponent;
  let fixture: ComponentFixture<CloudinaryImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudinaryImageComponent ],
    });
    fixture = TestBed.createComponent(CloudinaryImageComponent);
    component = fixture.componentInstance;
  });

  // it('should not have src pre-scroll', fakeAsync(()=>{
  //   component.transformation = cl;
  //   component.plugins = [lazyload()];
  //   fixture.detectChanges();
  //   tick(0);
  //   const imgElement: HTMLImageElement = fixture.nativeElement;
  //   const img = imgElement.querySelector('img');
  //   expect(img.src).toBe('')
  // }));

  it('should not have src pre-scroll', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [lazyload()];
    fixture.detectChanges();

    let divElement = document.createElement("div");
    divElement.style.height = '3000px';
    fixture.nativeElement.insertBefore(divElement, fixture.nativeElement.firstChild);

    tick(0);

    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe( '')
  }));

  it('should have src when in view', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [lazyload()];
    fixture.detectChanges();

    let divElement = document.createElement("div");
    divElement.style.height = '5000px';
    fixture.nativeElement.insertBefore(divElement, fixture.nativeElement.firstChild);

    window.scrollTo(0, 6000);
    console.log(window.pageYOffset);


    tick(500);
    fixture.detectChanges();


    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    console.log(img)
    expect(img.src).toBe( 'https://res.cloudinary.com/demo/image/upload/sample')
  }));

});
