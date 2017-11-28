import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MapComponent } from "./map.component";
import { NavigatorComponent } from "./navigator/navigator.component";
import { MenuComponent } from "./toolbar/menu.component";
import { IntroComponent } from "./intro/intro.component";
import { MenuItemComponent } from "./toolbar/menuItem.component";
import { InfoComponent } from "./info/info.component";
import { InfoContentComponent } from "./info/infoContent.component";
import { MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatListModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuGroupsPipe } from './toolbar/groups.pipe';
import { MenuSortPipe } from './toolbar/sort.pipe';
import { routing } from "./mapping.routing";

import { MapService } from "./mapping.service";
import { GeocodingService } from "./geocoding.service";
import { MenuService } from "./toolbar/menu.service";
import { IntroService } from "./intro/intro.service";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

@NgModule({
  declarations: [
    MapComponent,
    NavigatorComponent,
    MenuComponent,
    MenuItemComponent,
    InfoComponent,
    InfoContentComponent,
    MenuGroupsPipe,
    MenuSortPipe,
    IntroComponent
  ],
  entryComponents: [
    IntroComponent,
    InfoContentComponent
  ],
  providers: [
    MapService,
    GeocodingService,
    MenuService,
    IntroService
  ],
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    BootstrapModalModule
  ]
})

export class MappingModule {

}
