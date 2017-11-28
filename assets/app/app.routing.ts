import { Routes, RouterModule } from "@angular/router"

import { UploadComponent } from "./upload/upload.component";
import { MapComponent } from "./mapping/map.component";
import { AuthComponent } from "./auth/auth.component";
import { HelpComponent } from "./help/help.component";
import { AUTH_ROUTES } from "./auth/auth.routing";

const APP_ROUTES : Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'wdc', loadChildren: './wdc/wdc.module#WdcModule' },
  {path: 'wdc-legacy', loadChildren: './wdc-legacy/wdc.module#WdcLegacyModule' },
  {path: 'help', component: HelpComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'map', component: MapComponent},
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
