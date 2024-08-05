import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-filter.component.html',
  styleUrl: './employee-filter.component.css'
})
export class EmployeeFilterComponent implements OnChanges {
  @Input() positions: string[] = [];
  @Output() filterSelected: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedPositions: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['positions']) {
      this.selectedPositions = [...this.positions];
      this.emitSelectedPositions();
    }
  }

  togglePosition(position: string): void {
    const index = this.selectedPositions.indexOf(position);
    if (index > -1) {
      this.selectedPositions.splice(index, 1);
    } else {
      this.selectedPositions.push(position);
    }
    this.emitSelectedPositions();
  }

  emitSelectedPositions(): void {
    console.log('Emitting selectedPositions:', this.selectedPositions);
    this.filterSelected.emit(this.selectedPositions);
  }
}
