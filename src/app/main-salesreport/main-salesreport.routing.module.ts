import { SalesreportGuard } from './../guards/salesreport.guard';
import { ReportComponent } from './report/report.component';
import { GrowthComponent } from './growth/growth.component';
import { RevenueComponent } from './revenue/revenue.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [SalesreportGuard] },
  {
    path: 'revenue',
    component: RevenueComponent,
    canActivate: [SalesreportGuard],
  },
  {
    path: 'growth',
    component: GrowthComponent,
    canActivate: [SalesreportGuard],
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [SalesreportGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSalesReportRoutingComponent {}
