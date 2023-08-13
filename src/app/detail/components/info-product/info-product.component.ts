import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {

  constructor(public theme:ThemesService, private route:ActivatedRoute, private location:Location){

  }

  ngOnInit(): void {
    this.scrollToOptions()
  }

  
  @ViewChild('optionsDisplay', { static: true }) optionsDisplay?: ElementRef<HTMLDivElement>;

  @Input() product:any
  @Input() modePreview:boolean = false
  favClicked:boolean = false
  
  redirectBack(){
    this.location.back()
  }

  toogleFav(){
    this.favClicked = !this.favClicked
  }

  scrollToOptions() {
    const divElement: HTMLElement = this.optionsDisplay!.nativeElement;
    divElement.scrollIntoView()
  }

}
