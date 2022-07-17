import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainInventoryRoutingComponent } from './main-inventory.routing.module';
import { MaterialModule } from '../modules/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ProductsComponent as InventoryProductsComponent } from './products/products.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

import { DeleteSupplierComponent } from '../modals/supplier/delete-supplier/delete-supplier.component';
import { EditSupplierComponent } from '../modals/supplier/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './../modals/supplier/add-supplier/add-supplier.component';

import { AddPurchaseComponent } from '../modals/purchase/add-purchase/add-purchase.component';
import { DeletePurchaseComponent } from './../modals/purchase/delete-purchase/delete-purchase.component';
import { ViewPurchaseComponent } from './../modals/purchase/view-purchase/view-purchase.component';
import { EditPurchaseComponent } from './../modals/purchase/edit-purchase/edit-purchase.component';

import { DeleteProductComponent } from './../modals/product/delete-product/delete-product.component';
import { AddProductComponent } from './../modals/product/add-product/add-product.component';
import { EditProductComponent } from './../modals/product/edit-product/edit-product.component';
@NgModule({
  declarations: [
    HomeComponent,
    InventoryProductsComponent,
    PurchasesComponent,
    SuppliersComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    AddSupplierComponent,
    AddPurchaseComponent,
    DeletePurchaseComponent,
    ViewPurchaseComponent,
    EditPurchaseComponent,
    DeleteProductComponent,
    AddProductComponent,
    EditProductComponent,
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
