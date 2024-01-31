import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from '../lib/cloudinary-image.component';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import {SDKAnalyticsConstants} from '../internal/SDKAnalyticsConstants';
import {APP_VERSION} from '../lib/version';
import {VERSION} from '@angular/core';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo'});

describe('analytics', () => {
  let component: CloudinaryImageComponent;
  let fixture: ComponentFixture<CloudinaryImageComponent>;

  beforeEach(() => {
    SDKAnalyticsConstants.sdkSemver = '1.0.0';
    SDKAnalyticsConstants.techVersion = '10.2.5';
    TestBed.configureTestingModule({
      declarations: [ CloudinaryImageComponent ],
    });
    fixture = TestBed.createComponent(CloudinaryImageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    SDKAnalyticsConstants.sdkSemver = APP_VERSION;
    SDKAnalyticsConstants.techVersion = VERSION.full;
  });

  it('creates an img with analytics', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');

    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/sample?_a=DAKAABDSZAA0');
  }));
});
