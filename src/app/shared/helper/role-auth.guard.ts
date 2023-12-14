import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, NavigationEnd } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RoleAuthGuard implements CanActivate {
  private lastVisitedRoute: string = '/';
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService
  ) {
    // Subscribe to router events to track the last visited route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.lastVisitedRoute = event.url;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    debugger;
    const token = localStorage.getItem("access_token");

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      // Store the last visited route before redirecting to login
      this.authService.setLastVisitedRoute(this.lastVisitedRoute);

      this.authService.refereshToken();
      return false;
    }

    const userRoles = this.authService.getUserRoles();
    const requiredRoles = route?.data['roles'] as string[];
    debugger
    if (!requiredRoles.includes(userRoles)) {
      this.toastrService.error(
        'You do not have the necessary permissions to access this page. ' +
        'If you believe this is an error, please contact the administrator.',
        'Unauthorized Access'
      );
      // Navigate to the last visited route
      this.router.navigate([this.lastVisitedRoute]);
      return false;
    }

    return true;
  }

  private checkRoleAuthorization(userRoles: string, requiredRoles: string[]): boolean {
    debugger
    return requiredRoles.every(role => userRoles);
  }
}