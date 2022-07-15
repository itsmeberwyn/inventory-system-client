import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RequestParams } from 'src/app/models/RequestParams';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  $suppliers: any = [];
  $suppliers_copy = [];
  $currentPage = 0;

  search: any = '';

  constructor(
    private dialog: MatDialog,
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

    this.getSupplier();
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  getSupplier() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-suppliers`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.$suppliers = data.payload;
        this.$suppliers_copy = data.payload;
        console.log(data);
      });
  }

  searchSupplier() {
    if (this.$suppliers.length === 0 || this.search === '') {
      this.$suppliers = this.$suppliers_copy;
      return;
    }

    const result = this.$suppliers.map((chunk: any) => {
      try {
        return chunk.filter((supplier: any) => {
          return new RegExp(this.search.toLowerCase()).test(
            supplier.supplierName.toLowerCase()
          );
        });
      } catch (e) {}
    });

    this.$suppliers = result
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
    this.router.navigate([`inventory/supplier/${page + 1}`]);
  }

  next() {
    if (this.$currentPage < this.$suppliers.length - 1)
      this.router.navigate([`inventory/supplier/${(this.$currentPage += 2)}`]);
  }

  previous() {
    if (this.$currentPage > 0)
      this.router.navigate([`inventory/supplier/${this.$currentPage}`]);
  }
}
