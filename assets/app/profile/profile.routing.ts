import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule  } from "@angular/router";

import { ModifyComponent } from "./modify.component";

const routes: Routes = [
  {path: '', redirectTo: 'modify', pathMatch: 'full'},
  {path: 'modify', component: ModifyComponent}
];

export const profileRoutes = RouterModule.forChild(routes);
