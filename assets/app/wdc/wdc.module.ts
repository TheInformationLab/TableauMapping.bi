import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './wdc.routing';
import { WdcComponent } from "./wdc.component";
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    WdcComponent
  ],
  imports: [
    CommonModule,
    routing,
    MaterialModule
  ]
})

export class WdcModule {

}
