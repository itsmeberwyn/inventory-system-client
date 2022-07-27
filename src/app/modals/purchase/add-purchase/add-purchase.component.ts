import { DataService } from './../../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import ProgressBar from '@badrap/bar-of-progress';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css'],
})
export class AddPurchaseComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  $products: any = [];
  $products_copy: any = [];
  $orders: any = [];
  $suppliers: any = [];

  transactionId = new Date().valueOf();

  transactionForm: any = this.formBuilder.group({
    list: this.formBuilder.array([]),
    supplierId: ['', Validators.required],
  });

  search: string = '';
  totalCost: number = 0;
  currentPage = 0;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public $purchases: any
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getSuppliers();
  }

  getProducts() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-products-large`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$products = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
        this.$products_copy = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  getSuppliers() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-suppliers`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$suppliers = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload.flat();
      });
  }

  searchProduct() {
    if (this.$products.length === 0 || this.search === '') {
      this.$products = this.$products_copy;
      return;
    }

    const result = this.$products.map((chunk: any) => {
      try {
        return chunk.filter((product: any) => {
          return new RegExp(this.search.toLowerCase()).test(
            product.productName.toLowerCase()
          );
        });
      } catch (e) {}
    });

    this.$products = result
      .flat()
      .reduce((resultArray: any, item: any, index: any) => {
        const chunkIndex = Math.floor(index / 8);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
  }

  productClick(data: any) {
    console.log(data);
    // this.$orders.push(data);
  }

  get formArrOrder() {
    return this.transactionForm.get('list') as FormArray;
  }

  updateTotal(index: any) {
    this.totalCost = 0;
    for (let i = 0; i < this.transactionForm.controls.list.length; i++) {
      this.totalCost +=
        this.transactionForm.controls.list.value[i].price *
        this.transactionForm.controls.list.value[i].quantityBought;
    }
  }

  newOrder(data: any) {
    this.totalCost += 0 * 1;

    return this.formBuilder.group({
      purchaseSerialId: this.transactionId,
      productId: data.id,
      supplierId: this.transactionForm.controls.supplierId.value,
      productName: data.productName,
      price: 0,
      quantityBought: 1,
      actualQuantity: data.quantity,
      subTotal: 0 * 1,
    });
  }

  addOrder(data: any) {
    this.formArrOrder.push(this.newOrder(data));
  }

  removeOrder(index: any) {
    this.totalCost -= this.transactionForm.controls.list.value[index].subTotal;
    this.formArrOrder.removeAt(index);
  }

  addQuantity(index: any) {
    this.transactionForm.controls.list.value[index].quantityBought += 1;

    this.transactionForm.controls.list.value[index].subTotal =
      this.transactionForm.controls.list.value[index].price *
      this.transactionForm.controls.list.value[index].quantityBought;

    this.totalCost += this.transactionForm.controls.list.value[index].price * 1;

    // this.transactionForm.controls['list'].get('quantity')
    // console.log(this.transactionForm.get('list')?.value[0].quantity);
  }

  removeQuantity(index: any) {
    this.transactionForm.controls.list.value[index].quantityBought -= 1;

    this.transactionForm.controls.list.value[index].subTotal =
      this.transactionForm.controls.list.value[index].price *
      this.transactionForm.controls.list.value[index].quantityBought;

    this.totalCost -= this.transactionForm.controls.list.value[index].price * 1;

    if (this.transactionForm.controls.list.value[index].quantityBought === 0) {
      this.removeOrder(index);
    }
    // this.transactionForm.controls['list'].get('quantity')
    // console.log(this.transactionForm.get('list')?.value[0].quantity);
  }

  submitOrder() {
    this.progress.start();

    this.transactionId = new Date().valueOf();

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/add-purchases`;
    requestParams.Body = JSON.stringify({
      data: this.transactionForm.controls.list.value,
      supplierId: this.transactionForm.controls.supplierId.value,
    });

    this.dataService
      .httpRequest('POST_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          setTimeout(() => {
            this.transactionForm.reset();
            Swal.fire('Awesome!', data.status['message'], 'success');
            this.progress.finish();
          }, 200);
        }
      });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  paginate(page: any) {
    this.currentPage = page;
  }
}
