import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowItemModalComponent } from './workflow-item-modal.component';

describe('WorkflowItemModalComponent', () => {
  let component: WorkflowItemModalComponent;
  let fixture: ComponentFixture<WorkflowItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
