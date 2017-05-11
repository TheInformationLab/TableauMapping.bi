
/// <reference path="./typings/leaflet.vectorgrid.d.ts"/>

import "leaflet";
import "leaflet.vectorgrid";
import 'hammerjs';

import { GrowlModule } from 'primeng/primeng';
import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from "@angular/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
//import { WdcModule } from './wdc/wdc.module';
import { MappingModule } from './mapping/mapping.module';
import { AuthModule } from './auth/auth.module';
import { ResponsiveModule } from 'ng2-responsive';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LayerComponent } from "./layers/layer.component";
import { LayersComponent } from "./layers/layers.component";
import { LayerListComponent } from "./layers/layer-list.component";
import { UploadComponent } from "./upload/upload.component";
import { AuthComponent } from "./auth/auth.component";

import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { LayerService } from "./layers/layer.service";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LayerComponent,
        LayersComponent,
        LayerListComponent,
        UploadComponent,
        AuthComponent
    ],
    providers: [AuthService,
                LayerService],
    imports: [BrowserModule,
              routing,
              HttpModule,
              FormsModule,
              FileUploadModule,
              ReactiveFormsModule,
              BrowserAnimationsModule,
              MaterialModule.forRoot(),
              //WdcModule,
              MappingModule,
              AuthModule,
              ResponsiveModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
