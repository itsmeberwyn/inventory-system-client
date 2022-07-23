import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { Buffer } from 'buffer/';

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
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.totalSold = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  getCustomerToday() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-customers-today`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.totalCustomer = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  getTopSelling() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-topselling-today`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        for (let item of data.payload) {
          this.revenue += item.sold;
        }
        this.topSelling = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  getTopCategory() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-topsellingcat-today`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.topSellingCat = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }
}
