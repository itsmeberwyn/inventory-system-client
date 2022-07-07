import { MainSalesreportComponent } from './main-salesreport/main-salesreport.component';
import { MainPointofsaleComponent } from './main-pointofsale/main-pointofsale.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainInventoryComponent } from './main-inventory/main-inventory.component';
import { LoginInventoryComponent } from './login-inventory/login-inventory.component';

const routes: Routes = [
  {
    path: 'inventory',
    component: MainInventoryComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main-inventory/main-inventory.module').then(
            (m) => m.MainInventoryModule
          ),
      },
    ],
  },
  {
    path: 'pointofsale',
    component: MainPointofsaleComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main-pointofsale/main-pointofsale.module').then(
            (m) => m.MainPointofSaleModule
          ),
      },
    ],
  },
  {
    path: 'salesreport',
    component: MainSalesreportComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main-salesreport/main-salesreport.module').then(
            (m) => m.MainSalesReportModule
          ),
      },
    ],
  },
  {
    path: '',
    component: LoginInventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
