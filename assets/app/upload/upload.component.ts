import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormControl, Validators } from "@angular/forms";

const URL = '/spatial/upload';

@Component({
  selector: 'shape-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit {
  myForm: FormGroup;
  public uploader:FileUploader;

  constructor() {
    this.uploader = new FileUploader({
      url: URL,
      authToken: localStorage.getItem('token')
    });
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      this.uploader.options.additionalParameter = {
        name: this.myForm.value.name,
        type: this.myForm.value.type,
        country: this.myForm.value.country,
        continent: this.myForm.value.continent,
        sourceUrl: this.myForm.value.sourceUrl,
        sourceDate: this.myForm.value.sourceDate
      };
    };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      //console.log(response);
    };
  }

  ngOnInit() {
    this.myForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        continent: new FormControl(null, Validators.required),
        sourceUrl: new FormControl(null, Validators.required),
        sourceDate: new FormControl(null, Validators.required)
    });
  }

}
