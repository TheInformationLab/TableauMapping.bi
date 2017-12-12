import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { User } from '../auth/user.model';
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class ProfileService {
  constructor(private http: Http, private errorService: ErrorService) {}

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}
