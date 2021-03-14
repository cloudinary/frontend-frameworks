import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from '../lib/cloudinary-image.component';
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';
import {placeholder} from '../public_api';
import {PLACEHOLDER_IMAGE_OPTIONS} from '../../../../../html/src/utils/internalConstants';
import * as FooFunctions from '../../../../../html/src/utils/isBrowser';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo'});

describe('ssr', () => {
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

  it('should apply default', fakeAsync(() => {
    const isBrowser  = jasmine.createSpy().and.returnValue(false);
    console.log(jasmine.getGlobal())
    component.cldImg = cloudinaryImage;
    component.plugins = [placeholder()];
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe(`https://res.cloudinary.com/demo/image/upload/${PLACEHOLDER_IMAGE_OPTIONS.vectorize}/sample`);

  }));

});
