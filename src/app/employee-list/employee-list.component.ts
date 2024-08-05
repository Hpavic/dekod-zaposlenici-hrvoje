import { Component, OnInit, HostListener } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Employee, ApiResponse } from '../models/employee.model';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule, EmployeeFilterComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  positions: string[] = [];
  selectedPositions: string[] = [];
  errorMessage: string | null = null;
  isMobile: boolean = false;
  isLoading: boolean = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.checkScreenSize();
    this.fetchEmployees();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  fetchEmployees(): void {
    const observer: Observer<ApiResponse> = {
      next: data => {
        if (data.success) {
          this.employees = data.data;
          this.positions = [...new Set(this.employees.map(emp => emp.jobTitle))];
          this.selectedPositions = [...this.positions];
          this.filterEmployees();
          this.errorMessage = null;
        }
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
      complete: () => {
        console.log('Fetch employees complete');
      }
    };
    this.employeeService.getEmployees().subscribe(observer);
  }

  onFilterSelected(selectedPositions: string[]): void {
    this.selectedPositions = selectedPositions;
    this.filterEmployees();
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(emp =>
      this.selectedPositions.includes(emp.jobTitle)
    );
  }

  retry(): void {
    this.isLoading = true;
    this.employeeService.clearCache();
    this.fetchEmployees();
  }
}
