import { ReportComponent } from './report/report.component';
import { GrowthComponent } from './growth/growth.component';
import { RevenueComponent } from './revenue/revenue.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'revenue', component: RevenueComponent },
  { path: 'growth', component: GrowthComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSalesReportRoutingComponent {}
