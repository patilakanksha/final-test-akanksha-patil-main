import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAuthGuard } from 'src/app/shared/helper/role-auth.guard';
import { ManagerComponent } from './manager.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';

const managerRoutes: Routes = [{
  path: '',
  component: ManagerComponent,
  children: [
    { path: '', component: ManagerComponent, canActivate: [RoleAuthGuard], data: { roles: ['Manager']}},
    { path: 'booking-list', component: BookingListComponent, canActivate: [RoleAuthGuard], data: { roles: ['Manager']}},
    { path: '**', component: PageNotFoundComponent },
  ], canActivate: [RoleAuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(managerRoutes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
