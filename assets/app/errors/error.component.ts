import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import { ErrorService } from './error.service';
import { Message } from 'primeng/primeng';

import { ErrorMsgComponent } from './errorMsg.component';

@Component({
  selector: 'errorMsg',
  template: ``
})
export class ErrorComponent implements OnInit {
  previousMessage: Message;

  constructor(public dialog: MdDialog, private errorService: ErrorService) {
  }

  ngOnInit() {
    console.log("Error Component Init");
    this.errorService.latestMessage.subscribe(
        (newMsg: Message) => {
          if (!this.previousMessage || newMsg.summary != this.previousMessage.summary) {
            let dialogRef = this.dialog.open(ErrorMsgComponent, {
              data: newMsg,
              height: '500px',
              width: '800px',
            });
            this.previousMessage = newMsg;
          }
        }
    );
  }

}
