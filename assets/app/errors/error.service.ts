import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';

@Injectable()
export class ErrorService {
    message: Message[];

    constructor() {
        this.message = [];
    }

    success(detail: string, summary?: string): void {
        this.message.push({
            severity: 'success', summary: summary, detail: detail
        });
    }

    info(detail: string, summary?: string): void {
        this.message.push({
            severity: 'info', summary: summary, detail: detail
        });
    }

    warning(detail: string, summary?: string): void {
        this.message.push({
            severity: 'warn', summary: summary, detail: detail
        });
    }

    error(detail: string, summary?: string): void {
        this.message.push({
            severity: 'error', summary: summary, detail: detail
        });
    }
}
