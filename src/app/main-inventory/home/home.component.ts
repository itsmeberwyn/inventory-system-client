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
        this.$products = data.payload;
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

  paginate(page: any) {
    this.router.navigate([`inventory/home/${page + 1}`]);
  }

  next() {
    if (this.$currentPage < this.$products.length - 1)
      this.router.navigate([`inventory/home/${(this.$currentPage += 2)}`]);
  }

  previous() {
    if (this.$currentPage > 0)
      this.router.navigate([`inventory/home/${this.$currentPage}`]);
  }
}
