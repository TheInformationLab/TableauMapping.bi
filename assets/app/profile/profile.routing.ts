import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule  } from "@angular/router";

import { ModifyComponent } from "./modify.component";
import { DatasetComponent } from "./datasets.component";

const routes: Routes = [
  {path: '', redirectTo: 'modify', pathMatch: 'full'},
  {path: 'modify', component: ModifyComponent},
  {path: 'datasets', component: DatasetComponent}
];

export const profileRoutes = RouterModule.forChild(routes);
