import { PosGuard } from './../guards/pos.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPointofSaleRoutingComponent } from './main-pointofsale.routing.module';
import { MaterialModule } from '../modules/material.modules';

import { HomeComponent } from './home/home.component';
import { ProductsComponent as PosProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeleteOrderComponent } from './../modals/order/delete-order/delete-order.component';
import { EditOrderComponent } from './../modals/order/edit-order/edit-order.component';

@NgModule({
  declarations: [
    HomeComponent,
    PosProductsComponent,
    OrdersComponent,
    DeleteOrderComponent,
    EditOrderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainPointofSaleRoutingComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PosGuard],
})
export class MainPointofSaleModule {}
