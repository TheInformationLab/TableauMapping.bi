import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/Rx';

import { User } from '../auth/user.model';
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class ProfileService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private errorService: ErrorService) {}

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    var token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getProfile() {
    var token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

}
