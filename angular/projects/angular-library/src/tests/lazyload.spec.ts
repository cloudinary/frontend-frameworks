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
});
