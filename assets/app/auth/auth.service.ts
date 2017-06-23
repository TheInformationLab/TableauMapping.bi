import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { User } from './user.model';
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
  constructor(private http: Http, private errorService: ErrorService) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/auth/create', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /auth/create net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/auth/signin', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /auth/signin net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}
