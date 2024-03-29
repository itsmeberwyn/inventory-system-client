import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.modules';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// global components
import { LoginInventoryComponent } from './login-inventory/login-inventory.component';

// module components
import { MainInventoryComponent } from './main-inventory/main-inventory.component';
import { MainPointofsaleComponent } from './main-pointofsale/main-pointofsale.component';
import { MainSalesreportComponent } from './main-salesreport/main-salesreport.component';
import { LoginPointofsaleComponent } from './login-pointofsale/login-pointofsale.component';
import { LoginSalesreportComponent } from './login-salesreport/login-salesreport.component';

import { SidebarComponent } from './reusable/sidebar/sidebar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ViewOrderComponent } from './modals/order/view-order/view-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginInventoryComponent,
    MainInventoryComponent,
    MainPointofsaleComponent,
    MainSalesreportComponent,
    SidebarComponent,
    LoginPointofsaleComponent,
    LoginSalesreportComponent,
    ViewOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
