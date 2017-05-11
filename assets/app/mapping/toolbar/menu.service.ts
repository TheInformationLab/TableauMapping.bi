import {Injectable,EventEmitter} from "@angular/core";

@Injectable()
export class MenuService {
  menuState = new EventEmitter<Boolean>();

  openMenu() {
    this.menuState.emit(true);
  }

  closeMenu() {
    this.menuState.emit(false);
  }
}
