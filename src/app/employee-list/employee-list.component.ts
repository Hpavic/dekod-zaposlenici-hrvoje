import { Component, OnInit, HostListener } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Employee, ApiResponse, SortCriteria, SortDirection, PaginationSettings } from '../models/employee.model';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeSortComponent } from '../employee-sort/employee-sort.component';
import { EmployeeSearchComponent } from '../employee-search/employee-search.component';
import { EmployeePaginationComponent } from '../employee-pagination/employee-pagination.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule, 
    EmployeeFilterComponent, EmployeeSortComponent, EmployeeSearchComponent, EmployeePaginationComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  positions: string[] = [];
  selectedPositions: string[] = [];
  errorMessage: string | null = null;
  isMobile: boolean = false;
  isLoading: boolean = true;
  sortCriteria: { criteria: SortCriteria, direction: SortDirection } | null = null;
  searchTerm: string = '';
  itemsPerPage: number = PaginationSettings.DefaultItemsPerPage;
  currentPage: number = PaginationSettings.DefaultCurrentPage;

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
          this.applyAllFilters();
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
    this.applyAllFilters();
  }

  onSortSelected(sortCriteria: { criteria: SortCriteria, direction: SortDirection }): void {
    this.sortCriteria = sortCriteria;
    this.applyAllFilters();
  }

  onSearchTermChanged(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyAllFilters();
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }

  applyAllFilters(): void {
    if (this.searchTerm.length < 3) {
      // If the search term is less than 3 chars, show all employees filtered by selected positions
      this.filteredEmployees = this.employees.filter(emp =>
        this.selectedPositions.includes(emp.jobTitle)
      );
    } else {
      // Otherwise, apply the search filter along with other filters
      this.filteredEmployees = this.employees.filter(emp => {
        const fullName = `${emp.firstName.toLowerCase()} ${emp.lastName.toLowerCase()}`;
        const reversedFullName = `${emp.lastName.toLowerCase()} ${emp.firstName.toLowerCase()}`;
        const searchName = this.searchTerm.toLowerCase();
  
        return (
          this.selectedPositions.includes(emp.jobTitle) &&
          (
            emp.firstName.toLowerCase().includes(searchName) ||
            emp.lastName.toLowerCase().includes(searchName) ||
            fullName.includes(searchName) ||
            reversedFullName.includes(searchName)
          )
        );
      });
    }

    this.applySort();

    // Reset pagination to the first page whenever filters are applied
    this.currentPage = 1;
    this.applyPagination();
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

  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  retry(): void {
    this.isLoading = true;
    this.employeeService.clearCache();
    this.fetchEmployees();
  }
}
