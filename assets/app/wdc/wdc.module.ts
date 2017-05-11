import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './wdc.routing';
import { WdcComponent } from "./wdc.component";

@NgModule({
  declarations: [
    WdcComponent
  ],
  imports: [
    CommonModule,
    routing
  ]
})

export class WdcModule {

}
