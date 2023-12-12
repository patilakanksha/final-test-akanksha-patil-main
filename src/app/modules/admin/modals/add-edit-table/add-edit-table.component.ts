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
      name: ['', Validators.required],
      number: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required]],
    });
  }

  save() {
    if (this.tableForm.valid) {
      const saveData = this.tableForm.value as TableEntity;
      console.log(this.tableForm.value);
      this.adminService
        .addEditTable(this.tableForm.value)
        .subscribe((response: any) => {
          console.log('add edit response', response);
          if (saveData?.id) {
            this.toastr.success('Record updated successfully', 'Success');
          } else {
            this.toastr.success('Record save successfully', 'Success');
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
}
