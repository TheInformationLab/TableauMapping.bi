
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
import { MappingModule } from './mapping/mapping.module';
import { AuthModule } from './auth/auth.module';
import { ResponsiveModule } from 'ng2-responsive';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./header/search.component";
import { SearchGroupsPipe } from './header/groups.pipe';
import { UploadComponent } from "./upload/upload.component";
import { HelpComponent } from "./help/help.component";
import { AuthComponent } from "./auth/auth.component";

import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { LayerService } from "./layers/layer.service";
import { SearchService } from "./header/search.service";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        SearchGroupsPipe,
        UploadComponent,
        HelpComponent,
        AuthComponent
    ],
    providers: [AuthService,
                LayerService,
                SearchService],
    imports: [BrowserModule,
              routing,
              HttpModule,
              FormsModule,
              FileUploadModule,
              ReactiveFormsModule,
              BrowserAnimationsModule,
              MaterialModule.forRoot(),
              MappingModule,
              AuthModule,
              ResponsiveModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
