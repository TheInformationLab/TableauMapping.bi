import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'profile-help',
  templateUrl: './help.component.html',
  styles: [`
    .container {
      width: 100%;
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 148px);
      min-width: 300px;
      position: relative;
      margin-bottom: 10px;
      margin-top: 0;
      padding-right: 0;
      padding-left: 0;
    }
    .help-cards {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      padding: 20px;
      max-width: 800px;
    }
    mat-card {
      margin: 20px;
    }
    mat-card-title {
      color: rgba(0,0,0,.8);
      font-family: Roboto,"Helvetica Neue",sans-serif;
      font-size: 16px;
      font-weight: 500;
    }
    .verticalScroll {
      overflow-y: auto;
    }
    .publicSwitch {
      float: left;
      margin-right: 15px;
    }
    .expandedLine {
      line-height: 23px;
    }
    .imageRight {
      float: right;
      border: 1px solid #80808080;
      margin-left: 10px;
      margin-bottom: 10px;
    }
    @media (max-width: 900px) {
      .imageRight {
        float: unset;
        margin-top: 15px;
        margin-botttom: 15px;
      }
    }
    @media (max-width: 750px) {
      .imageRight {
        width: 100%;
      }
    }
  `]
})

export class HelpComponent {
  mapboxToken: string;
  editMeta: string;
  dsMeta: string;
  dsReady: string;
  dsPublic: string;

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth/signin/profile%2Fhelp');
      return;
    }

    this.mapboxToken = "./img/mapboxToken.gif";
    this.editMeta = "./img/editMeta.gif";
    this.dsMeta = "./img/dsMeta.png";
    this.dsReady = "./img/dsReady.png";
    this.dsPublic = "./img/dsPublic.png";
  }

}
