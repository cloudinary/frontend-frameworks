import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from "../lib/cloudinary-image.component";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import CloudinaryConfig from "@cloudinary/base/config/CloudinaryConfig";
import {accessibility} from "../public_api";

const CONFIG_INSTANCE = new CloudinaryConfig({
  cloud: {
    cloudName: 'demo'
  }
});

let cl = new CloudinaryImage('sample').setConfig(CONFIG_INSTANCE);

describe('accessibility', () => {
  let component: CloudinaryImageComponent;
  let fixture: ComponentFixture<CloudinaryImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudinaryImageComponent ],
    });
    fixture = TestBed.createComponent(CloudinaryImageComponent);
    component = fixture.componentInstance;
  });

  it('should apply default', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [accessibility()];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample')
  }));

  it('should apply darkmode', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [accessibility('darkmode')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample')
  }));

  it('should apply brightmode', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [accessibility('brightmode')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/co_white,e_colorize:40/sample')
  }));

  it('should apply monochrome', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [accessibility('monochrome')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/e_grayscale/sample')
  }));

  it('should apply colorblind', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [accessibility('colorblind')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/e_assist_colorblind/sample')
  }));

  it('should default if supplied with incorrect mode', fakeAsync(()=>{
    component.transformation = cl;
    component.plugins = [accessibility('ddd')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/co_black,e_colorize:70/sample')
  }));
});
