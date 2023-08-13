import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import Step from 'shepherd.js/src/types/step';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { shepherd } from 'src/app/utils/shepherd-tour';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss'],
  providers: [],
})
export class MainAdminComponent implements OnInit, OnDestroy {
  chartData: any;
  chartOptions: any;

  constructor(
    private layoutState: LayoutStateService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.continueTutorial();
    this.adminService.getSales();
    this.adminService.getStats();
  }

  checkAdmin(): void {}

  continueTutorial() {
    shepherd.addSteps([
      {
        id: 'step3',
        classes: 'step-list-products',
        text: 'Aquí puedes ver la lista de los productos disponibles en tu plataforma. Puedes filtrarlos por categoría o buscarlos por nombre. Si encuentras algo que quieres modificar, puedes hacer clic en el botón "Lupa" para ver más información sobre el producto y editarla.',
        attachTo: {
          element: '#listProduct',
          on: 'top',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherd.next,
          },
        ],
        when: {
          show: () => {
            const element = document.querySelector(
              '.container-table-products'
            ) as HTMLElement;
            element.style.zIndex = '9999';
            element.style.position = 'relative';
          },
          hide: () => {
            const element = document.querySelector(
              '.container-table-products'
            ) as HTMLElement;
            element.style.zIndex = '1';
            element.style.position = 'initial';
          },
        },
      },
      {
        id: 'step4',
        classes: 'step-new-product',
        text: 'Si quieres vender un nuevo producto, puedes hacerlo a través de este formulario. Completando cada paso y luego guardandolo aparecera en la tabla de productos',
        attachTo: {
          element: '#newProduct',
          on: 'top',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherd.next,
          },
        ],
        when: {
          show: () => {
            const element = document.querySelector(
              '.new-product'
            ) as HTMLElement;
            element.style.zIndex = '9999';
            element.style.position = 'relative';
          },
          hide: () => {
            const element = document.querySelector(
              '.new-product'
            ) as HTMLElement;
            element.style.zIndex = '1';
            element.style.position = 'initial';
          },
        },
      },
      {
        id: 'step5',
        classes: 'step-initial-form',
        text: 'Aqui estan los datos principales del producto como el Nombre, Categoria, Precio. Tambien hay un apartado para cargar la imagen principal, los datos que completes aca seran los que verá el clientes en el detalle del producto.',
        attachTo: {
          element: '#initialForm',
          on: 'top',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherd.next,
          },
        ],
        when: {
          hide: () => {},
        },
      },
    ]);
  }

  ngOnDestroy(): void {
    // this.layoutState.state.navigation = true
  }
}
