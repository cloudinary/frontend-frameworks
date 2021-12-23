import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from '../lib/cloudinary-image.component';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import {responsive} from '../public_api';
import {dispatchResize} from '../testUtils/dispatchResize';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo'}, { analytics: false });

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

  // it('should apply initial container width', fakeAsync(() => {
  //   component.cldImg = cloudinaryImage;
  //   component.plugins = [responsive()];
  //   fixture.detectChanges();
  //   tick(0);
  //   const imgElement: HTMLImageElement = fixture.nativeElement;
  //   const img = imgElement.querySelector('img');
  //   expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_790/sample');
  // }));

  it('should update container width on window resize', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    component.plugins = [responsive()];

    // Resize
    dispatchResize('60px', fixture, 0);

    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_60/sample');
  }));

  it('should step by the 100th', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    component.plugins = [responsive({steps: 100})];

    // First resize
    dispatchResize('60px', fixture, 0);

    // Second resize should step to 200
    dispatchResize('150px', fixture, 500);

    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_200/sample');
  }));

  it('should step by breakpoints', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    component.plugins = [responsive({steps: [800, 1000, 1200, 3000]})];

    // First resize
    dispatchResize('60px', fixture, 0);

    // Second resize should step to 800
    dispatchResize('150px', fixture, 500);

    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/c_scale,w_800/sample');
  }));

});
