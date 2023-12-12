import { Component } from '@angular/core';
import { AddEditBookingComponent } from '../add-edit-booking/add-edit-booking.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmployeesService } from 'src/app/shared/services/employees.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';

@Component({
  selector: 'app-employee-shift',
  templateUrl: './employee-shift.component.html'
})
export class EmployeeShiftComponent {
  public totalCount = 0;
  public employees: any[] = [];
  public addEditEmployeeModal!: BsModalRef;
  public deleteEmployeeModal!: BsModalRef;
  public viewEmployeeModal!: BsModalRef
  public filter: any[] = [];
  public searchedKey: string = ''

  /**
   * The constructor function initializes the private variables employeeService, modalService, and
   * toastr.
   * @param {EmployeesService} employeeService - It is used to interact with the backend API 
   * @param {BsModalService} modalService - Used to create and manage modal windows 
   * @param {ToastrService} toastr - Used for tostr messages
   */
  constructor(
    private employeeService: EmployeesService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  /**
   * The ngOnInit function is used to load employees when the component is initialized.
   */
  ngOnInit() {
    this.loadEmployees()
  }

  /**
   * The function "loadEmployees" retrieves a list of employees from a service and assigns it to a
   * variable, while also updating the total count of employees.
   */
  private loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: any) => {
      this.employees = response;
      this.filter = [...response]
      this.totalCount = this.employees.length;
    })
  }

  /**
   * The function opens a modal for adding or editing a employee and updates the list of employees.
   * @param {any} [employee=null] - It is used to pass the employee data to the modal component for editing.
   */
  public openAddEditEmployeeModal(employee: any = null): void {
    this.addEditEmployeeModal = this.modalService.show(AddEditBookingComponent, {
      initialState: { employee: employee }, class: 'modal-lg',
      ignoreBackdropClick: true
    });

    this.addEditEmployeeModal.content.close.subscribe(() => {
      this.addEditEmployeeModal.hide();
      this.loadEmployees();
    })
  }

  /**
   * The function "openViewEmployeeModal" opens a modal window to view employee details and updates
   * @param {any} employee - It is used to pass the employee object to the modal component.
   */
  public openViewEmployeeModal(employee: any): void {
    this.viewEmployeeModal = this.modalService.show(ViewEmployeeComponent, {
      initialState: { employee: employee }, class: 'modal-md',
      ignoreBackdropClick: true
    });

    this.viewEmployeeModal.content.close.subscribe(() => {
      this.viewEmployeeModal.hide();
      this.loadEmployees();
    })
  }

  /* The `openDeleteEmployeeModal` function is responsible for opening a modal window to confirm the
  deletion of an employee. */
  public openDeleteEmployeeModal(employee: any): void {
    this.deleteEmployeeModal = this.modalService.show(DeleteModalComponent, {
      class: 'modal-md',
      ignoreBackdropClick: true
    });

    this.deleteEmployeeModal.content.close.subscribe(() => {
      this.deleteEmployeeModal.hide();
    });

    this.deleteEmployeeModal.content.confirmedDelete.subscribe(() => {
      this.employeeService.deleteEmployee(employee.id).subscribe(() => {
        this.toastr.success('Employee deleted successfully', 'Success');
      }, () => {
        this.toastr.error('Error in deleting employee ', 'Error');
      });
      this.deleteEmployeeModal.hide();
      this.loadEmployees();
    });
  }

  applyFilter() {
    this.filter = this.employees.filter(employee => {
      const searchTerm = this.searchedKey.toLowerCase();
      return (
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm)
      );
    });
  }


}
