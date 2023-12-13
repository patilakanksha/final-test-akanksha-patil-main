import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TableEntity } from '../../entities/table-entity';

@Component({
  selector: 'app-add-edit-table',
  templateUrl: './add-edit-table.component.html',
})
export class AddEditTableComponent {
  @Input() table: TableEntity | any;
  @Output() close = new EventEmitter();
  tableForm!: FormGroup;
  public isEdit: boolean = false;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    if (this.table) {
      this.isEdit = true;
      this.tableForm.reset(this.table);
    }
  }

  private initializeForm() {
    this.tableForm = this.fb.group({
      id: [null],
      name: ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z]+$/)]],
      number: [null, [Validators.required, Validators.min(1)]],
      description: ['', [ Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z]+$/)]],
    });
  }

  save() {
    if (this.tableForm.valid) {
      const saveData = this.tableForm.value as TableEntity;
      console.log(this.tableForm.value);
      this.adminService
        .addEditTable(this.tableForm.value)
        .subscribe(() => {
          if (saveData?.id) {
            this.toastr.success('Table updated successfully', 'Success');
          } else {
            this.toastr.success('Table save successfully', 'Success');
          }
          this.onClose();
        });
    } else {
      Object.values(this.tableForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  public onClose(): void {
    this.close.emit();
  }

  /**
   * The function checks if a form control is invalid and has been interacted with by the user.
   * @param {string} controlName - The controlName parameter is a string. It is form control in the employeeShiftForm.
   * @returns a boolean value.
   */
  public checkIfControlValid(controlName: string): any {
    return this.tableForm.get(controlName)?.invalid &&
      this.tableForm.get(controlName)?.errors &&
      (this.tableForm.get(controlName)?.dirty || this.tableForm.get(controlName)?.touched);
  }

  /**
   * The function checks if a specific control in a form has a specific error.
   * @param {string} controlName - The name of the form control you want to check for errors.
   * @param {string} error - The "error" parameter is for check specific error
   * @returns the result of calling the `hasError` method 
   */
  public checkControlHasError(controlName: string, error: string): any {
    return this.tableForm.get(controlName)?.hasError(error)
  }
}
