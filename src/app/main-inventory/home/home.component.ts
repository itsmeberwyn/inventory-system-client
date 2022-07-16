import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  $categories: any = [];
  $products: any = [];
  $currentPage = 0;

  constructor(
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

    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-products`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        // this.$products = data.payload;

        const newData = data.payload.flat().sort(this.compare);
        this.$products = newData.reduce(
          (resultArray: any, item: any, index: any) => {
            const chunkIndex = Math.floor(index / 8);

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [];
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          },
          []
        );
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

  compare(a: any, b: any) {
    // item.quantity/item.maxQuantity*100
    if (
      (a.quantity / a.maxQuantity) * 100 <
      (b.quantity / b.maxQuantity) * 100
    ) {
      return -1;
    }
    if (
      (a.quantity / a.maxQuantity) * 100 >
      (b.quantity / b.maxQuantity) * 100
    ) {
      return 1;
    }
    return 0;
  }

  paginate(page: any) {
    this.router.navigate([`inventory/home/${page + 1}`]);
  }

  next() {
    console.log(this.$currentPage < this.$products.length - 1);
    if (this.$currentPage < this.$products.length - 1)
      this.router.navigate([`inventory/home/${(this.$currentPage += 2)}`]);
  }

  previous() {
    if (this.$currentPage > 0)
      this.router.navigate([`inventory/home/${this.$currentPage}`]);
  }
}
