import { Component } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss']
})
export class MainDetailComponent {
  
constructor(public theme:ThemesService){


}

product:any = {
  id:1,
  name:'Mozzarella',
  category:'Pizzas',
  image:'https://img.freepik.com/fotos-premium/pizza-mozzarella-aceitunas-tabla-madera_311379-1163.jpg?w=2000',
  price:700,
  description:'Deliciosa masa de pizza elaborada con los ingredientes tradicionales y un toque especial de leche, que le da una suavidad y sabor inigualable.Cocida en un horno especial para masas a la piedra logrando un piso crocante.Cubierta con una sabrosa salsa de tomate con especias y queso mozzarella.',
  ingredients:['Harina de trigo', 'Queso mozzarella', 'Agua', 'Salsa de tomate', 'Aceite de girasol', 'Sal', 'Orégano', 'Ají molido'],
  options:{
    porcion:['Media', 'Completa']
  }

}

}
