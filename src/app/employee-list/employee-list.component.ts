import { Component, OnInit, HostListener } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Employee, ApiResponse } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string | null = null;
  isMobile: boolean = false;

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
          this.errorMessage = null;
        }
      },
      error: error => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log('Fetch employees complete');
      }
    };

    this.employeeService.getEmployees().subscribe(observer);
  }

  retry(): void {
    this.employeeService.clearCache();
    this.fetchEmployees();
  }
}
