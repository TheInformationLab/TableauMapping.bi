import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = '/upload';

@Component({
  selector: 'shape-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent {
    public uploader:FileUploader = new FileUploader({url:'/upload'});
}
