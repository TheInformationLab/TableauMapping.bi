
/// <reference path="./typings/leaflet.vectorgrid.d.ts"/>

import "leaflet";
import "leaflet.vectorgrid";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from "@angular/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdMenuModule, MdIconModule} from '@angular/material';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LayerComponent } from "./layers/layer.component";
import { LayersComponent } from "./layers/layers.component";
import { LayerListComponent } from "./layers/layer-list.component";
import { UploadComponent } from "./upload/upload.component";
import { AuthComponent } from "./auth/auth.component";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { WdcComponent } from "./wdc/wdc.component";
import { MapComponent } from "./mapping/map.component";
import { NavigatorComponent } from "./mapping/navigator/navigator.component";
import { MenuComponent } from "./mapping/toolbar/menu.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { LayerService } from "./layers/layer.service";
import { MapService } from "./mapping/mapping.service";
import { GeocodingService } from "./mapping/geocoding.service";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LayerComponent,
        LayersComponent,
        LayerListComponent,
        FileSelectDirective,
        UploadComponent,
        AuthComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        WdcComponent,
        MapComponent,
        NavigatorComponent,
        MenuComponent
    ],
    providers: [AuthService,
                LayerService,
                MapService,
                GeocodingService],
    imports: [BrowserModule,
              routing,
              HttpModule,
              FormsModule,
              ReactiveFormsModule,
              BrowserAnimationsModule,
              MdMenuModule,
              MdIconModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
