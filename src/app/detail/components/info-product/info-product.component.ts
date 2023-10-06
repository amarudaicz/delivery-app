import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {

  constructor(public theme:ThemesService, private router:Router, private location:Location){

  }

  ngOnInit(): void {
    this.scrollToOptions()
  }

  
  @ViewChild('optionsDisplay', { static: true }) optionsDisplay?: ElementRef<HTMLDivElement>;

  @Input() product:any
  @Input() modePreview:boolean = false
  favClicked:boolean = false
  
  redirectBack(){
    try {
      this.location.back();
    } catch (err) {
      this.router.navigate(['/']);
    }
  }
    

  toogleFav(){
    this.favClicked = !this.favClicked
  }

  scrollToOptions() {
    const divElement: HTMLElement = this.optionsDisplay!.nativeElement;
    divElement.scrollIntoView()
  }

}
