import { ErrorHandler, Inject } from '@angular/core';
import { ErrorService } from './error.service';


export class CustomErrorHandler implements ErrorHandler {

    constructor(@Inject(ErrorService) private errorService: ErrorService) {
    }

    handleError(error: any): void {
        this.showErrorInConsole(error);
        setTimeout(() =>
            this.errorService.error(error.json().Message), 1);
    }

    private showErrorInConsole(error: any) :void {
        if (console && console.group && console.error) {
            console.group("Error Log");
            console.error(error);
            console.error(error.message);
            console.error(error.stack);
            console.groupEnd();
        }
    }
}
