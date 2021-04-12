import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from '../lib/cloudinary-image.component';
import { CloudinaryImage } from '@cloudinary/base/assets/CloudinaryImage';

const cloudinaryImage = new CloudinaryImage('sample', { cloudName: 'demo'}, { analytics: false });

describe('CloudinaryImageComponent render', () => {
  let component: CloudinaryImageComponent;
  let fixture: ComponentFixture<CloudinaryImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudinaryImageComponent ],
    });
    fixture = TestBed.createComponent(CloudinaryImageComponent);
    component = fixture.componentInstance;
  });

  it('should render image', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.src).toBe('https://res.cloudinary.com/demo/image/upload/sample')
  }));

  it('ngOnChanges should trigger plugin rerun', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    const mockPlugin = jasmine.createSpy('spy');
    component.plugins = [mockPlugin];
    fixture.detectChanges();
    tick(0);

    // plugins called once
    expect(mockPlugin).toHaveBeenCalledTimes(1);

    // trigger ngOnChanges
    component.ngOnChanges();

    // plugins should be called twice after onChange
    expect(mockPlugin).toHaveBeenCalledTimes(2);
  }));
});


