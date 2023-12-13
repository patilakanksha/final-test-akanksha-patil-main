import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableBookingComponent } from '../dashboard/table-booking/table-booking.component';
import { RoleAuthGuard } from 'src/app/shared/helper/role-auth.guard';
import { ManagerComponent } from './manager.component';
import { BookingListComponent } from './booking-list/booking-list.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: AdminComponent,
//   },
//   { path: 'table', component: TableComponent, canActivate: [RoleAuthGuard], // Add this line for role-based access control
//   data: { roles: ['Admin'] },
// }];

const managerRoutes: Routes = [{
  path: '',
  component: ManagerComponent,
  children: [
    { path: '', component: ManagerComponent, canActivate: [RoleAuthGuard], },
    { path: 'booking-list', component: BookingListComponent, canActivate: [RoleAuthGuard], data: { roles: ['Manager']}},
    // { path: '**', component: TableComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']} },
  ], canActivate: [RoleAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(managerRoutes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
