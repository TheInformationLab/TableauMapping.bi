import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MapComponent } from "./map.component";
import { NavigatorComponent } from "./navigator/navigator.component";
import { MenuComponent } from "./toolbar/menu.component";
import { IntroComponent } from "./intro/intro.component";
import { MenuItemComponent } from "./toolbar/menuItem.component";
import { InfoComponent } from "./info/info.component";
import { InfoContentComponent } from "./info/infoContent.component";
import { MaterialModule } from '@angular/material';
import { MdMenuModule, MdIconModule, MdProgressSpinnerModule } from '@angular/material';
import { MenuGroupsPipe } from './toolbar/groups.pipe';
import { MenuSortPipe } from './toolbar/sort.pipe';
import { routing } from "../app.routing";

import { MapService } from "./mapping.service";
import { GeocodingService } from "./geocoding.service";
import { MenuService } from "./toolbar/menu.service";

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
    MenuService
  ],
  imports: [
    CommonModule,
    routing,
    FormsModule,
    MaterialModule,
    MdMenuModule,
    MdIconModule,
    MdProgressSpinnerModule,
    BootstrapModalModule
  ]
})

export class MappingModule {

}
