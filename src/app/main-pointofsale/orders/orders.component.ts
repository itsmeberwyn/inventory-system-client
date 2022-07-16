import { EditOrderComponent } from './../../modals/order/edit-order/edit-order.component';
import { DeleteOrderComponent } from './../../modals/order/delete-order/delete-order.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  $transactions: any = [];
  $transactions_copy: any = [];

  $currentPage = 0;
  search: any = '';

  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['currentPage'] != '') {
        this.$currentPage = parseInt(params['currentPage']) - 1;
      }
    });

    this.getOrders();
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  openEditDialog(page: any, index: any) {
    const openDialog = this.dialog.open(EditOrderComponent, {
      data: this.$transactions[page][index],
    });
    openDialog.afterClosed().subscribe((result: any) => {
      this.getOrders();
    });
  }

  openDeleteDialog(transactionId: number) {
    const openDialog = this.dialog.open(DeleteOrderComponent, {
      data: transactionId,
    });
    openDialog.afterClosed().subscribe((result: any) => {
      this.getOrders();
    });
  }

  getOrders() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-transactions`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.$transactions = data.payload;
        this.$transactions_copy = data.payload;
      });
  }

  keys(): any {
    if (this.$transactions[0] !== undefined) {
      return Object.keys(this.$transactions[this.$currentPage]);
    } else {
      return [];
    }
  }

  cost(data: any): any {
    let cost = 0;
    for (let item of this.$transactions[this.$currentPage][data]) {
      cost += item.price * item.quantity;
    }

    return cost;
  }

  quantity(data: any): any {
    let quantity = 0;
    for (let item of this.$transactions[this.$currentPage][data]) {
      quantity += item.quantity;
    }

    return quantity;
  }

  paginate(page: any) {
    this.router.navigate([`pointofsale/order/${page + 1}`]);
  }

  next() {
    if (this.$currentPage < this.$transactions[0].length - 1)
      this.router.navigate([`pointofsale/order/${(this.$currentPage += 2)}`]);
  }

  previous() {
    if (this.$currentPage > 0)
      this.router.navigate([`pointofsale/order/${this.$currentPage}`]);
  }
}
