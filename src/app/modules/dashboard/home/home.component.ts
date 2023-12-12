import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private router: Router) { }

  /**
   * The function "navigateToList" navigates to the "/dashboard/employee-shift" route.
   */
  public navigateToList() {
    this.router.navigate(['/dashboard/employee-shift']);
  }
}
