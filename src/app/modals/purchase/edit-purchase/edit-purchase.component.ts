import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import ProgressBar from '@badrap/bar-of-progress';
import { RequestParams } from 'src/app/models/RequestParams';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css'],
})
export class EditPurchaseComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  $products: any = [];
  $products_copy: any = [];
  $orders: any = [];

  transactionForm: any = this.formBuilder.group({
    list: this.formBuilder.array([]),
  });

  search: string = '';
  totalCost: number = 0;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public $purchases: any
  ) {
    console.log($purchases);
  }

  ngOnInit(): void {
    this.getProducts();
    this.init();
  }

  init() {
    for (let item of this.$purchases) {
      this.addOrder(item, 1);
    }
  }

  getProducts() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-products-large`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$products = data.payload;
        this.$products_copy = data.payload;
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

  get formArrOrder() {
    return this.transactionForm.get('list') as FormArray;
  }

  oldOrder(data: any) {
    this.totalCost += data.price * data.quantityBought;

    return this.formBuilder.group({
      id: data.id,
      purchaseSerialId: data.purchaseSerialId,
      productId: data.productId,
      supplierId: 3,
      productName: data.productName,
      price: data.price,
      quantityBought: data.quantityBought,
      actualQuantity: data.quantityBought,
      subTotal: data.price * data.quantityBought,
      is_deleted: data.is_deleted,
    });
  }

  newOrder(data: any) {
    this.totalCost += data.price * 1;

    return this.formBuilder.group({
      id: 0,
      purchaseSerialId: this.$purchases[0].purchaseSerialId,
      productId: data.id,
      supplierId: 3,
      productName: data.productName,
      price: data.price,
      quantityBought: 1,
      actualQuantity: data.quantity,
      subTotal: data.price * 1,
      is_deleted: null,
    });
  }

  addOrder(data: any, checker: any = 0) {
    if (checker === 0) {
      this.formArrOrder.push(this.newOrder(data));
    } else {
      this.formArrOrder.push(this.oldOrder(data));
    }
  }

  removeOrder(index: any) {
    this.transactionForm.controls.list.value[index].is_deleted = 1;
    // this.formArrOrder.removeAt(index);
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
    console.log(this.transactionForm.value);

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/update-purchase`;
    requestParams.Body = JSON.stringify(
      this.transactionForm.controls.list.value
    );

    this.dataService
      .httpRequest('PATCH_REQUIRES_AUTH', requestParams)
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
}
