import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/shared/helper/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { EmployeeShiftComponent } from './employee/employee-shift/employee-shift.component';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { RoleAuthGuard } from 'src/app/shared/helper/role-auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './modals/edit-profile/edit-profile.component';

/* The `dashboardRoutes` constant is an array of route objects. Each route object represents a route in
the application. */
const dashboardRoutes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    { path: '', component: HomeComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']}},
    { path: 'home', component: HomeComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']}},
    // { path: 'employee-shift', component: EmployeeShiftComponent, canActivate: [RoleAuthGuard], },
    { path: 'booking', component: TableBookingComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']}},
    { path: 'profile', component: ProfileComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']}},
    // { path: 'profile/edit', component: EditProfileComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']}},
    // { path: '**', component: HomeComponent, canActivate: [RoleAuthGuard], data: { roles: ['Guest']} },
  ], canActivate: [RoleAuthGuard], data: { roles: ['Guest']}
}];

@NgModule({
  imports: [RouterModule.forRoot(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }