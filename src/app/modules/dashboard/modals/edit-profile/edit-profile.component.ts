import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ProfileEntity, UserProfileEntity } from '../../entities/profile-entity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  @Output() close = new EventEmitter();
  @Input() profile: UserProfileEntity;
  updateProfileForm!: FormGroup;
  // public loggedInProfile: UserProfileEntity;
  // public loggedInUserId:string|null = localStorage.getItem('userId');
  // updateProfileModal: any;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // this.loadLoggedInProfile();
    this.initializeForm();
  }

  private initializeForm() {
    console.log("editPRofile:", this.profile)
    this.updateProfileForm! = this.fb.group({
      id: [this.profile.id],
      firstName: [this.profile.firstName, Validators.required],
      lastName: [this.profile.lastName, [Validators.required]],
      gender: [this.profile.gender, [Validators.required]],
      email: [this.profile.email, [Validators.required, Validators.email]],
      phone: [this.profile.phone, Validators.required],
      password: [this.profile.password],
      role: [this.profile.role]
    });
  }

  // private loadLoggedInProfile(): void {
  //   this.adminService.getUser().subscribe((response: any) => {
  //     console.log("Response of LoggedIn User",response);
  //     this.loggedInProfile = response; 
  //     console.log(this.loggedInProfile);
  //     console.log("Response of LoggedIn User",this.loggedInProfile);
  //   });
  // }

  
  save() {
    debugger;
    if (this.updateProfileForm.valid) {
      const saveData = this.updateProfileForm.value as ProfileEntity;
      console.log("update data", this.updateProfileForm.value);
      console.log("update data", saveData);
      this.adminService
        .addEditUser(saveData)
        .subscribe((response: any) => {
          console.log('add edit response', response);
          if (saveData?.id) {
            this.toastr.success('Record updated successfully', 'Success');
          } else {
            this.toastr.success('Record save successfully', 'Success');
          }
          this.onClose();
        });
    } else {
      Object.values(this.updateProfileForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  public onClose(): void {
    this.close.emit();
  }
}
