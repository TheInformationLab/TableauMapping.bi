import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WdcComponent } from './wdc.component';

const routes: Routes = [
  { path: '', component: WdcComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
