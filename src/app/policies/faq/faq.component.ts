import { Component, OnDestroy, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wpService/wp.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {


  constructor(public wp:WpService){}
  ngOnInit(): void {
    document.body.style.background = '#fff'

  }
  currentFaqThemeId=1

  faqThemes = [
    {
      id:1,
      name:'General',
    },{
      id:2,
      name:'Tienda'

    },
    {
      id:3,
      name:'Pagos'

    }
  ]

  setFaqTeme(themeId:any){
    this.currentFaqThemeId = themeId

  }

  ngOnDestroy(): void {
    document.body.style.background = ''
  }
}
