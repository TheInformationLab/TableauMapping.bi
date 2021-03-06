import { Routes, RouterModule } from "@angular/router"

import { MapComponent } from "./mapping/map.component";
import { HelpComponent } from "./help/help.component";
import { ProfileComponent } from "./profile/profile.component";

const APP_ROUTES : Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: 'wdc', loadChildren: './wdc/wdc.module#WdcModule' },
  {path: 'help', component: HelpComponent},
  {path: 'upload', loadChildren: './upload/upload.module#UploadModule'},
  {path: 'map', component: MapComponent},
  {path: 'map/:id', component: MapComponent},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {path: 'profile', component: ProfileComponent, loadChildren: './profile/profile.module#ProfileModule' },
  {path: '**', redirectTo: '/map'}
];

export const routing = RouterModule.forRoot(APP_ROUTES, { enableTracing: false });
