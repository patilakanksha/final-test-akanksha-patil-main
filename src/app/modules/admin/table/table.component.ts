import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TableEntity } from '../entities/table-entity';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { AddEditTableComponent } from '../modals/add-edit-table/add-edit-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  public totalCount = 0;
  public tables: TableEntity[] = [];
  public addEditTableModal!: BsModalRef;
  public deleteTableModal!: BsModalRef;
  public viewTableModal!: BsModalRef;
  public filter: any[] = [];
  public searchedKey: string = '';

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTables();
  }

  private loadTables(): void {
    this.adminService.getTables().subscribe((response: any) => {
      this.tables = response;
      this.filter = [...response];
      this.totalCount = this.tables.length;
    });
  }

  public openAddEditTableModal(table: TableEntity | any = null): void {
    this.addEditTableModal = this.modalService.show(AddEditTableComponent, {
      initialState: { table: table },
      class: 'modal-lg',
      ignoreBackdropClick: true,
    });
    this.addEditTableModal.content.close.subscribe(() => {
      this.addEditTableModal.hide();
      this.loadTables();
    });
  }

  public openDeleteTableModal(table: TableEntity): void {
    this.deleteTableModal = this.modalService.show(DeleteModalComponent, {
      class: 'modal-md',
      ignoreBackdropClick: true,
    });
    this.deleteTableModal.content.close.subscribe(() => {
      this.deleteTableModal.hide();
    });
    this.deleteTableModal.content.confirmedDelete.subscribe(() => {
      this.adminService.deleteTable(table.id).subscribe(
        () => {
          this.toastr.success('Table deleted successfully', 'Success');
        }
      );
      this.deleteTableModal.hide();
      this.loadTables();
    });
  }

  applyFilter() {
    this.filter = this.tables.filter((table) => {
      const searchTerm = this.searchedKey.toLowerCase();
      return (
        table.name.toLowerCase().includes(searchTerm) ||
        table.number.toString().includes(searchTerm) ||
        table.description.toLowerCase().includes(searchTerm)
      );
    });
  }
}
