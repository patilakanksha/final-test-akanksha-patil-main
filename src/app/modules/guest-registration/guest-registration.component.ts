import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { UserProfileEntity } from '../dashboard/entities/profile-entity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guest-registration',
  templateUrl: './guest-registration.component.html',
})
export class GuestRegistrationComponent {
  registrationForm: FormGroup;
  passwordErrorMessages: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService,
    private toastr: ToastrService) {
    this.registrationForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z]+$/)
      ]],
      lastName: ['',
        [Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z]+$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$')
      ]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required, this.matchPasswords.bind(this)]],
    });
  }

  // Custom validator function to check if password and confirm password match
  private matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.registrationForm?.get('password')?.value;
    const confirmPassword = control.value;

    // Check if passwords match
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  } 

  private passwordStrengthValidator(): ValidatorFn {
    debugger;
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';

      this.passwordErrorMessages = [];
      // Check if the password contains at least one uppercase letter
      const uppercaseRegex = /[A-Z]/;
      if (!uppercaseRegex.test(value)) {
        return { uppercase: true };
      }

      // Check if the password contains at least one lowercase letter
      const lowercaseRegex = /[a-z]/;
      if (!lowercaseRegex.test(value)) {
        this.passwordErrorMessages.push('Password should contain at least one uppercase letter.')
      }

      // Check if the password contains at least one special symbol
      const specialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialSymbolRegex.test(value)) {
        this.passwordErrorMessages.push('Password should contain at least one special Symbol.')
      }

      // Check if the password contains at least one number
      const numberRegex = /[0-9]/;
      if (!numberRegex.test(value)) {
        this.passwordErrorMessages.push('Password should contain at least one number.')
      }

      // If all criteria are met, return null (no errors)
      return null;
    };
  }

  ngOnInit(): void { }

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
    this.accountService.registerUser(payload).subscribe((response: any) => {
      console.log("Response of register user", response);
        if(response?.status){
          this.toastr.success(response?.status, 'Success')
          this.router.navigate(['login']);
        }
        // this.onClose();
      }, (error:{status:string}) => {
        if(error?.status){
          this.toastr.error(error?.status,  'Error')
        }
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

  /**
   * The function checks if a form control is invalid and has been interacted with by the user.
   * @param {string} controlName - The controlName parameter is a string. It is form control in the employeeShiftForm.
   * @returns a boolean value.
   */
  public checkIfControlValid(controlName: string): any {
    return this.registrationForm.get(controlName)?.invalid &&
      this.registrationForm.get(controlName)?.errors &&
      (this.registrationForm.get(controlName)?.dirty || this.registrationForm.get(controlName)?.touched);
  }

  /**
   * The function checks if a specific control in a form has a specific error.
   * @param {string} controlName - The name of the form control you want to check for errors.
   * @param {string} error - The "error" parameter is for check specific error
   * @returns the result of calling the `hasError` method 
   */
  public checkControlHasError(controlName: string, error: string): any {
    return this.registrationForm.get(controlName)?.hasError(error)
  }


}

