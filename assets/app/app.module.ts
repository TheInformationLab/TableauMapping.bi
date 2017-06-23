
/// <reference path="./typings/leaflet.vectorgrid.d.ts"/>

import "leaflet";
import "leaflet.vectorgrid";
import 'hammerjs';
//import  CustomErrorHandler from "./errors/error.class";
import  {CustomErrorHandler} from "./errors/error.class";

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
import { SearchSortPipe } from './header/sort.pipe';
import { UploadComponent } from "./upload/upload.component";
import { HelpComponent } from "./help/help.component";
import { AuthComponent } from "./auth/auth.component";
import { ErrorComponent } from "./errors/error.component";
import { ErrorMsgComponent } from "./errors/errorMsg.component";

import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { LayerService } from "./layers/layer.service";
import { SearchService } from "./header/search.service";
import { ErrorService } from './errors/error.service';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        SearchGroupsPipe,
        SearchSortPipe,
        UploadComponent,
        HelpComponent,
        AuthComponent,
        ErrorComponent,
        ErrorMsgComponent
    ],
    entryComponents: [
        ErrorMsgComponent
    ],
    providers: [{ provide: ErrorHandler, useClass: CustomErrorHandler },
                AuthService,
                LayerService,
                SearchService,
                ErrorService],
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
