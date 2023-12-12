import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './table/table.component';
import { TableBookingComponent } from '../dashboard/table-booking/table-booking.component';
import { RoleAuthGuard } from 'src/app/shared/helper/role-auth.guard';

// const routes: Routes = [
//   {
//     path: '',
//     component: AdminComponent,
//   },
//   { path: 'table', component: TableComponent, canActivate: [RoleAuthGuard], // Add this line for role-based access control
//   data: { roles: ['Admin'] },
// }];

const adminRoutes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: '', component: AdminComponent, canActivate: [RoleAuthGuard], },
    { path: 'table', component: TableComponent, canActivate: [RoleAuthGuard], data: { roles: ['Admin']}},
    // { path: '**', component: TableComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']} },
  ], canActivate: [RoleAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
