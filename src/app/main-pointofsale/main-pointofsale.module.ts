import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPointofSaleRoutingComponent } from './main-pointofsale.routing.module';
import { MaterialModule } from '../modules/material.modules';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MaterialModule, MainPointofSaleRoutingComponent],
})
export class MainPointofSaleModule {}
