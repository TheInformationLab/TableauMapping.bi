import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-logout',
  template: `
    <div class="col-mat-8 col-mat-offset-2">
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
