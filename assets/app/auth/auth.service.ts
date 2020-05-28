import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import { User } from './user.model';
import { Password } from "./password.model";
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private errorService: ErrorService) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/auth/create', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /api/auth/create net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/auth/signin', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /api/auth/signin net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  resetPassword(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/api/auth/reset', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /api/auth/reset net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
          return Observable.throw(error.json());
        } else {
          return Observable.throw(error.json());
        }
      });
  }

  updatePassword(password: Password) {
    const body = JSON.stringify(password);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('/api/auth/reset', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        if(error.status == 0) {
          this.errorService.error("POST /api/auth/reset net::ERR_CONNECTION_REFUSED","Lost connection to TableauMapping.bi. Check your internet connection.")
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
    var token = localStorage.getItem('token');
    if (token !== "undefined") {
      return token !== null && !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }

  }

}
