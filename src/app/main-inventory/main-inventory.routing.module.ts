import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'purchase', component: PurchasesComponent },
  { path: 'supplier', component: SuppliersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainInventoryRoutingComponent {}
