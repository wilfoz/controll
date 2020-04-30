import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMonitoringComponent } from './production-monitoring.component';

describe('ProductionMonitoringComponent', () => {
  let component: ProductionMonitoringComponent;
  let fixture: ComponentFixture<ProductionMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
