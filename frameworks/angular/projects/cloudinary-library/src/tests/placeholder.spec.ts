import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from '../lib/cloudinary-image.component';
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';
import {placeholder} from '../public_api';
import {PLACEHOLDER_IMAGE_OPTIONS, singleTransparentPixel} from '../../../../../html/src/utils/internalConstants';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo'}, { analytics: false });

describe('placeholder', () => {
  const mockImage = {
    src: null,
    onload: () => {},
    onerror: () => {}
  };
  let component: CloudinaryImageComponent;
  let fixture: ComponentFixture<CloudinaryImageComponent>;

  beforeEach(() => {
    // @ts-ignore
    window.Image = function() { return mockImage; };
    TestBed.configureTestingModule({
      declarations: [ CloudinaryImageComponent ],
    });
    fixture = TestBed.createComponent(CloudinaryImageComponent);
    component = fixture.componentInstance;
  });

  it('should apply default', fakeAsync(()=>{
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder()];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample`)
  }));

  it('should apply vectorize', fakeAsync(()=> {
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder('vectorize')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample`)
  }));

  it('should apply pixelate', fakeAsync(()=>{
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder('pixelate')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.pixelate}/sample`)
  }));

  it('should apply blur', fakeAsync(()=>{
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder('blur')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.blur}/sample`)
  }));

  it('should apply predominant-color', fakeAsync(()=>{
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder('predominant-color')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS["predominant-color"]}/sample`)
  }));

  it('should default if supplied with incorrect mode', fakeAsync(()=>{
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder('ddd')];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample`)
  }));

  it('should set singleTransparentPixel on error', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder()];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    // @ts-ignore
    img.onerror();
    expect(img.src).toBe(singleTransparentPixel);
  }));

  it('should not fail on error', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder()];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    // @ts-ignore
    img.onload(); // onload large image

    mockImage.onerror(); // simulate image onerror
    tick(0);
    expect(mockImage.src).toBe('https://res.cloudinary.com/demo/image/upload/sample');

  }));
});
