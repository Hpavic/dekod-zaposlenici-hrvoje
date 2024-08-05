import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCriteria } from '../models/employee.model';

@Component({
  selector: 'app-employee-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-sort.component.html',
  styleUrl: './employee-sort.component.css'
})
export class EmployeeSortComponent {
  @Output() sortSelected: EventEmitter<{ criteria: keyof EmployeeCriteria, direction: string }> = new EventEmitter<{ criteria: keyof EmployeeCriteria, direction: string }>();

  selectedCriteria: keyof EmployeeCriteria | null = null;
  selectedDirection: string | null = null;

  sort(criteria: keyof EmployeeCriteria, direction: string): void {
    if (this.selectedCriteria === criteria && this.selectedDirection === direction) {
      return; // Already selected, do nothing
    }
    this.selectedCriteria = criteria;
    this.selectedDirection = direction;
    this.sortSelected.emit({ criteria, direction });
  }
}
