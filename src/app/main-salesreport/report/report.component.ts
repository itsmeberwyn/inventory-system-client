import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  soldItems: number = 0;
  revenue: number = 0;
  purhaseCost: number = 0;
  purchaseQuantity: number = 0;
  customers: number = 0;

  details: any = [];
  customersPerMonth: any = [];
  expensesPerMonth: any = [];

  monthsLabel = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getSoldItemsRevenue();
    this.getPurchaseCost();
    this.getCustomer();
    this.getSoldItemsSales();
    this.getCustomersYear();
    this.getExpensesYear();
  }

  getSoldItemsRevenue() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-orders-curyear`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.soldItems = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload[0]['quantitySold'];
        this.revenue = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload[0]['revenue'];
      });
  }

  getPurchaseCost() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-purchases-curyear`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.purhaseCost = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['cost'];
        this.purchaseQuantity = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['quantity'];
      });
  }

  getCustomer() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-transactions-curyear`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.customers = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload[0]['totalCustomers'];
      });
  }

  getSoldItemsSales() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-details-curyear`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.details = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['2022'];
      });
  }

  getCustomersYear() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-customer-curyear`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.customersPerMonth = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['2022'];
      });
  }

  getExpensesYear() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-expenses-curyear`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.expensesPerMonth = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['2022'];
      });
  }
}
