import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent {
  
  constructor(
    private router: Router,
  ) {}

  public GoToLogin(): void {
    this.router.navigate(['login']);
  }
}
