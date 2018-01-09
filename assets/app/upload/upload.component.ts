import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UploadService } from "./upload.service";
import { Upload } from "./upload.model";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'shape-upload',
  templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit {
  myForm: FormGroup;

  constructor(private router: Router, private uploadService: UploadService, private authService: AuthService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth/signin/upload');
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        continent: new FormControl(null, Validators.required),
        sourceUrl: new FormControl(null, Validators.required),
        sourceDate: new FormControl(null, Validators.required),
        mapboxId: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const upload = new Upload (
      this.myForm.value.name,
      this.myForm.value.type,
      this.myForm.value.country,
      this.myForm.value.continent,
      this.myForm.value.sourceUrl,
      this.myForm.value.sourceDate,
      this.myForm.value.mapboxId
    );
    this.uploadService.save(upload)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      )
  }

}
