import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from "./app.component";
import { UploadComponent } from "./upload/upload.component"

@NgModule({
    declarations: [
        AppComponent,
        FileSelectDirective,
        UploadComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
