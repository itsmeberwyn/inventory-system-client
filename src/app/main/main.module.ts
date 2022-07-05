import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing.module';
import { MaterialModule } from '../modules/material.modules';

import { HomeComponent as inventoryHomeComponent } from './inventory-components/home/home.component';

@NgModule({
  declarations: [inventoryHomeComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
})
export class MainModule {}
