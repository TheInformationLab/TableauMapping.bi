import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-logout',
  template: ''
})

export class LogoutComponent {

  constructor(private router: Router, private authService: AuthService) {
    this.authService.logout();
    this.router.navigateByUrl('/auth/signin');
  }
}
