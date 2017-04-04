import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { UploadComponent } from "./upload/upload.component";
import { AuthComponent } from "./auth/auth.component";
import { LogoutComponent } from "./auth/logout.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        FileSelectDirective,
        UploadComponent,
        AuthComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent
    ],
    providers: [AuthService],
    imports: [BrowserModule,
              routing,
              HttpModule,
              ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
