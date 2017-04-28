import { Routes, RouterModule } from "@angular/router"

import { LayersComponent } from "./layers/layers.component";
import { UploadComponent } from "./upload/upload.component";
import { WdcComponent } from "./wdc/wdc.component";
import { MapComponent } from "./mapping/map.component";
import { AuthComponent } from "./auth/auth.component";
import { AUTH_ROUTES } from "./auth/auth.routing";

const APP_ROUTES : Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'wdc', component: WdcComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'map', component: MapComponent},
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
