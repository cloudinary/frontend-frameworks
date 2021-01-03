import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from "../lib/cloudinary-image.component";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {responsive} from "../public_api";
import {dispatchResize} from "../testUtils/dispatchResize";

const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('responsive', () => {
  let component: CloudinaryImageComponent;
  let fixture: ComponentFixture<CloudinaryImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudinaryImageComponent ],
    });
    fixture = TestBed.createComponent(CloudinaryImageComponent);
    component = fixture.componentInstance;
  });

  it('should apply initial container width', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [responsive()];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_1190/sample')
  }));

  it('should update container width on window resize', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [responsive()];

    // Resize
    dispatchResize('60px', fixture, 0);

    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_60/sample')
  }));

  it('should step by the 100th', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [responsive(100)];

    // First resize
    dispatchResize('60px', fixture, 0);

    // Second resize should step to 200
    dispatchResize('150px', fixture, 500);

    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_200/sample')
  }));

  it('should step by breakpoints', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [responsive([800, 1000, 1200, 3000])];

    // First resize
    dispatchResize('60px', fixture, 0);

    // Second resize should step to 800
    dispatchResize('150px', fixture, 500);

    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample')
  }));

});
