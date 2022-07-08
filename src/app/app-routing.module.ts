import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// login component
import { LoginInventoryComponent } from './login-inventory/login-inventory.component';
import { LoginSalesreportComponent } from './login-salesreport/login-salesreport.component';
import { LoginPointofsaleComponent } from './login-pointofsale/login-pointofsale.component';

// main component
import { MainInventoryComponent } from './main-inventory/main-inventory.component';
import { MainSalesreportComponent } from './main-salesreport/main-salesreport.component';
import { MainPointofsaleComponent } from './main-pointofsale/main-pointofsale.component';

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
  {
    path: 'pos-login',
    component: LoginPointofsaleComponent,
  },
  {
    path: 'sr-login',
    component: LoginSalesreportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
