import { Component, OnInit  } from '@angular/core';

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
      color: #fff;
    }
    `]
})

export class HeaderComponent implements OnInit {

  ngOnInit() {
  }

}
