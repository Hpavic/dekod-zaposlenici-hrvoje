import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationSettings, PaginationConstants } from '../models/employee.model';

@Component({
  selector: 'app-employee-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-pagination.component.html',
  styleUrl: './employee-pagination.component.css'
})
export class EmployeePaginationComponent implements OnChanges {
  @Input() totalItems!: number; // Total number of filtered employees
  @Input() itemsPerPage: number = PaginationSettings.DefaultItemsPerPage;
  @Input() currentPage: number = PaginationSettings.DefaultCurrentPage;
  
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number = 0;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[PaginationConstants.TotalItems] || 
        changes[PaginationConstants.ItemsPerPage] || 
        [PaginationConstants.CurrentPage]) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      this.currentPage = changes[PaginationConstants.CurrentPage]?.currentValue || 1;
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      console.log('Emitting current pagination page:', this.currentPage);
      this.pageChanged.emit(this.currentPage);
    }
  }
}
