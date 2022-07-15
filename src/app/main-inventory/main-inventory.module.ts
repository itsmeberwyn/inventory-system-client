import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainInventoryRoutingComponent } from './main-inventory.routing.module';
import { MaterialModule } from '../modules/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ProductsComponent as InventoryProductsComponent } from './products/products.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

@NgModule({
  declarations: [
    HomeComponent,
    InventoryProductsComponent,
    PurchasesComponent,
    SuppliersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainInventoryRoutingComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MainInventoryModule {}
