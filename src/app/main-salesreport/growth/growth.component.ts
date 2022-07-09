import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.css'],
})
export class GrowthComponent implements OnInit {
  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
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

  public barChartData: ChartData<'bar'> = {
    labels: [
      'Pens',
      'Pencils',
      'Notebooks',
      'Papers',
      'Adhesives',
      'Orgranizers',
      'Separators',
    ],
    datasets: [
      {
        data: [23, 53, 83, 51, 35, 83, 42],
        label: '2021',
        backgroundColor: 'rgba(84,100,239,1)',
        hoverBackgroundColor: 'rgba(84,100,239,0.6)',
      },
      {
        data: [23, 43, 23, 51, 65, 23, 22],
        label: '2022',
        backgroundColor: 'rgba(206,146,223,1)',
        hoverBackgroundColor: 'rgba(206,146,223,0.6)',
      },
    ],
  };

  constructor() {
    Chart.register(Annotation);
  }

  ngOnInit(): void {}

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };
}
