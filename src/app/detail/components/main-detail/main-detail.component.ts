import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss'],
  animations: [
    fadeIn
  ]
})
export class MainDetailComponent implements OnInit {
  constructor(
    public theme: ThemesService,
    private routeData: RouteDataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.product = {
        id: this.route.snapshot.queryParams['id'],
        name: 'Mozzarella',
        category: 'Pizzas',
        image:
          'https://img.freepik.com/fotos-premium/pizza-mozzarella-aceitunas-tabla-madera_311379-1163.jpg?w=2000',
        price: 700,
        description:
          'Deliciosa masa de pizza elaborada con los ingredientes tradicionales y un toque especial de leche, que le da una suavidad y sabor inigualable.Cocida en un horno especial para masas a la piedra logrando un piso crocante.Cubierta con una sabrosa salsa de tomate con especias y queso mozzarella.',
        ingredients: [
          'Harina de trigo',
          'Queso mozzarella',
          'Agua',
          'Salsa de tomate',
          'Aceite de girasol',
          'Sal',
          'Orégano',
          'Ají molido',
        ],
        options: {
          porcion: ['Media', 'Completa'],
        },
      };
    }, 0);

    console.log(this.route.snapshot.queryParams);
    
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.deferredPrompt = event;
    });


    this.installApp()
    
  }

  deferredPrompt: any;

  installApp() {

    if (this.deferredPrompt) {

      this.deferredPrompt.prompt();

      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {

          console.log('El usuario ha aceptado la instalación de la aplicación');

        } else {
          console.log('El usuario ha rechazado la instalación de la aplicación');
        }
        this.deferredPrompt = null;
      });

    } else {
      console.log('EROR');
      
      // window.open('enlace a la tienda de aplicaciones');
    }
  }

  product: any;
}
