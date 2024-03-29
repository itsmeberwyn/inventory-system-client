import { ViewPurchaseComponent } from './../../modals/purchase/view-purchase/view-purchase.component';
import { EditPurchaseComponent } from './../../modals/purchase/edit-purchase/edit-purchase.component';
import { DeletePurchaseComponent } from './../../modals/purchase/delete-purchase/delete-purchase.component';
import { AddPurchaseComponent } from './../../modals/purchase/add-purchase/add-purchase.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestParams } from 'src/app/models/RequestParams';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css'],
})
export class PurchasesComponent implements OnInit {
  $purchases: any = [];
  $purchases_copy: any = [];

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

    this.getPurchases();
  }

  openViewDialog(page: any, index: any) {
    const openDialog = this.dialog.open(ViewPurchaseComponent, {
      data: this.$purchases[page][index],
    });
  }

  openAddDialog() {
    const openDialog = this.dialog.open(AddPurchaseComponent, {
      data: this.$purchases,
    });

    openDialog.afterClosed().subscribe((result: any) => {
      this.getPurchases();
    });
  }

  editAddDialog(page: any, index: any) {
    const openDialog = this.dialog.open(EditPurchaseComponent, {
      data: this.$purchases[page][index],
    });
    openDialog.afterClosed().subscribe((result: any) => {
      this.getPurchases();
    });
  }

  removeAddDialog(data: any) {
    const openDialog = this.dialog.open(DeletePurchaseComponent, {
      data: {
        serial: data,
      },
    });
    openDialog.afterClosed().subscribe((result: any) => {
      this.getPurchases();
    });
  }

  getPurchases() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-purchases`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$purchases = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
        this.$purchases_copy = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  searchPurchases() {
    if (this.$purchases.length === 0 || this.search === '') {
      this.$purchases = this.$purchases_copy;
      return;
    }

    const result = this.$purchases.map((chunk: any) => {
      try {
        return chunk.filter((purchase: any) => {
          return new RegExp(
            this.search.this.search.toISOString('en-US').split('T')[0]
          ).test(purchase.created_at.toLowerCase());
        });
      } catch (e) {}
    });

    this.$purchases = result
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

  keys(): any {
    if (this.$purchases[0] !== undefined) {
      return Object.keys(this.$purchases[this.$currentPage]);
    } else {
      return [];
    }
  }

  cost(data: any): any {
    let cost = 0;
    for (let item of this.$purchases[this.$currentPage][data]) {
      cost += item.price * item.quantityBought;
    }

    return cost;
  }

  quantity(data: any): any {
    let cost = 0;
    for (let item of this.$purchases[this.$currentPage][data]) {
      cost += item.quantityBought;
    }

    return cost;
  }

  paginate(page: any) {
    this.router.navigate([`inventory/purchase/${page + 1}`]);
  }

  next() {
    if (this.$currentPage < this.$purchases[0].length - 1)
      this.router.navigate([`inventory/purchase/${(this.$currentPage += 2)}`]);
  }

  previous() {
    if (this.$currentPage > 0)
      this.router.navigate([`inventory/purchase/${this.$currentPage}`]);
  }
}
