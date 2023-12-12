import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(
    private authService: AuthService,
    private route: Router,
    private jwtHelper: JwtHelperService
  ) { }

  /**
   * The canActivate function checks if the user is logged in and redirects to the login page if not.
   * @returns The canActivate() function is returning a boolean value. If the user is logged in
   */
  canActivate() {
    debugger
     //get the jwt token which are present in the local storage
     const token = localStorage.getItem("access_token");
     //Check if the token is expired or not and if token is expired then redirect to login page and return false
     if (token && !this.jwtHelper.isTokenExpired(token)) {
       return true;
     }
     else {
       this.authService.refereshToken();
       this.route.navigate(['/login']);
       return false;
     }
  }
}