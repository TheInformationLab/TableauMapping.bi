import { Component } from '@angular/core';
import { MdToolbarModule, MdSidenavModule } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
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
    .menu-list {
      display: flex;
    }
    `]
})

export class HeaderComponent  {

}
