import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { shepherdListProducts } from 'src/app/utils/shepherd-tour';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent {


  section:any

  constructor(private adminService:AdminService, private dinamicList:DinamicListService, private layoutService:LayoutService){

    this.dinamicList.section.subscribe((section:any)=>{
      this.section = section
    })

    this.hideDashboard()
    this.continueTutorial()
  }
  
  
  hideDashboard(){
    this.layoutService.state.staticMenuDesktopInactive = true
  }

  continueTutorial() {
    const watched = localStorage.getItem('shepherd-list-products')
    shepherdListProducts.addSteps([
      {
        id: 'step-7',
        classes: 'step-list-products',
        text: 'Dentro de la sección de productos encontrarás todo lo necesario para administrar tu catálogo de productos, deberás crear todas las categorías que necesites y dentro de cada categoría los productos correspondientes',
        attachTo: {
          element: '',
          on: '',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherdListProducts.next,
          },
     
        ],
        when: {
          show: () => {
      
          },
          hide: () => {
         
          },
        },
      },
      {
        id: 'step-8',
        classes: 'step-new-product',
        text: 'Para crear una categoría pulsa el botón + Nueva categoría, completa el formulario, agrega una imagen, guarda los datos y listo, podrás visualizar la categoría en la lista.',
        attachTo: {
          element: '#new-category',
          on: 'bottom',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherdListProducts.next,
          },
      
        ],
        when: {
          show: () => {
         
          },
          hide: () => {
           
          },
        },
      },
      {
        id: 'step-9',
        classes: 'step-initial-form',
        text: 'Podrás crear "Grupo de Opciones" que se refiere a las diferentes variantes o atributos que un producto puede tener en tu tienda. Esto permite a los clientes elegir entre varias opciones del mismo producto. Estos grupos de opciones pueden incluir características como talla, color, sabor, capacidad, material, cantidad.',
        attachTo: {
          element: '#options-group',
          on: 'bottom',
        },
        buttons: [
          {
            text: 'Finalizar',
            action: shepherdListProducts.complete,
          },
       
        ],
        when: {
        },
      },
    ]);

    if (!watched) {
      shepherdListProducts.start();
    }
  }

}
