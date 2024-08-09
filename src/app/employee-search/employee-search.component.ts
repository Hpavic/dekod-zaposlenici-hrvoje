import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent {
  @Output() searchTermChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTermChanged(event: Event): void {
    const target = event.target as HTMLInputElement;
    const trimmedValue = target.value.trim();

    // Emit the search term
    console.log('Emitting search string:', trimmedValue);
    this.searchTermChanged.emit(trimmedValue);
  }
}
