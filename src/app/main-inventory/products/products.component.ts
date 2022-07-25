import { EditProductComponent } from './../../modals/product/edit-product/edit-product.component';
import { AddProductComponent } from './../../modals/product/add-product/add-product.component';
import { DeleteProductComponent } from './../../modals/product/delete-product/delete-product.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestParams } from 'src/app/models/RequestParams';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  $products: any = [];
  $products_copy: any = [];
  $currentPage = 0;
  $categories: any = [];

  category: String = 'Categories';
  search: any = '';

  constructor(
    private dialog: MatDialog,
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

  openAddDialog() {
    const openDialog = this.dialog.open(AddProductComponent, {});

    openDialog.afterClosed().subscribe((result: any) => {
      this.getProducts();
    });
  }

  openEditDialog(data: any) {
    const openDialog = this.dialog.open(EditProductComponent, {
      data: data,
    });

    openDialog.afterClosed().subscribe((result: any) => {
      this.getProducts();
    });
  }

  openDeleteDialog(index: number, currentPage: number, productId: number) {
    const openDialog = this.dialog.open(DeleteProductComponent, {
      data: {
        index: index,
        currentPage: currentPage,
        productId: productId,
        $products: this.$products,
      },
    });

    openDialog.afterClosed().subscribe((result: any) => {
      this.getProducts();
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

  paginate(page: any) {
    this.router.navigate([`inventory/product/${page + 1}`]);
  }

  next() {
    if (this.$currentPage < this.$products.length - 1)
      this.router.navigate([`inventory/product/${(this.$currentPage += 2)}`]);
  }

  previous() {
    if (this.$currentPage > 0)
      this.router.navigate([`inventory/product/${this.$currentPage}`]);
  }
}
