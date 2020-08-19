import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];

  public lineChartOptions = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: '#cd2a00',
      backgroundColor: 'rgba(162, 162, 162, 0.28)',
    },
  ];

  public lineChartLegend = false;
  public lineChartPlugins = [];
  public lineChartType = 'line';

  constructor() {
    // Así lo tenía Karen
    // this.lineChartData = [
    //   { data: [1000, 5000, 2500] }
    // ];
    // Así lo dejo yo para que muestre en 0% de porcentaje. (Ricardo)
    this.lineChartData = [
      { data: [0, 0, 0] }
    ];
    this.lineChartLabels = ['antes', 'ultimos 30 días', 'actual'];
  }

  ngOnInit(): void {
  }

}
