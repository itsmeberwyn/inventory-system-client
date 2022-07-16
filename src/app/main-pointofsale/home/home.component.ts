import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  $categories: any = [];
  $products: any = [];
  $products_copy: any = [];

  category: any = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
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

  getCategories() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-categories`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.$categories = data.payload;
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
}
