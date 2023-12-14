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
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';

/* The `dashboardRoutes` constant is an array of route objects. Each route object represents a route in
the application. */

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleAuthGuard],
    data: { roles: ['Guest', 'Admin'] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'booking', component: TableBookingComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }