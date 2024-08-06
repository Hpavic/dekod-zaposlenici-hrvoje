import { Component, OnInit, HostListener } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Employee, ApiResponse, SortCriteria, SortDirection } from '../models/employee.model';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeSortComponent } from '../employee-sort/employee-sort.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule, EmployeeFilterComponent, EmployeeSortComponent],
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
  sortCriteria: { criteria: SortCriteria, direction: SortDirection } | null = null;

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
          this.filteredEmployees = [...this.employees];
          this.applySort();
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

  onSortSelected(sortCriteria: { criteria: SortCriteria, direction: SortDirection }): void {
    this.sortCriteria = sortCriteria;
    this.applySort();
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(emp =>
      this.selectedPositions.includes(emp.jobTitle)
    );
    this.applySort();
  }

  applySort(): void {
    if (this.sortCriteria) {
      const { criteria, direction } = this.sortCriteria;
      this.filteredEmployees.sort((a, b) => {
        let comparison = 0;
        if (criteria === SortCriteria.DateOfBirth) {
          comparison = new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime();
        } else {
          comparison = (a[criteria] as string).localeCompare(b[criteria] as string);
        }
        return direction === SortDirection.Ascending ? comparison : -comparison;
      });
    }
  }

  retry(): void {
    this.isLoading = true;
    this.employeeService.clearCache();
    this.fetchEmployees();
  }
}
