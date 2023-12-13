import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAuthGuard } from 'src/app/shared/helper/role-auth.guard';
import { ManagerComponent } from './manager.component';
import { BookingListComponent } from './booking-list/booking-list.component';

const managerRoutes: Routes = [{
  path: '',
  component: ManagerComponent,
  children: [
    { path: '', component: ManagerComponent, canActivate: [RoleAuthGuard], },
    { path: 'booking-list', component: BookingListComponent, canActivate: [RoleAuthGuard], data: { roles: ['Manager']}},
  ], canActivate: [RoleAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(managerRoutes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
