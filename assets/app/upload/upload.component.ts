import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = '/spatial/upload';

@Component({
  selector: 'shape-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent {
    public uploader:FileUploader;
    constructor() {
      this.uploader = new FileUploader({
        url: URL,
        authToken: localStorage.getItem('token')
      });
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log(response);
      };
    }

}
