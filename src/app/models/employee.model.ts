export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    jobTitle: string;
}
  
export interface ApiResponse {
    success: boolean;
    data: Employee[];
}

export interface EmployeeCriteria {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    jobTitle: string;
  }