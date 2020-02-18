import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasnoryPanelComponent } from './masnory-panel.component';

describe('MasnoryPanelComponent', () => {
  let component: MasnoryPanelComponent;
  let fixture: ComponentFixture<MasnoryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasnoryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasnoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
