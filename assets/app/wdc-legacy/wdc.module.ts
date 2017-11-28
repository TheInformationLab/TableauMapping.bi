import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';
import { wdcRouter } from './wdc.routing';
import { WdcComponent } from "./wdc.component";

@NgModule({
  declarations: [
    WdcComponent
  ],
  imports: [
    CommonModule,
    wdcRouter,
    MatCardModule,
    MatIconModule
  ]
})

export class WdcLegacyModule {

}
