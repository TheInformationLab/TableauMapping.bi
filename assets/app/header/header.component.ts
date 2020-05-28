import { Component } from '@angular/core';
import { MatToolbarModule, MatSidenavModule } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    .full-title {
      display: none;
    }
    .compact-title {
      display: unset;
      font-size: 16px;
      line-height: 18px;
    }
    @media (min-width: 850px) {
      .full-title {
        display: unset;
      }
      .compact-title {
        display: none;
      }
    }
    .navbar {
      background: #337ab7;
      color: #fff;
      margin: 0px;
      padding-right: 10px;
    }
    a {
      color: rgba(255,255,255,.87);
    }
    .example-spacer {
      flex: 1 1 auto;
    }
    .menu-icons {
      display: none;
    }
    @media (min-width: 850px) {
      .menu-icons {
        display: flex;
      }
    }
    .compact-menu {
      background-color: rgba(0,0,0,0);
      border: 0;
    }
    .compact-item a {
      color: rgba(0,0,0,.87);
    }
    .compact-item a:hover {
      text-decoration: none;
    }
    .compact-item .mat-icon {
      padding-top: 0;
    }
    @media (min-width: 850px) {
      .compact-menu {
        display: none;
      }
    }

    .menu-icons
    .mat-toolbar {
      background: #337ab7;
    }
    .mat-icon {
      padding-top: 10px;
    }
    search {
      width: 60%;
    }
    @media (min-width: 850px) {
      search {
        width: 40%;
        max-width: 600px;
      }
    }

    `]
})

export class HeaderComponent  {

}
