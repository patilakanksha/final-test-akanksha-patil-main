import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAuthGuard } from 'src/app/shared/helper/role-auth.guard';
import { ManagerComponent } from './manager.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';

const managerRoutes: Routes = [
  {
    path: '',
    component: BookingListComponent,
    canActivate: [RoleAuthGuard],
    data: { roles: ['Manager', 'Admin'] },
    children: [
      { path: '', redirectTo: 'booking-list', pathMatch: 'full' },
      { path: 'booking-list', component: BookingListComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managerRoutes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
