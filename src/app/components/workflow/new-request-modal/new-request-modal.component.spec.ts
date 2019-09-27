import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestModalComponent } from './new-request-modal.component';

describe('NewRequestModalComponent', () => {
  let component: NewRequestModalComponent;
  let fixture: ComponentFixture<NewRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRequestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
