import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, retry, of, tap } from 'rxjs';
import { environment } from '../environment/environment';
import { Employee, ApiResponse } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;
  private employeesCache: Employee[] | null = null;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<ApiResponse> {
    if (this.employeesCache) {
        console.log('Fetching employees from cache');
        // If data is cached, return it as an observable
        return of({ success: true, data: this.employeesCache });
    }

    console.log('Fetching employees from API');
    // If data is not cached, make an HTTP request
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
        tap(data => {
            if (data.success) {
                this.employeesCache = data.data.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
            }
        }),
        retry(3),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMsg = `An error occurred: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMsg = `Backend returned code ${error.status}, body was: ${error.message}`;
    }

    console.error(errorMsg);
    return throwError(() => new Error(errorMsg));
  }

  clearCache() {
    this.employeesCache = null;
  }
}
