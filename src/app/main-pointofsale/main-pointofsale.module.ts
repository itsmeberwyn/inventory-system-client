import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPointofSaleRoutingComponent } from './main-pointofsale.routing.module';
import { MaterialModule } from '../modules/material.modules';

import { HomeComponent } from './home/home.component';
import { ProductsComponent as PosProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
@NgModule({
  declarations: [HomeComponent, PosProductsComponent, OrdersComponent],
  imports: [CommonModule, MaterialModule, MainPointofSaleRoutingComponent],
})
export class MainPointofSaleModule {}
