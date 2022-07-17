import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'home', redirectTo: 'home/', pathMatch: 'full' },
  { path: '', redirectTo: 'home/', pathMatch: 'full' },
  { path: 'home/:currentPage', component: HomeComponent },

  { path: 'product', redirectTo: 'product/' },
  { path: 'product/:currentPage', component: ProductsComponent },

  { path: 'order', redirectTo: 'order/' },
  { path: 'order/:currentPage', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPointofSaleRoutingComponent {}
