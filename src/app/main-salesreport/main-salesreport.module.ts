import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSalesReportRoutingComponent } from './main-salesreport.routing.module';
import { MaterialModule } from '../modules/material.modules';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MaterialModule, MainSalesReportRoutingComponent],
})
export class MainSalesReportModule {}
