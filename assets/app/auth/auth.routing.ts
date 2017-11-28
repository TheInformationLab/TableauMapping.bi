import { Routes } from "@angular/router";

import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";
import { LogoutComponent } from "./logout.component";

export const AUTH_ROUTES : Routes = [
  {path: '', redirectTo: 'signin', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  //{path: 'signup', component: SignupComponent},
  {path: 'logout', component: LogoutComponent}
];
