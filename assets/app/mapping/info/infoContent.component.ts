import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'infoContent',
  templateUrl: './infoContent.component.html',
  styles: [`
    .subheader {
      font-size: 10pt !important;
      color: #757575;
      font-weight: 100 !important;
    }
    .infoValue {
      font-size: 14pt !important;
      font-weight: 200 !important;
    }
    .header {
      padding-bottom: 5px !important;
    }
    mat-list-item.mat-list-item-content {
      height: 48px !important;
    }
    .divider {
      margin-top: 5px;
    }
  `]
})
export class InfoContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  strftime(sFormat, date) {
    if (!(date instanceof Date)) date = new Date();
    var nDay = date.getDay(),
      nDate = date.getDate(),
      nMonth = date.getMonth(),
      nYear = date.getFullYear(),
      nHour = date.getHours(),
      aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
      isLeapYear = function() {
        return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
      },
      getThursday = function() {
        var target = new Date(date);
        target.setDate(nDate - ((nDay+6)%7) + 3);
        return target;
      },
      zeroPad = function(nNum, nPad) {
        return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
      };
    return sFormat.replace(/%[a-z]/gi, function(sMatch) {
      return {
        '%a': aDays[nDay].slice(0,3),
        '%A': aDays[nDay],
        '%b': aMonths[nMonth].slice(0,3),
        '%B': aMonths[nMonth],
        '%c': date.toUTCString(),
        '%C': Math.floor(nYear/100),
        '%d': zeroPad(nDate, 2),
        '%e': nDate,
        '%F': date.toISOString().slice(0,10),
        '%G': getThursday().getFullYear(),
        '%g': ('' + getThursday().getFullYear()).slice(2),
        '%H': zeroPad(nHour, 2),
        '%I': zeroPad((nHour+11)%12 + 1, 2),
        '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
        '%k': '' + nHour,
        '%l': (nHour+11)%12 + 1,
        '%m': zeroPad(nMonth + 1, 2),
        '%M': zeroPad(date.getMinutes(), 2),
        '%p': (nHour<12) ? 'AM' : 'PM',
        '%P': (nHour<12) ? 'am' : 'pm',
        '%s': Math.round(date.getTime()/1000),
        '%S': zeroPad(date.getSeconds(), 2),
        '%u': nDay || 7,
        '%w': '' + nDay,
        '%x': date.toLocaleDateString(),
        '%X': date.toLocaleTimeString(),
        '%y': ('' + nYear).slice(2),
        '%Y': nYear,
        '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
        '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
      }[sMatch] || sMatch;
    });
  }
}
