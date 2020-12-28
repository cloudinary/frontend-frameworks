import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLibraryComponent } from '../lib/angular-library.component';

describe('AngularLibraryComponent', () => {
  let component: AngularLibraryComponent;
  let fixture: ComponentFixture<AngularLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
