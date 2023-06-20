import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { PwaInstallerService } from 'src/app/services/pwa-installer/pwa-installer.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{
  

  @Input() banner?:any
  @Output() emitBanner = new EventEmitter<number>()

  showImage:boolean = false
  

  
  
  
  
  constructor(private pwa:PwaInstallerService, private layoutState:LayoutStateService){

  }
  
  ngOnInit(): void{
    

  }


  actionLanding(){

    if (this.banner.action.finish) {
      this.emitBanner.emit(0)
      localStorage.setItem('landing-banner', 'true')
      return
    }

    if (this.banner.action){
      this.banner.action()
    }
    
  }

  nextBanner(){
    this.emitBanner.emit(this.banner.next)
  }
}
