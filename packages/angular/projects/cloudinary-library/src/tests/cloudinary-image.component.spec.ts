import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CloudinaryImageComponent } from '../lib/cloudinary-image.component';
import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';

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

  it('should add attributes to image', fakeAsync(() => {
    component.cldImg = cloudinaryImage;
    component.width = '400px';
    component.alt = 'text text text';
    component.height = '500px';
    component.loading = 'eager';
    fixture.detectChanges();
    tick(0);
    const imgElement: HTMLImageElement = fixture.nativeElement;
    const img = imgElement.querySelector('img');
    expect(img.outerHTML).toBe('<img _ngcontent-a-c11="" alt="text text text" width="400px" height="500px"' +
      ' loading="eager" src="https://res.cloudinary.com/demo/image/upload/sample">');
  }));
});


