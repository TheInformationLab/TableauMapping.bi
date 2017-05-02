import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogoutComponent } from "./logout.component";
import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";

@NgModule({
  declarations: [
    LogoutComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class AuthModule {

}