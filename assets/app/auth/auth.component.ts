import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  template: `
    <header class="row spacing" style="margin-top:100px;">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
          <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
          <li routerLinkActive="active"><a [routerLink]="['signup']" *ngIf="!isLoggedIn()">Signup</a></li>
          <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
        </ul>
      </nav>
    </header>
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div>
  `
})

export class AuthComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
