import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

import Swal from 'sweetalert2';
import ProgressBar from '@badrap/bar-of-progress';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  $categories: any = [];
  $products: any = [];
  $products_copy: any = [];

  category: any = '';
  totalCost: number = 0;
  search: any = '';

  orderForm: any = this.formBuilder.group({
    list: this.formBuilder.array([]),
    amountReceive: ['', Validators.required],
    totalAmount: ['', Validators.required],
  });

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
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

  getCategories() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-categories`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$categories = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  filterByCategory(event: any) {
    if (event === undefined) {
      this.getProducts();

      return;
    }

    this.$products = this.$products_copy;

    let result = [];
    for (let i = 0; i < this.$products.length; i++) {
      for (let j = 0; j < this.$products[i].length; j++) {
        console.log(this.$products[i][j].categoryId, event);
        if (this.$products[i][j].categoryId === parseInt(event)) {
          result.push(this.$products[i][j]);
        }
      }
    }

    this.$products = result.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 8);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

    console.log(this.$products);
  }

  searchProduct() {
    if (this.$products.length === 0 || this.search === '') {
      this.$products = this.$products_copy;
      return;
    }

    const result = this.$products.flat().filter((product: any) => {
      return new RegExp(this.search.toLowerCase()).test(
        product.productName.toLowerCase()
      );
    });

    this.$products = result;
  }

  get formArrOrder() {
    return this.orderForm.get('list') as FormArray;
  }

  newOrder(data: any) {
    this.totalCost += data.price * 1;

    console.log(data);
    return this.formBuilder.group({
      productId: data.id,
      productName: data.productName,
      quantity: 1,
      price: data.price,
      subTotal: data.price * 1,
    });
  }

  addOrder(data: any) {
    this.formArrOrder.push(this.newOrder(data));
  }

  removeOrder(index: any) {
    this.totalCost -= this.orderForm.controls.list.value[index].subTotal;
    this.formArrOrder.removeAt(index);
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

  submitOrder() {
    this.progress.start();

    this.orderForm.controls.totalAmount.patchValue(this.totalCost);
    console.log(this.orderForm.value);

    if (this.orderForm.valid) {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/add-transaction`;
      requestParams.Body = JSON.stringify(this.orderForm.value);

      this.dataService
        .httpRequest('POST_REQUIRES_AUTH', requestParams)
        .subscribe(async (data: any) => {
          if (data.status['remarks'] === 'success') {
            setTimeout(() => {
              this.progress.finish();
              Swal.fire(
                'Awesome!',
                'Successfully added to the database',
                'success'
              );

              this.orderForm = this.formBuilder.group({
                list: this.formBuilder.array([]),
                amountReceive: ['', Validators.required],
                totalAmount: ['', Validators.required],
              });
              this.getProducts();
            }, 200);
          } else {
            setTimeout(() => {
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
