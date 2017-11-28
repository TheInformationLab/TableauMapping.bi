import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  template: `
  <div class="container" style="margin-top:100px;">
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
