import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainInventoryRoutingComponent } from './main-inventory.routing.module';
import { MaterialModule } from '../modules/material.modules';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './../main-pointofsale/products/products.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    PurchasesComponent,
    SuppliersComponent,
  ],
  imports: [CommonModule, MaterialModule, MainInventoryRoutingComponent],
})
export class MainInventoryModule {}
