import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSortComponent } from './employee-sort.component';

describe('EmployeeSortComponent', () => {
  let component: EmployeeSortComponent;
  let fixture: ComponentFixture<EmployeeSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
