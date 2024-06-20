import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { ModalInfoLocalComponent } from 'src/app/shared/components/modal-info-local/modal-info-local.component';

@Component({
  selector: 'app-alert-closed',
  templateUrl: './alert-closed.component.html',
  styleUrls: ['./alert-closed.component.scss']
})
export class AlertClosedComponent {

  
  showAlert:boolean=false

  constructor(public localService:LocalDataService, public theme:ThemesService, private dialog:MatDialog){

    this.localService.local$.subscribe(local=>{
      if(!local) return ;
      this.showAlert = !localService.islocalOpen(local.schedules)
    })
  }


  openInfo(){
    this.dialog.open(ModalInfoLocalComponent)
  }

}
