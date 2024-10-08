import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Local } from 'src/app/interfaces/local-interface';
import { PwaInstallerService } from 'src/app/services/pwa-installer/pwa-installer.service';
import { RecentsService } from 'src/app/services/recents/recents.service';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss']
})
export class RecentsComponent implements OnInit  {

  locals?:Local[]
  recentsCharged:boolean=false

  constructor(private http:HttpClient, private recentsService:RecentsService){

    this.getRecents()
    
  }
  
  ngOnInit(): void {
    this.recentsService.getRecents().subscribe()
  }

  getRecents(){
    this.recentsService.recents$.subscribe((locals)=>{
      if (locals !== undefined) {
        this.recentsCharged = true
      }
      console.log(locals);
      this.locals = locals
      
    })
  }

}
