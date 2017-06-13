import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';

import { Observable } from "rxjs";

@Injectable()
export class SearchService {
  constructor(private http: Http) {}

  searchIndex(term: String) {
    const body = JSON.stringify({term: term});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/search/index', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
