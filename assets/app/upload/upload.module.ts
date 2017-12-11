import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { uploadRoutes } from "./upload.routing";
import { UploadComponent } from "./upload.component";

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    uploadRoutes,
    MatCardModule,
    MatIconModule
  ]
})

export class UploadModule {

}
