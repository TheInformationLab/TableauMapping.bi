import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
  <div class="profile">
    <mat-sidenav-container class="nav-container">
        <mat-sidenav #sidenav mode="side" opened="true" class="sidenav">
        <nav class="" style="">
          <h3>Menu</h3>
          <ul>
            <li>
              <a [routerLink]="['modify']">
                Modify Profile
              </a>
            </li>
            <li>
              <a [routerLink]="['datasets']">
                Datasets
              </a>
            </li>
            <li>
              <a [routerLink]="['help']">
                Help
              </a>
            </li>
            <li>
              <a [routerLink]="['../auth/logout']">
                Logout
              </a>
            </li>
          </ul>
        </nav>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    mat-sidenav-content {
      overflow-x: auto;
    }

    .profile-header {
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    }

    .nav-container {
      position: sticky;
      left: 0;
      right: 0;
      min-height: calc(100vh - 64px);
      max-height: calc(100vh - 64px);
    }

    .sidenav {
      display: flex;
      width: 200px;
      min-height: calc(100vh - 64px - 64px - 64px);
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    }

    .profile-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }

    nav {
      width: 100%;
    }

    .sidenav h3 {
      border: none;
      font-size: 10px;
      letter-spacing: 1px;
      line-height: 24px;
      text-transform: uppercase;
      font-weight: 400;
      margin: 0;
      padding: 0 16px;
      background: rgba(0,0,0,.32);
      color: hsla(0,0%,100%,.87);
    }

    .sidenav ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    .sidenav li {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      margin: 0;
      padding: 0;
      border-color: rgba(0,0,0,.06);
      color: rgba(0,0,0,.54);
    }

    .sidenav li>a {
      box-sizing: border-box;
      display: block;
      font-size: 14px;
      font-weight: 400;
      line-height: 47px;
      text-decoration: none;
      transition: all .3s;
      padding: 0 16px;
      position: relative;
    }

  `]
})

export class ProfileComponent {

  constructor() {}

}
