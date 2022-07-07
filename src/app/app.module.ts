import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.modules';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// global components
import { LoginInventoryComponent } from './login-inventory/login-inventory.component';

// module components
import { MainInventoryComponent } from './main-inventory/main-inventory.component';
import { MainPointofsaleComponent } from './main-pointofsale/main-pointofsale.component';
import { MainSalesreportComponent } from './main-salesreport/main-salesreport.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginInventoryComponent,
    MainInventoryComponent,
    MainPointofsaleComponent,
    MainSalesreportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
