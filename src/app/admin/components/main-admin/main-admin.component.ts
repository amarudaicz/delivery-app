import { Component,OnInit } from '@angular/core';
import Step from 'shepherd.js/src/types/step';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { shepherd } from 'src/app/utils/shepherd-tour';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent  implements OnInit{

  ngOnInit(): void {
    this.initChart()
    this.continueTutorial()
    this.layoutState.state.header=false
    this.layoutState.updateState()
    
    
    this.localData.setLocal(localStorage.getItem('admin-local'))
}

  constructor(
    private layoutState:LayoutStateService,
    private localData:LocalDataService
  ){

  }

  chartData:any
  chartOptions:any
  
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4 
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    continueTutorial(){
       
        shepherd.addSteps(
            [
                {
                  id: 'step3',
                  classes:'step-list-products',
                  text: 'Aquí puedes ver la lista de los productos disponibles en tu plataforma. Puedes filtrarlos por categoría o buscarlos por nombre. Si encuentras algo que quieres modificar, puedes hacer clic en el botón "Lupa" para ver más información sobre el producto y editarla.',
                  attachTo: {
                    element: '#listProduct',
                    on: 'top' 
                  },
                  buttons:[
                      {
                        text:'Siguiente',
                        action:shepherd.next
                      }
                  ],
                  when:{
                    show:()=>{
                        const element = (document.querySelector('.container-table-products') as HTMLElement);
                        element.style.zIndex = '9999';
                        element.style.position = 'relative';
                    },
                    hide:()=>{
                        const element = (document.querySelector('.container-table-products') as HTMLElement);
                        element.style.zIndex = '1';
                        element.style.position = 'initial';

                    }
                  }
                  
                },
                {
                    id: 'step4',
                    classes: 'step-new-product',
                    text: 'Si quieres vender un nuevo producto, puedes hacerlo a través de este formulario. Completando cada paso y luego guardandolo aparecera en la tabla de productos',
                    attachTo: {
                      element: '#newProduct',
                      on: 'top' 
                    },
                    buttons:[
                        {
                          text:'Siguiente',
                          action:shepherd.next
                        }
                    ],
                    when:{
                        show:()=>{
                            const element = (document.querySelector('.new-product') as HTMLElement);
                            element.style.zIndex = '9999';
                            element.style.position = 'relative';
                        },
                        hide:()=>{
                            const element = (document.querySelector('.new-product') as HTMLElement);
                            element.style.zIndex = '1';
                            element.style.position = 'initial';

                        }
                    }
                    
                  },
                  {
                      id: 'step5',
                      classes: 'step-initial-form',
                      text: 'Aqui estan los datos principales del producto como el Nombre, Categoria, Precio. Tambien hay un apartado para cargar la imagen principal, los datos que completes aca seran los que verá el clientes en el detalle del producto.',
                      attachTo: {
                        element: '#initialForm',
                        on: 'top' 
                      },
                      buttons:[
                          {
                            text:'Siguiente',
                            action:shepherd.next
                          }
                      ],
                      when:{

                          hide:()=>{
                           
                          }
                      }
                      
                    },
            ]
        )
    }




}
