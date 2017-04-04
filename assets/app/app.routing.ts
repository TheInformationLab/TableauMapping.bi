import { Routes, RouterModule } from "@angular/router"

import { UploadComponent } from "./upload/upload.component";
import { AuthComponent } from "./auth/auth.component";
import { AUTH_ROUTES } from "./auth/auth.routes";

const APP_ROUTES : Routes = [
  {path: '', component: UploadComponent, pathMatch: 'full'},
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
