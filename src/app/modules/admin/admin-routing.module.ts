import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './table/table.component';
import { RoleAuthGuard } from 'src/app/shared/helper/role-auth.guard';
import { PageNotFoundComponent } from '../../shared/components/page-not-found/page-not-found.component';
import { NotAuthorizedComponent } from 'src/app/shared/components/not-authorized/not-authorized.component';

const adminRoutes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: '', component: AdminComponent, canActivate: [RoleAuthGuard], data: { roles: ['Admin']}},
    { path: 'table', component: TableComponent, canActivate: [RoleAuthGuard], data: { roles: ['Admin']}},
    { path: '**', component: PageNotFoundComponent },
  ], canActivate: [RoleAuthGuard]
}];


@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
