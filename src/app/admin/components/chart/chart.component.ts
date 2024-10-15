import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() chartUse?: string;

  chartData: any;
  chartOptions?: ChartOptions;
  innerWidth = window.innerWidth;
  totalCounter: number = 0;
  dataSubscription!: Subscription;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    console.log(this.chartUse);

    if (this.chartUse === 'stats') {
      this.dataSubscription = this.adminService.stats$.subscribe((stats) => {
        if (!stats) return;
        this.updateChartData(stats);

        this.totalCounter = stats
          .map((s) => s.total_visits)
          .reduce((prev, act) => prev + act);
      });
    } else {
      this.dataSubscription = this.adminService.sales$.subscribe((sales) => {
        if (!sales) return;
        this.updateChartData(sales);

        this.totalCounter = sales
          .map((s) => s.ammount)
          .reduce((prev, act) => prev + act);
      });
    }

    this.initChart();
  }

  refreshChart(){
    this.chartUse === 'stats' ? this.adminService.getStats() : this.adminService.getSales()
  }

  updateChartData(data: any[]) {
    console.log(data);

    const documentStyle = getComputedStyle(document.documentElement);
    this.chartData = {
      labels: data.map((item) => this.formatDate(item.date)), // Aquí puedes usar un formato de fecha específico si lo deseas
      datasets: [],
    };

    if (this.chartUse === 'stats') {
      this.chartData.datasets.push({
        label: 'Vistas',
        data: data.map((item) => item.total_visits),
        fill: false,
        backgroundColor: documentStyle.getPropertyValue('--primary-color'),
        borderColor: documentStyle.getPropertyValue('--primary-color'),
      });
    } else {
      this.chartData.datasets.push(
        {
          label: 'Total en pesos',
          data: data.map((e) => e.ammount),
          fill: false,
          backgroundColor: '#ff725e',
          borderColor: '#ff725e',
        },
        {
          label: 'Ventas',
          data: data.map((e) => e.total_sales),
          fill: false,
          backgroundColor: '#0e8174',
          borderColor: '#0e8174',
        }
      );
    }
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      
      interaction: {
        mode: 'index', // Muestra una línea vertical al pasar el mouse por encima
        intersect: false, // Muestra solo los puntos más cercanos en el eje X
        axis: 'x',
      },

      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },

      scales: {
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColor,
            stepSize: 1000, // Indica que la escala debe usar solo números enteros
          },

          grid: {
            color: surfaceBorder,
          },

          min: 0,
        },
      },

      elements: {
        point: {
          radius: 4, // Tamaño del punto por defecto
          hoverRadius: 5, // Tamaño del punto cuando se hace hover
        },
      },
    };
  }

  formatDate(date: string) {
    const [year, month, day] = date.split('-');
    return [day, month].join('-');
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
