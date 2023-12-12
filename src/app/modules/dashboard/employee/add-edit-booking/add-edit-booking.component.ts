import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from 'src/app/shared/services/employees.service';

@Component({
  selector: 'app-add-edit-booking',
  templateUrl: './add-edit-booking.component.html',
})
export class AddEditBookingComponent {
  minDateValidator(): import("@angular/forms").ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
  
      // Check if the selected date is greater than or equal to today
      return selectedDate >= today ? null : { minDate: true };
    };
  }
  @Input() employee: any;
  @Output() close = new EventEmitter();
  public formTitle: string = "";
  public currentDate: Date = new Date();

  constructor(
    private employeeService: EmployeesService,
    private toastr: ToastrService
  ) 
  {}

  /**
   * The ngOnInit function checks if an employee exists and sets the form title accordingly, and if an
   * employee exists, it populates the form with the employee's data.
   */
  ngOnInit() {
    if (this.employee) {
      this.formTitle = "Edit"
      this.employee.shiftBookDate = new Date(this.employee.shiftBookDate).toISOString().split('T')[0]; 
      this.employeeShiftForm.patchValue(this.employee)
    } else {
      this.formTitle = "Add"
    }
  }

  /* The `employeeShiftForm` is an instance of the `FormGroup` class
  It represents a group of form controls and their values. */
  public employeeShiftForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(2),
      Validators.pattern(/^[A-Za-z]+$/)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(2),
      Validators.pattern(/^[A-Za-z]+$/)]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$')]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]),
    gender: new FormControl('', Validators.required,),
    shift: new FormControl('', Validators.required,),
    shiftBookDate: new FormControl('', [
      Validators.required, this.minDateValidator()]),
    acceptTerms: new FormControl('', Validators.required)
  })

  /**
   * The function "onClose" emits a "close" event.
   */
  public onClose(): void {
    this.close.emit()
  }

  /**
   * The save function checks if an employee exists and either adds a new student or updates an existing
   * student based on the payload.
   */
  public save(): void {
    let payload: any = this.assignValueToModel();
    if (!this.employee) {
      this.addEmployeeShift(payload);
    } else {
      this.updateEmployeeShift(payload)
    }
  }

  /**
   * The addStudent function adds a student by calling the addEmployee method from the employeeService
   * @param {any} payload - The payload parameter is an object that contains the data of the employee
   */
  public addEmployeeShift(payload: any): void {
    this.employeeService.addEmployee(payload).subscribe((data:{status:string}) => {
      if(data?.status){
        this.toastr.success(data?.status, 'Success')
      }
      this.onClose();
    }, (error:{status:string}) => {
      if(error?.status){
        this.toastr.error(error?.status,  'Error')
      }
    }
    )
  }
  /**
   * The function updates a employees information.
   * @param {any} payload - it is used to pass the data of the employee that needs to be updated.
   */
  
  public updateEmployeeShift(payload: any): void {
    debugger;
    this.employeeService.updateEmployee(payload).subscribe((data:{status:string}) => {
      debugger;
      console.log("update: ",data?.status);
      if(data?.status){
        console.log(data?.status);
        this.toastr.success(data?.status, 'Success')
      }
      this.onClose();
    }, (error:{Message:string}) => {
      console.log("Error: ",error?.Message);
      if(error?.Message){
        this.toastr.error(error?.Message,  'Error')
      }
    }
    )
  }

  /**
   * The function assigns values from a form to an employee object.
   * @returns an object with properties The values of these properties are obtained from form controls
   */
  private assignValueToModel(): any {
    let employee = {
      'id': this.employee ? this.employee.id : 0,
      'firstName': this.employeeShiftForm.get('firstName')?.value,
      'lastName': this.employeeShiftForm.get('lastName')?.value,
      'gender': this.employeeShiftForm.get('gender')?.value,
      'shift': this.employeeShiftForm.get('shift')?.value,
      'mobile': this.employeeShiftForm.get('mobile')?.value,
      'email': this.employeeShiftForm.get('email')?.value,
      'shiftBookDate': this.employeeShiftForm.get('shiftBookDate')?.value,
      'acceptTerms': this.employeeShiftForm.get('acceptTerms')?.value
    };
    return employee;
  }

  /**
   * The function checks if a form control is invalid and has been interacted with by the user.
   * @param {string} controlName - The controlName parameter is a string. It is form control in the employeeShiftForm.
   * @returns a boolean value.
   */
  public checkIfControlValid(controlName: string): any {
    return this.employeeShiftForm.get(controlName)?.invalid &&
      this.employeeShiftForm.get(controlName)?.errors &&
      (this.employeeShiftForm.get(controlName)?.dirty || this.employeeShiftForm.get(controlName)?.touched);
  }

  /**
   * The function checks if a specific control in a form has a specific error.
   * @param {string} controlName - The name of the form control you want to check for errors.
   * @param {string} error - The "error" parameter is for check specific error
   * @returns the result of calling the `hasError` method 
   */
  public checkControlHasError(controlName: string, error: string): any {
    return this.employeeShiftForm.get(controlName)?.hasError(error)
  }
}
