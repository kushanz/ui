import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderErrorComponent } from './loader-error.component';

describe('LoaderErrorComponent', () => {
  let component: LoaderErrorComponent;
  let fixture: ComponentFixture<LoaderErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
