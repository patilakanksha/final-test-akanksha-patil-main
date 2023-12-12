import { Component } from '@angular/core';
import { TableBookingEntity } from '../entities/table-booking-entity';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TableEntity } from '../../admin/entities/table-entity';
import { AddEditTableBookingComponent } from '../modals/add-edit-table-booking/add-edit-table-booking.component';

@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
})
export class TableBookingComponent {
  public totalCount = 0;
  public tableBooking: TableBookingEntity[] = [];
  public addEditTableModal!: BsModalRef;
  public deleteTableModal!: BsModalRef;
  public viewTableModal!: BsModalRef;
  public filter: any[] = [];
  public searchedKey: string = '';

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadBookingTables();
  }

  private loadBookingTables(): void {
    this.adminService.getbookingTables().subscribe((response: any) => {
      this.tableBooking = response;
      this.filter = [...response];
      this.totalCount = this.tableBooking.length;
    });
  }

  public openAddEditTableModal(table: TableEntity | any = null): void {
    this.addEditTableModal = this.modalService.show(
      AddEditTableBookingComponent,
      {
        initialState: { table: table },
        class: 'modal-lg',
        ignoreBackdropClick: true,
      }
    );
    this.addEditTableModal.content.close.subscribe(() => {
      this.addEditTableModal.hide();
      this.loadBookingTables();
    });
  }

  public openDeleteTableModal(table: TableEntity): void {
    this.deleteTableModal = this.modalService.show(DeleteModalComponent, {
      class: 'modal-md',
      ignoreBackdropClick: true,
    });
    this.deleteTableModal.content.close.subscribe(() => {
      this.deleteTableModal.hide();
    });
    this.deleteTableModal.content.confirmedDelete.subscribe(() => {
      this.adminService.deleteTable(table.id).subscribe(() => {
        this.toastr.success('Table deleted successfully', 'Success');
      });
      this.deleteTableModal.hide();
      this.loadBookingTables();
    });
  }

  applyFilter() {
    this.filter = this.tableBooking.filter((table) => {
      const searchTerm = this.searchedKey.toLowerCase();

      // Convert date strings to Date objects for comparison
      const startTimeDate = new Date(table.startTime);
      const endTimeDate = new Date(table.endTime);
      return (
        table.tableId.toLowerCase().includes(searchTerm) ||
        startTimeDate.toLocaleString().toLowerCase().includes(searchTerm) ||
        endTimeDate.toLocaleString().toLowerCase().includes(searchTerm) ||
        table?.status?.toLowerCase().includes(searchTerm)
      );
    });
  }

  formatDate(dateTime: string): string {
    // Implement your custom date and time formatting logic here
    // Example: Format as "MM/DD/YYYY HH:mm:ss"
    const formattedDateTime = new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return formattedDateTime;
  }
}
