import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

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
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.soldItems = data.payload[0]['quantitySold'];
        this.revenue = data.payload[0]['revenue'];
      });
  }

  getPurchaseCost() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-purchases-curyear`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.purhaseCost = data.payload['cost'];
        this.purchaseQuantity = data.payload['quantity'];
      });
  }

  getCustomer() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-transactions-curyear`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.customers = data.payload[0]['totalCustomers'];
      });
  }

  getSoldItemsSales() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-details-curyear`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.details = data.payload['2022'];
      });
  }

  getCustomersYear() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-customer-curyear`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.customersPerMonth = data.payload['2022'];
      });
  }

  getExpensesYear() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-expenses-curyear`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.expensesPerMonth = data.payload['2022'];
      });
  }
}
