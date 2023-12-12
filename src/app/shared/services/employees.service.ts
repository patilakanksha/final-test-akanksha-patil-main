import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private httpClient: HttpClient) { }

  /**
   * The function `getEmployees` makes an HTTP GET request to `http://localhost:8001/employees`
   * @returns an HTTP GET request to the `http://localhost:8001/employees` endpoint.
   */
  public getEmployees(): any {
    //return this.httpClient.get(`http://localhost:8001/employees`);
    return this.httpClient.get('http://localhost:5008/api/EmployeeShift')
  }

  /**
   * The addEmployee function sends a POST request to a server endpoint with the employee data.
   * @param {object} employee - The `employee` parameter is an object of employee
   * @returns The addEmployee method is returning an HTTP POST request 
   */
  public addEmployee(employee: object): any {
    return this.httpClient.post(`http://localhost:5008/api/EmployeeShift/Add`, employee); 
  }

  /**
   * The function sends a PUT request to update an employee's information using the employee's ID.
   * @param {any} employee - The `employee` parameter is an object that represents the employee data to be updated.
   * @returns the result of the HTTP PUT request
   */
  public updateEmployee(employee: any): any {
    return this.httpClient.put(`http://localhost:5008/api/EmployeeShift/Edit/${employee.id}`, employee)
   
  }


  /**
   * The function sends a DELETE request 
   * @param {any} employeeId - The employeeId parameter is the unique identifier of the employee that
   * you want to delete from the system.
   * @returns The deleteEmployee function is returning an HTTP DELETE request.
   */
  public deleteEmployee(employeeId: any): any {
    return this.httpClient.delete(`http://localhost:5008/api/EmployeeShift/Delete?id=${employeeId}`)
    
  }
}
