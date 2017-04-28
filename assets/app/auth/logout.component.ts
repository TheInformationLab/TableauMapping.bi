import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-logout',
  template: `
    <div class="col-md-8 col-md-offset-2">
    <button class="btn btn-danger" (click)="onLogout()">Logout</button>
    </div>
  `
})

export class LogoutComponent {

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
