import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TableBookingEntity } from 'src/app/modules/dashboard/entities/table-booking-entity';

@Component({
  selector: 'app-edit-booking-status',
  templateUrl: './edit-booking-status.component.html',
})
export class EditBookingStatusComponent {
  @Input() booking: TableBookingEntity| any;
  @Output() close = new EventEmitter();
  UpdateBokingStatusForm!: FormGroup;
  public isEdit: boolean = true;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    if (this.booking) {
      this.isEdit = true;
      this.UpdateBokingStatusForm.reset(this.booking);
    }
  }

  private initializeForm() {
    this.UpdateBokingStatusForm = this.fb.group({
      id: [this.booking.id],
      tableId: [this.booking.tableId],
      startTime: [this.booking.startTime],
      endTime: [this.booking.endTime],
      userId: [this.booking.userId],
      status: [this.booking.status, [Validators.required]],
    });
  }

  save() {
    if (this.UpdateBokingStatusForm.valid) {
      const saveData = this.UpdateBokingStatusForm.value as TableBookingEntity;
      console.log(this.UpdateBokingStatusForm.value);
      this.adminService
        .editBookingStatus(this.UpdateBokingStatusForm.value)
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
      Object.values(this.UpdateBokingStatusForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  public onClose(): void {
    this.close.emit();
  }
}

