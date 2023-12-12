import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RoleAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    debugger
    const token = localStorage.getItem("access_token");
     //Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const userRoles = this.authService.getUserRoles();
      const requiredRoles = route?.data['roles'] as string[];

      if (this.checkRoleAuthorization(userRoles?userRoles:'', requiredRoles)) {
        return true;
      } else {
        this.toastrService.error('Unauthorized access', 'Error');
        this.router.navigate(['/not-authorized']);
        return false;
      }
    } else {
        debugger
        this.authService.refereshToken();
        this.toastrService.error('Session expired. Please log in again.', 'Error');
        this.authService.logoutUser();
        return false;
    }
  }

  private checkRoleAuthorization(userRoles: string, requiredRoles: string[]): boolean {
    debugger
    return requiredRoles.every(role => userRoles);
  }
}