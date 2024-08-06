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

export enum SortCriteria {
    FirstName = 'firstName',
    LastName = 'lastName',
    DateOfBirth = 'dateOfBirth',
    JobTitle = 'jobTitle'
}
  
export enum SortDirection {
    Ascending = 'asc',
    Descending = 'desc'
}