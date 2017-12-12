import { Routes, RouterModule } from "@angular/router"

import { UploadComponent } from "./upload/upload.component";
import { MapComponent } from "./mapping/map.component";
import { HelpComponent } from "./help/help.component";

const APP_ROUTES : Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'wdc', loadChildren: './wdc/wdc.module#WdcModule' },
  {path: 'wdc-legacy', loadChildren: './wdc-legacy/wdc.module#WdcLegacyModule' },
  {path: 'help', component: HelpComponent},
  {path: 'upload', loadChildren: './upload/upload.module#UploadModule'},
  {path: 'map', component: MapComponent},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
