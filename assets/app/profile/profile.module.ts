import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule, MatExpansionModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatTableModule, MatSlideToggleModule, MatSortModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatProgressBarModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { profileRoutes } from "./profile.routing";
import { ModifyComponent } from "./modify.component";
import { DatasetComponent } from "./datasets.component";
import { HelpComponent } from "./help.component";
import { MetaDialogueComponent } from "./meta.component";

@NgModule({
  declarations: [
    ModifyComponent,
    DatasetComponent,
    HelpComponent,
    MetaDialogueComponent
  ],
  entryComponents: [
    MetaDialogueComponent
  ],
  imports: [
    CommonModule,
    profileRoutes,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressBarModule
  ]
})

export class ProfileModule {

}
