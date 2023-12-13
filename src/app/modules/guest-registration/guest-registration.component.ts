import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { UserProfileEntity } from '../dashboard/entities/profile-entity';

@Component({
  selector: 'app-guest-registration',
  templateUrl: './guest-registration.component.html',
})
export class GuestRegistrationComponent {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,  private accountService: AccountService,) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    debugger;
    // Handle form submission here
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      let payload: any = this.assignValueToModel();
      console.log(payload);
      this.userRegistration(payload);
      // Add your logic to send data to the server or perform other actions
    } else {
      // Mark all controls as touched
      this.markFormGroupTouched(this.registrationForm);
    }


    
  }

  public userRegistration(payload: any): void {
    this.accountService.registerUser(payload).subscribe((response:any) => {
      console.log("Response of register user", response);
    //   if(data?.status){
    //     this.toastr.success(data?.status, 'Success')
    //   }
    //   this.onClose();
    // }, (error:{status:string}) => {
    //   if(error?.status){
    //     this.toastr.error(error?.status,  'Error')
    //   }
     }
    )
  }


  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  private assignValueToModel(): any {
    let user = {
      'firstName': this.registrationForm.get('firstName')?.value,
      'lastName': this.registrationForm.get('lastName')?.value,
      'gender': this.registrationForm.get('gender')?.value,
      'phone': this.registrationForm.get('phone')?.value,
      'password': this.registrationForm.get('password')?.value,
      'email': this.registrationForm.get('email')?.value,
    };
    return user;
  }
}
