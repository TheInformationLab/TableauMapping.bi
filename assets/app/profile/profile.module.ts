import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { profileRoutes } from "./profile.routing";
import { ProfileComponent } from "./profile.component";
import { ModifyComponent } from "./modify.component";

@NgModule({
  declarations: [
    ProfileComponent,
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
