import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { RequestParams } from 'src/app/models/RequestParams';
import { DataService } from 'src/app/services/data.service';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.css'],
})
export class GrowthComponent implements OnInit {
  customersData: any = [];

  months: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartDataGrowth: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [28, 48, 40, 19, 86, 27, 90, 34, 767, 88, 33, 76],
        label: '2021',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400, 234, 344, 664, 767, 675],
        label: '2022',
        // yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(206,146,223,0.6)',
        borderColor: 'violet',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  };

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

  public barChartDataGrowth: ChartData<'bar'> = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        data: [],
        label: '2021',
        backgroundColor: 'rgba(84,100,239,1)',
        hoverBackgroundColor: 'rgba(84,100,239,0.6)',
      },
      {
        data: [],
        label: '2022',
        backgroundColor: 'rgba(206,146,223,1)',
        hoverBackgroundColor: 'rgba(206,146,223,0.6)',
      },
    ],
  };

  constructor(private dataService: DataService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.getSalesYear();
    this.getExpensesYear();
    this.getCustomersYear();
  }

  getSalesYear() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-sales-year`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.lineChartDataGrowth['datasets'][0]['data'] = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['2021'];
        this.lineChartDataGrowth['datasets'][1]['data'] = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['2022'];

        this.chart?.update();
      });
  }

  getExpensesYear() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-expenses-year`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.barChartDataGrowth['datasets'][0]['data'] = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['2021'];
        this.barChartDataGrowth['datasets'][1]['data'] = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload['2022'];

        this.chart?.update();
      });
  }

  getCustomersYear() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-customers-year`;

    this.dataService
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.customersData = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // indexAxis: 'y',
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };
}
