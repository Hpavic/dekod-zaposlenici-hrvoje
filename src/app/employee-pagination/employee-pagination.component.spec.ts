import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePaginationComponent } from './employee-pagination.component';

describe('EmployeePaginationComponent', () => {
  let component: EmployeePaginationComponent;
  let fixture: ComponentFixture<EmployeePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
