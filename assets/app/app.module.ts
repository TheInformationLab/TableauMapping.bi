import "leaflet";
import "leaflet.vectorgrid";
import 'hammerjs';
//import  CustomErrorHandler from "./errors/error.class";
import  {CustomErrorHandler} from "./errors/error.class";

import { GrowlModule } from 'primeng/primeng';
import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MappingModule } from './mapping/mapping.module';
import { AuthModule } from './auth/auth.module';
import { ResponsiveModule } from 'ng2-responsive';
import { MatListModule, MatIconModule, MatToolbarModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./header/search.component";
import { SearchGroupsPipe } from './header/groups.pipe';
import { SearchSortPipe } from './header/sort.pipe';
import { HelpComponent } from "./help/help.component";
import { AuthComponent } from "./auth/auth.component";
import { ErrorComponent } from "./errors/error.component";
import { ErrorMsgComponent } from "./errors/errorMsg.component";

import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ProfileService } from "./profile/profile.service";
import { LayerService } from "./layers/layer.service";
import { UploadService } from "./upload/upload.service";
import { SearchService } from "./header/search.service";
import { ErrorService } from './errors/error.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchComponent,
        SearchGroupsPipe,
        SearchSortPipe,
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
                ProfileService,
                LayerService,
                UploadService,
                SearchService,
                ErrorService],
    imports: [BrowserModule,
              routing,
              HttpModule,
              FormsModule,
              ReactiveFormsModule,
              BrowserAnimationsModule,
              MappingModule,
              AuthModule,
              ResponsiveModule,
              MatListModule,
              MatIconModule,
              MatToolbarModule,
              MatProgressSpinnerModule,
              MatCardModule,
              MatDialogModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
