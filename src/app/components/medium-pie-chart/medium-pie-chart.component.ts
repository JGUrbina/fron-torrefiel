import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medium-pie-chart',
  templateUrl: './medium-pie-chart.component.html',
  styleUrls: ['./medium-pie-chart.component.scss']
})
export class MediumPieChartComponent implements OnInit {

  @Input() content: string;
  @Input() id: string;
  @Input() lineWidth: number;
  @Input() porcentage: number;
  @Input() rotate: number;
  @Input() size: number;

  public searchId: string;

  constructor() { }

  ngOnInit(): void {
    this.searchId = `graph-${this.id}-${this.porcentage}`;
    setTimeout(() => {
      this.createGraph(this.lineWidth, this.porcentage, this.rotate, this.size);
    }, 1000);
  }

  createGraph(lineWidth: number, porcentage: number, rotate: number, size: number): void {
    const el = document.getElementById(this.searchId); // get canvas

    const options: any = {
      percent: porcentage || 25,
      size: size || 50,
      lineWidth: lineWidth || 3,
      rotate: rotate || 0
    };

    const canvas: any = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = options.size;
    canvas.height = options.size / 1.5;

    el.appendChild(canvas);
    ctx.translate(options.size / 2, options.size / 2); // change center
    ctx.rotate((2 / 2.05 + options.rotate / 180) * Math.PI); // rotate -90 deg

    const radius = (options.size - (options.lineWidth * 2)) / 2;

    const drawCircle = (color: string, lineWidthCircle: number, percent: number) => {
      percent = Math.min(Math.max(0, percent || 1), 1);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 1.05 * percent, false); // tamaño del circulo
      ctx.strokeStyle = color;
      ctx.lineCap = 'square'; // butt, round or square
      ctx.lineWidth = lineWidthCircle;
      ctx.stroke();
    };

    drawCircle('#efefef', options.lineWidth * 2, 100 / 100);
    drawCircle('#cd2a00', options.lineWidth, options.percent / 100);
  }

}
