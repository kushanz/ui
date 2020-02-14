import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxItemModalComponent } from './inbox-item-modal.component';

describe('InboxItemModalComponent', () => {
  let component: InboxItemModalComponent;
  let fixture: ComponentFixture<InboxItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
