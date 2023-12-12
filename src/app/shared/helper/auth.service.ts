import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor( private toastrService: ToastrService,
    private accountService: AccountService,
    private router: Router) { }

  /**
   * The isLoggedIn function checks if a user is logged in by checking if the 'userName' item is
   * present in the localStorage.
   * @returns The function `isLoggedIn()` returns a boolean value.
   */
  isLoggedIn() {
    return localStorage.getItem('userName') != null;
  }

  /**
   * The function checks if the user is logged out by checking if the 'userName' key is present in the
   * localStorage.
   */
  isLogOut() {
    (localStorage.getItem('userName') === null) ? true : false
  }

  public refereshToken(): void{
    let payload = {
      accessToken: localStorage.getItem("access_token"),
      refreshToken: localStorage.getItem("refresh_token")
    }

    this.accountService.refresh(payload).pipe(
      take(1),
    ).subscribe((response: any) =>{
      localStorage.setItem("access_token", response.accessToken);
      localStorage.setItem("refresh_token", response.refreshToken);
      this.router.navigate(['/dashboard']);
    }, (error: any) =>{
      localStorage.removeItem("userName");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.toastrService.error('Invalid Username or Password', 'Error');
    })
}

  getUserRoles(){
    return localStorage.getItem('role');
  }
  logoutUser(){
    localStorage.removeItem('userName');
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
    this.toastrService.success('Logout Successfully', 'Logout')
    this.router.navigate(['/login'])
  }
}