import { DataService } from './../../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { RequestParams } from 'src/app/models/RequestParams';
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent implements OnInit {
  barData: number[] = [];
  barLabel: string[] = [];
  salesMonth: number[] = [];
  salesMonthLabel: string[] = [];

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartData<'bar'> = {
    labels: ['Pens', 'Pencils'],
    datasets: [
      {
        data: [],
        label: 'Category',
        backgroundColor: 'rgba(84,100,239,1)',
        hoverBackgroundColor: 'rgba(84,100,239,0.6)',
      },
    ],
  };

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [180, 480, 770, 90, 1000, 270, 400, 234, 344, 664, 767, 675],
        label: '2022',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(206,146,223,0.6)',
        borderColor: 'violet',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  // 'January',
  // 'February',
  // 'March',
  // 'April',
  // 'May',
  // 'June',
  // 'July',
  // 'August',
  // 'September',
  // 'October',
  // 'November',
  // 'December',

  header = [
    {
      text: 'Today’s Sales',
    },
    {
      text: 'Monthly Gross Sales',
    },
    {
      text: 'Today’s Customers',
    },
    {
      text: 'Monthly Purchases',
    },
  ];

  topSelling: any = [];
  topSellingCat: any = [];

  constructor(private dataService: DataService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.getTopSelling();
    this.getTopSellingCat();
    this.getSalesMonth();

    // this.sampleData = [32, 23, 23, 12, 34, 3, 32];
    // // console.log(this.barChartData['datasets'][0]['data']);
    // this.barChartData['datasets'][0]['data'] = this.sampleData;
  }

  getTopSelling() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-topselling-month`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.topSelling = data.payload;
      });
  }

  getTopSellingCat() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-topsellingcat-month`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.topSellingCat = data.payload;

        // this.barChartData['labels'] = this.barlabel;
        // this.barChartData['datasets'][0]['data'] = this.barData;
        this.barData = this.topSellingCat.map((data: any) => data.quantitySold);
        this.barLabel = this.topSellingCat.map(
          (data: any) => data.categoryName
        );

        this.barChartData['datasets'][0]['data'] = this.barData;
        this.barChartData['labels'] = this.barLabel;
        console.log(this.barData);
      });
  }

  getSalesMonth() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-sales-month`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.salesMonth = data.payload[0];
        this.salesMonthLabel = this.salesMonth.map((day, index) =>
          (index + 1).toString()
        );
        // this.topSellingCat = data.payload;
        console.log(data.payload);
        this.lineChartData['datasets'][0]['data'] = this.salesMonth;
        this.lineChartData['labels'] = this.salesMonthLabel;
      });
  }

  // line chart configuration

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
        // to hide second axis
        display: false,
      },
    },

    // plugins: {
    //   legend: { display: true },
    //   annotation: {
    //     annotations: [
    //       {
    //         type: 'line',
    //         scaleID: 'x',
    //         value: 'March',
    //         borderColor: 'orange',
    //         borderWidth: 2,
    //         label: {
    //           position: 'center',
    //           enabled: true,
    //           color: 'orange',
    //           content: 'LineAnno',
    //           font: {
    //             weight: 'bold',
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
  };

  // line chart end

  // bar chart configuration

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    // plugins: {
    //   legend: {
    //     display: true,
    //   },
    //   datalabels: {
    //     anchor: 'end',
    //     align: 'end',
    //   },
    // },
  };

  // bar chart end

  // hover or clicked

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }
}
