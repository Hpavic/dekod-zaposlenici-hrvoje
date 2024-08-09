import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', [Validators.required, dateNotInFuture]],
      jobTitle: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Employee data:', this.employeeForm.value);
      alert('Employee added successfully!');
      this.employeeForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}

// Picking future date for date of birth from date picker makes no sense
function dateNotInFuture(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return selectedDate > today ? { dateInFuture: true } : null;
}
