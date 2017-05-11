import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MapComponent } from "./map.component";
import { NavigatorComponent } from "./navigator/navigator.component";
import { MenuComponent } from "./toolbar/menu.component";
import { MenuItemComponent } from "./toolbar/menuItem.component";
import { MaterialModule } from '@angular/material';
import { MdMenuModule, MdIconModule, MdProgressSpinnerModule } from '@angular/material';
import { MenuGroupsPipe } from './toolbar/groups.pipe';

import { MapService } from "./mapping.service";
import { GeocodingService } from "./geocoding.service";
import { MenuService } from "./toolbar/menu.service";

@NgModule({
  declarations: [
    MapComponent,
    NavigatorComponent,
    MenuComponent,
    MenuItemComponent,
    MenuGroupsPipe
  ],
  providers: [
    MapService,
    GeocodingService,
    MenuService
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MdMenuModule,
    MdIconModule,
    MdProgressSpinnerModule,
  ]
})

export class MappingModule {

}
