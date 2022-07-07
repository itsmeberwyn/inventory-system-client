import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInventoryRoutingComponent } from './main-inventory.routing.module';
import { MaterialModule } from '../modules/material.modules';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MaterialModule, MainInventoryRoutingComponent],
})
export class MainInventoryModule {}
