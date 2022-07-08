import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSalesReportRoutingComponent } from './main-salesreport.routing.module';
import { MaterialModule } from '../modules/material.modules';
import { NgChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenueComponent } from './revenue/revenue.component';
import { GrowthComponent } from './growth/growth.component';
import { ReportComponent } from './report/report.component';
@NgModule({
  declarations: [
    DashboardComponent,
    RevenueComponent,
    GrowthComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainSalesReportRoutingComponent,
    NgChartsModule,
  ],
})
export class MainSalesReportModule {}
