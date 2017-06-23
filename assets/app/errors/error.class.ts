import {ErrorHandler, Injectable} from '@angular/core'
import { ErrorService } from './error.service';

//@Injectable()
//export default class CustomErrorHandler extends ErrorHandler {
export class CustomErrorHandler extends ErrorHandler {

  constructor(private errorService: ErrorService) {
    // We rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    super(true);
  }

  handleError(error: any): void {
      this.showErrorInConsole(error);
      this.errorService.error(error.stack, error.message);
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
