import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  template: `
    <router-outlet></router-outlet>
  `
})

export class ProfileComponent {

  constructor(private profileService: ProfileService) {}

  isLoggedIn() {
    return this.profileService.isLoggedIn();
  }

}
