import { AddSupplierComponent } from './../../modals/supplier/add-supplier/add-supplier.component';
import { DeleteSupplierComponent } from './../../modals/supplier/delete-supplier/delete-supplier.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { RequestParams } from 'src/app/models/RequestParams';

import { EditSupplierComponent } from 'src/app/modals/supplier/edit-supplier/edit-supplier.component';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  $suppliers: any = [];
  $suppliers_copy: any = [];
  $currentPage = 0;

  supplierForm: FormGroup = this.formBuilder.group({
    supplierName: ['', Validators.required],
    contact: ['', Validators.required],
    location: ['', Validators.required],
  });

  search: any = '';

  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['currentPage'] != '') {
        this.$currentPage = parseInt(params['currentPage']) - 1;
      }
    });

    this.getSupplier();
  }

  openAddDialog() {
    this.dialog.open(AddSupplierComponent, {
      data: this.$suppliers,
    });
  }

  openEditDialog(item: any, index: number) {
    this.dialog.open(EditSupplierComponent, {
      data: {
        item: item,
        index: index,
        $suppliers: this.$suppliers,
      },
    });
  }

  openDeleteDialog(index: number, page: number, supplierId: number) {
    const openDialog = this.dialog.open(DeleteSupplierComponent, {
      data: {
        index: index,
        page: page,
        supplierId: supplierId,
        $suppliers: this.$suppliers,
        $suppliers_copy: this.$suppliers_copy,
      },
    });

    openDialog.afterClosed().subscribe((result: any) => {
      this.getSupplier();

      // this.$suppliers = result.$suppliers;
      // this.$suppliers_copy = result.$suppliers;
    });
  }

  getSupplier() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-suppliers`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$suppliers = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
        this.$suppliers_copy = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
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
