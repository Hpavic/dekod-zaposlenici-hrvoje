import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
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

  ngOnInit(): void {
    // Set the active route when the component initializes or the route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects.split('/')[1];
      }
    });
  }

  navigateToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  navigateToAddEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
