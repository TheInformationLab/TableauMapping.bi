import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  template: `
  <div class="container" style="margin-top:100px;">
    <router-outlet></router-outlet>
  </div>
  `
})

export class ProfileComponent {

  constructor(private profileService: ProfileService) {}

  isLoggedIn() {
    return this.profileService.isLoggedIn();
  }

}
