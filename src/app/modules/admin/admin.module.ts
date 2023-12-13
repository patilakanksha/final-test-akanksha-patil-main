import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Third-party Modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

// Custom Modules
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { AdminComponent } from './admin.component';
import { TableComponent } from './table/table.component';
import { AddEditTableComponent } from './modals/add-edit-table/add-edit-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent,
    TableComponent,
    AddEditTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    AdminRoutingModule,
    SharedModule,
  ],
})
export class AdminModule {}
