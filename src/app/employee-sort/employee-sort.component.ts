import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortCriteria, SortDirection } from '../models/employee.model';

@Component({
  selector: 'app-employee-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-sort.component.html',
  styleUrl: './employee-sort.component.css'
})
export class EmployeeSortComponent {
  @Output() sortSelected: EventEmitter<{ criteria: SortCriteria, direction: SortDirection }> = new EventEmitter<{ criteria: SortCriteria, direction: SortDirection }>();

  selectedCriteria: SortCriteria | null = null;
  selectedDirection: SortDirection | null = null;
  SortDirection = SortDirection;
  SortCriteria = SortCriteria;

  sort(criteria: SortCriteria, direction: SortDirection): void {
    // If the same criteria and direction are already selected, do nothing
    if (this.selectedCriteria === criteria && this.selectedDirection === direction) {
      return;
    }

    this.selectedCriteria = criteria;
    this.selectedDirection = direction;
    
    // Emit event with selected sorting criteria and direction
    console.log('Emitting selected sort criteria and direction:', { criteria, direction });
    this.sortSelected.emit({ criteria, direction });
  }
}
