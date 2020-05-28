import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule  } from "@angular/router";

import { ModifyComponent } from "./modify.component";
import { DatasetComponent } from "./datasets.component";
import { HelpComponent } from "./help.component";

const routes: Routes = [
  {path: '', redirectTo: 'modify', pathMatch: 'full'},
  {path: 'modify', component: ModifyComponent},
  {path: 'datasets', component: DatasetComponent},
  {path: 'help', component: HelpComponent}
];

export const profileRoutes = RouterModule.forChild(routes);
