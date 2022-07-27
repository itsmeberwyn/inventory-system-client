import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  $categories: any = [];
  $products: any = [];
  $products_copy: any = [];
  $currentPage = 0;

  category: any = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['currentPage'] != '') {
        this.$currentPage = parseInt(params['currentPage']) - 1;
      }
    });

    this.getCategories();
    this.getProducts();
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

  filterByCategory(event: any) {
    if (event === undefined) {
      this.getProducts();

      return;
    }

    this.$products = this.$products_copy;

    let result = [];
    for (let i = 0; i < this.$products.length; i++) {
      for (let j = 0; j < this.$products[i].length; j++) {
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
  }

  paginate(page: any) {
    this.router.navigate([`pointofsale/product/${page + 1}`]);
  }

  next() {
    if (this.$currentPage < this.$products.length - 1)
      this.router.navigate([`pointofsale/product/${(this.$currentPage += 2)}`]);
  }

  previous() {
    if (this.$currentPage > 0)
      this.router.navigate([`pointofsale/product/${this.$currentPage}`]);
  }
}
