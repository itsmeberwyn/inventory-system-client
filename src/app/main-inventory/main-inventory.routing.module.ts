import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  { path: 'home', redirectTo: 'home/', pathMatch: 'full' },
  { path: '', redirectTo: 'home/', pathMatch: 'full' },
  { path: 'home/:currentPage', component: HomeComponent },

  { path: 'product', redirectTo: 'product/' },
  { path: 'product/:currentPage', component: ProductsComponent },
  { path: 'purchase', component: PurchasesComponent },
  { path: 'supplier', component: SuppliersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainInventoryRoutingComponent {}
