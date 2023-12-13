import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Components
import { HomeComponent } from './home/home.component';
import { EmployeeShiftComponent } from './employee/employee-shift/employee-shift.component';
import { AddEditBookingComponent } from './employee/add-edit-booking/add-edit-booking.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

// Routing Module
import { DashboardRoutingModule } from './dashboard-routing.module';

// Shared Module
import { SharedModule } from 'src/app/shared/shared.module';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { AddEditTableBookingComponent } from './modals/add-edit-table-booking/add-edit-table-booking.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './modals/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    EmployeeShiftComponent,
    AddEditBookingComponent,
    ViewEmployeeComponent,
    TableBookingComponent,
    AddEditTableBookingComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, // Make sure RouterModule is imported after FormsModule and ReactiveFormsModule
    NgxDatatableModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    DashboardRoutingModule,
    SharedModule,
  ],
  // exports: [RouterModule], // Exporting RouterModule might not be necessary, but I've included it based on your original code
})
export class DashboardModule {}
