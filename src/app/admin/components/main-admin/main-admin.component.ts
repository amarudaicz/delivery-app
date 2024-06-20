import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { shepherdMain } from 'src/app/utils/shepherd-tour';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss'],
  providers: [],
})
export class MainAdminComponent implements OnInit, OnDestroy {

  constructor(
    private layoutState: LayoutStateService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.adminService.getSales();
    this.adminService.getStats();
    this.continueTutorial()
  }

  checkAdmin(): void {}

  continueTutorial() {
    shepherdMain.addSteps([
      {
        id: 'step-5',
        classes: 'step-stats',
        text: 'Nuestro servicio te permite generar un código QR único para tu tienda en DELI. Una vez generado, puedes imprimirlo en tus productos, folletos publicitarios o enviarlo directamente a tus clientes a través de correos electrónicos, mensajes de texto o redes sociales.',
        attachTo: {
          element: '#banner-qr',
          on: 'bottom',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherdMain.next,
          },
        ],
        when: {
          show: () => {
            this.layoutState.blockBody()
     
          },
          hide: () => {
            this.layoutState.unblockBody()
          },
        },
      },
      {
        id: 'step-5',
        classes: 'step-stats',
        text: 'Copia el enlace de tu tienda en DELI, compártelo en tus redes sociales o envíalo por mensaje',
        attachTo: {
          element: '#banner-link',
          on: 'bottom',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherdMain.next,
          },
        ],
        when: {
          show: () => {
            this.layoutState.blockBody()
     
          },
          hide: () => {
            this.layoutState.unblockBody()
          },
        },
      },
      {
        id: 'step-5',
        classes: 'step-stats',
        text: 'El gráfico de visitas es una herramienta poderosa para entender el rendimiento de tu tienda. Podrás tomar decisiones en base a tus visitas para mejorar tu estrategia de marketing, aumentar el tráfico y, en última instancia, impulsar las ventas',
        attachTo: {
          element: '#chart-views',
          on: 'bottom',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherdMain.next,
          },
       
        ],
        when: {
          show: () => {
            this.layoutState.blockBody()
          },
          hide: () => {
            this.layoutState.unblockBody()
          },
        },
      },
      {
        id: 'step-6',
        classes: 'step-stats',
        text: 'El gráfico de ventas muestra la cantidad de ingresos generados por tu tienda durante un período de tiempo específico. La línea trazada en el gráfico representa la tendencia de las ventas a lo largo del tiempo. Ten en cuenta que no todas las ventas pueden completarse con éxito por lo que el total es aproximado',
        attachTo: {
          element: '#chart-sales',
          on: 'bottom',
        },
        buttons: [
          {
            text: 'Finalizar',
            action: shepherdMain.complete,
          }
        ],
        when: {
          show: () => {
            this.layoutState.unblockBody()
          },
          hide: () => {
          },
        },
      },
    ]);
  }

  ngOnDestroy(): void {
    // this.layoutState.state.navigation = true
  }
}
