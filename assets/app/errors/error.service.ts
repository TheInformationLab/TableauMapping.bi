import { Injectable, EventEmitter } from '@angular/core';
import { Message } from 'primeng/primeng';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class ErrorService {
    message: Message[];
    latestMessage = new EventEmitter<Message>();

    constructor(private http: Http) {
        this.message = [];
    }

    success(detail: string, summary?: string): void {
        this.message.push({
            severity: 'success', summary: summary, detail: detail
        });
        this.latestMessage.emit({severity: 'success', summary: summary, detail: detail});
        this.recordError('success', summary, JSON.parse(localStorage.getItem('userData')), detail)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
    }

    info(detail: string, summary?: string): void {
        this.message.push({
            severity: 'info', summary: summary, detail: detail
        });
        this.latestMessage.emit({severity: 'info', summary: summary, detail: detail});
        this.recordError('info', summary, JSON.parse(localStorage.getItem('userData')), detail)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
    }

    warning(detail: string, summary?: string): void {
        this.message.push({
            severity: 'warn', summary: summary, detail: detail
        });
        this.latestMessage.emit({severity: 'warn', summary: summary, detail: detail});
        this.recordError('warn', summary, JSON.parse(localStorage.getItem('userData')), detail)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
    }

    error(detail: string, summary?: string): void {
        this.message.push({
            severity: 'error', summary: summary, detail: detail
        });
        this.latestMessage.emit({severity: 'error', summary: summary, detail: detail});
        this.recordError('error', summary, JSON.parse(localStorage.getItem('userData')), detail)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
    }

    recordError(severity, message, location, stack?) {
      const body = {
        severity: severity,
        message: message,
        stack: stack,
        location: location
      };
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('/err/record',body,{headers: headers})
        .map((response: Response) => {
          const msg = response.json().message;
          return msg;
        })
        .catch((error: Response) => Observable.throw(error))
    }
}
