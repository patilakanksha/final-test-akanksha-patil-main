import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public userName: any = localStorage.getItem('userName');

  constructor(private router: Router,
    private toastrService: ToastrService) { }

  /**
   * The function logs out the user by removing their username from local storage, displaying a success
   * message using Toastr, and navigating to the login page.
   */
  public logout() {
    localStorage.removeItem('userName')
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    this.toastrService.success('Logout Successfully', 'Logout')
    this.router.navigate(['/login'])
  }
}
