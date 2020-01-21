import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XsitesComponent } from './xsites.component';

describe('XsitesComponent', () => {
  let component: XsitesComponent;
  let fixture: ComponentFixture<XsitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XsitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
