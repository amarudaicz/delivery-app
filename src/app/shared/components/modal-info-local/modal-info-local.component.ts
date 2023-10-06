import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/services/localData/local-data.service';

@Component({
  selector: 'app-modal-info-local',
  templateUrl: './modal-info-local.component.html',
  styleUrls: ['./modal-info-local.component.scss']
})
export class ModalInfoLocalComponent {
  constructor(public localService:LocalDataService){}

}
