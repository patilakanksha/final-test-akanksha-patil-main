import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Third-party Modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

// Custom Modules
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ManagerComponent } from './manager.component';
import { RouterModule } from '@angular/router';
import { BookingListComponent } from './booking-list/booking-list.component';
import { EditBookingStatusComponent } from './modals/edit-booking-status/edit-booking-status.component';

@NgModule({
  declarations: [
    ManagerComponent,
    BookingListComponent,
    EditBookingStatusComponent
  ],
  imports: [
    // CommonModule,
    // AdminRoutingModule,
    // NgxDatatableModule,
    // ReactiveFormsModule,
    // HttpClientModule,
    // FormsModule,
    // ModalModule.forRoot(),
    // ToastrModule.forRoot(),
    // SharedModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, // Make sure RouterModule is imported after FormsModule and ReactiveFormsModule
    NgxDatatableModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    ManagerRoutingModule,
    SharedModule,
  ],
})
export class ManagerModule {}
