import { DataService } from './../../../services/data.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

import ProgressBar from '@badrap/bar-of-progress';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  $products: any = [];
  $products_copy: any = [];
  $orders: any = [];

  totalCost: any = 0;
  search: any = '';

  orderForm: any = this.formBuilder.group({
    list: this.formBuilder.array([]),
    amountReceive: ['', Validators.required],
    totalAmount: ['', Validators.required],
    transactionId: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public $order: any,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.init();
  }

  init() {
    for (let item of this.$order) {
      this.addOrder(item, 1);
    }

    this.orderForm.controls.amountReceive.patchValue(
      this.$order[0].amountReceive
    );
    this.orderForm.controls.transactionId.patchValue(this.$order[0].id);
  }

  getProducts() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-products-large`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$products = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload.flat();
        this.$products_copy = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload.flat();
      });
  }

  searchProduct() {
    if (this.$products.length === 0 || this.search === '') {
      this.$products = this.$products_copy;
      return;
    }

    const result = this.$products.filter((product: any) => {
      return new RegExp(this.search.toLowerCase()).test(
        product.productName.toLowerCase()
      );
    });

    this.$products = result;
  }

  get formArrOrder() {
    return this.orderForm.get('list') as FormArray;
  }

  oldOrder(data: any) {
    console.log(data);
    this.totalCost += data.subTotal;

    return this.formBuilder.group({
      transactionId: data.id,
      productId: data.productId,
      productName: data.productName,
      quantity: data.quantity,
      origQuantity: data.quantity,
      price: data.price,
      subTotal: data.subTotal,
      is_deleted: null,
      orderId: data.orderId,
    });
  }

  newOrder(data: any) {
    this.totalCost += data.price * 1;
    console.log(data, this.$order[0].id);

    return this.formBuilder.group({
      transactionId: this.$order[0].id,
      productId: data.id,
      productName: data.productName,
      quantity: 1,
      origQuantity: 1,
      price: data.price,
      subTotal: data.price * 1,
      is_deleted: null,
      orderId: 0,
    });
  }

  addOrder(data: any, checker: any = 0) {
    if (checker === 0) {
      this.formArrOrder.push(this.newOrder(data));
    } else {
      this.formArrOrder.push(this.oldOrder(data));
    }
  }

  addQuantity(index: any) {
    this.orderForm.controls.list.value[index].quantity += 1;

    this.orderForm.controls.list.value[index].subTotal =
      this.orderForm.controls.list.value[index].price *
      this.orderForm.controls.list.value[index].quantity;

    this.totalCost += this.orderForm.controls.list.value[index].price * 1;

    // this.orderForm.controls['list'].get('quantity')
    // console.log(this.orderForm.get('list')?.value[0].quantity);
  }

  removeQuantity(index: any) {
    this.orderForm.controls.list.value[index].quantity -= 1;

    this.orderForm.controls.list.value[index].subTotal =
      this.orderForm.controls.list.value[index].price *
      this.orderForm.controls.list.value[index].quantity;

    this.totalCost -= this.orderForm.controls.list.value[index].price * 1;

    if (this.orderForm.controls.list.value[index].quantity === 0) {
      this.removeOrder(index);
    }
    // this.orderForm.controls['list'].get('quantity')
    // console.log(this.orderForm.get('list')?.value[0].quantity);
  }

  removeOrder(index: any) {
    this.totalCost -= this.orderForm.controls.list.value[index].subTotal;
    this.orderForm.controls.list.value[index].is_deleted = 1;
    // this.formArrOrder.removeAt(index);
  }

  submitOrder() {
    this.progress.start();

    this.orderForm.controls.totalAmount.patchValue(this.totalCost);
    console.log(this.orderForm.value);

    if (this.orderForm.valid) {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/update-orders`;
      requestParams.Body = JSON.stringify(this.orderForm.value);

      this.dataService
        .httpRequest('PATCH_REQUIRES_AUTH', requestParams)
        .subscribe(async (data: any) => {
          if (data.status['remarks'] === 'success') {
            setTimeout(() => {
              Swal.fire('Awesome!', data.status['message'], 'success');
              this.progress.finish();
            }, 200);
          }
        });
    } else {
      setTimeout(() => {
        this.progress.finish();
      }, 200);
    }
  }
}
