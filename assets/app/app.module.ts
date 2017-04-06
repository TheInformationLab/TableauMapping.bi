import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { LayerComponent } from "./layers/layer.component";
import { LayersComponent } from "./layers/layers.component";
import { LayerListComponent } from "./layers/layer-list.component";
import { UploadComponent } from "./upload/upload.component";
import { AuthComponent } from "./auth/auth.component";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { WdcComponent } from "./wdc/wdc.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { LayerService } from "./layers/layer.service";

@NgModule({
    declarations: [
        AppComponent,
        LayerComponent,
        LayersComponent,
        LayerListComponent,
        FileSelectDirective,
        UploadComponent,
        AuthComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        WdcComponent
    ],
    providers: [AuthService,
                LayerService],
    imports: [BrowserModule,
              routing,
              HttpModule,
              ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
