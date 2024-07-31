import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dekod-zaposlenici-hrvoje';

  activeRoute: string = '';

  constructor(private router: Router) {}

  navigateToEmployees(): void {
    this.activeRoute = 'employees';
    this.router.navigate(['/employees']);
  }

  navigateToAddEmployee(): void {
    this.activeRoute = 'add-employee';
    this.router.navigate(['/add-employee']);
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
