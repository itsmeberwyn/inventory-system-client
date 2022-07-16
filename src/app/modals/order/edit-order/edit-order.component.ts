import { DataService } from './../../../services/data.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  $products: any = [];
  $products_copy: any = [];
  $orders: any = [];

  totalCost: any = 0;

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
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.$products = data.payload;
        this.$products_copy = data.payload;
      });
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
    this.orderForm.controls.totalAmount.patchValue(this.totalCost);
    console.log(this.orderForm.value);

    if (this.orderForm.valid) {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/update-orders`;
      requestParams.Body = JSON.stringify(this.orderForm.value);

      this.dataService
        .httpRequest('PATCH', requestParams)
        .subscribe(async (data: any) => {
          if (data.status['remarks'] === 'success') {
          }
        });
    }
  }
}
