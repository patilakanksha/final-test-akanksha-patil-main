import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TableBookingEntity } from '../../dashboard/entities/table-booking-entity';
import { EditBookingStatusComponent } from '../modals/edit-booking-status/edit-booking-status.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html'
})
export class BookingListComponent {
  public totalCount = 0;
  public bookings: TableBookingEntity[] = [];
  public addEditTableModal!: BsModalRef;
  public deleteTableModal!: BsModalRef;
  public viewTableModal!: BsModalRef;
  public filter: any[] = [];
  public searchedKey: string = '';

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
  ) {}
  
  ngOnInit() {
    const role = localStorage.getItem('role');
    if(role){
      if(role=='Admin'){
        this.router.navigate(['/admin/table']);
      } else if(role=='Guest'){
        this.router.navigate(['/dashboard']);     
      }
      else if(role=='Manager')
      {
        this.router.navigate(['/manager/booking-list']);
      }
    }
    this.loadAllBookings();
  }

  private loadAllBookings(): void {
    this.adminService.getbookingTables().subscribe((response: any) => {
      this.bookings = response;
      this.filter = [...response];
      this.totalCount = this.bookings.length;
    });
  }

  public openAddEditTableModal(booking: TableBookingEntity | any = null): void {
    this.addEditTableModal = this.modalService.show(EditBookingStatusComponent, {
      initialState: { booking: booking },
      class: 'modal-lg',
      ignoreBackdropClick: true,
    });
    this.addEditTableModal.content.close.subscribe(() => {
      this.addEditTableModal.hide();
      this.loadAllBookings();
    });
  }
  
  applyFilter() {
    this.filter = this.bookings.filter((booking) => {
      const searchTerm = this.searchedKey.toLowerCase();
      return (
        booking.status.toLowerCase().includes(searchTerm) ||
        booking.startTime.toString().includes(searchTerm) ||
        booking.endTime.toLowerCase().includes(searchTerm)
      );
    });
  }
}
