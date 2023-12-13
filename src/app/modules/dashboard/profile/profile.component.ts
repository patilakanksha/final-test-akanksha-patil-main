import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ProfileEntity, UserProfileEntity } from '../entities/profile-entity';
import { EditProfileComponent } from '../modals/edit-profile/edit-profile.component';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public loggedInProfile: UserProfileEntity;
  public loggedInUserId:string|null = localStorage.getItem('userId');
  public editProfileModal!: BsModalRef;
  public deleteProfileModal!: BsModalRef;
  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadLoggedInProfile();
  }

  private loadLoggedInProfile(): void {
    this.adminService.getUser().subscribe((response: any) => {
      console.log("Response of LoggedIn User",response);
      this.loggedInProfile = response; 
      
    });
  }
  
  public openUpdateProfileModal(): void {
    debugger
    this.editProfileModal = this.modalService.show(
      EditProfileComponent,
      {
        initialState: { profile: this.loggedInProfile },
        class: 'modal-lg',
        ignoreBackdropClick: true,
      }
    );
    this.editProfileModal.content.close.subscribe(() => {
      this.editProfileModal.hide();
      this.loadLoggedInProfile();
    });
  }

  public openDeleteTableModal(profile: ProfileEntity): void {
    this.deleteProfileModal = this.modalService.show(DeleteModalComponent, {
      class: 'modal-md',
      ignoreBackdropClick: true,
    });
    this.deleteProfileModal.content.close.subscribe(() => {
      this.deleteProfileModal.hide();
    });

    console.log("delete:", profile);
    // this.deleteProfileModal.content.confirmedDelete.subscribe(() => {
    //   this.adminService.deleteBookingTable(profile?.userId).subscribe(() => {
    //     this.toastr.success('Table deleted successfully', 'Success');
    //   });
    //   this.deleteProfileModal.hide();
    //   this.loadLoggedInProfile();
    // });
  }
}
