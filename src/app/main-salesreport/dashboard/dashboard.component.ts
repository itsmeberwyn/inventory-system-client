import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalSold: any = 0;
  totalCustomer: any = 0;
  topSelling: any = [];
  topSellingCat: any = [];

  revenue: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getSoldItemsToday();
    this.getCustomerToday();
    this.getTopSelling();
    this.getTopCategory();
  }

  getSoldItemsToday() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-orders-today`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.totalSold = data.payload;
      });
  }

  getCustomerToday() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-customers-today`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.totalCustomer = data.payload;
      });
  }

  getTopSelling() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-topselling-today`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        for (let item of data.payload) {
          this.revenue += item.sold;
        }
        this.topSelling = data.payload;
      });
  }

  getTopCategory() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-topsellingcat-today`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.topSellingCat = data.payload;
      });
  }
}
