import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  currentFaqThemeId=1

  faqThemes = [
    {
      id:1,
      name:'General',
    },{
      id:2,
      name:'Tienda'

    },{
      id:3,
      name:'Clientes'

    },{
      id:4,
      name:'Pagos'

    }
  ]

  setFaqTeme(themeId:any){
    this.currentFaqThemeId = themeId

  }

}
