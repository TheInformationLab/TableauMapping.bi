import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { profileRoutes } from "./profile.routing";
import { ModifyComponent } from "./modify.component";

@NgModule({
  declarations: [
    ModifyComponent
  ],
  imports: [
    CommonModule,
    profileRoutes,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule
  ]
})

export class ProfileModule {

}
