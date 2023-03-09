import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-modal-info-wp',
  templateUrl: './modal-info-wp.component.html',
  styleUrls: ['./modal-info-wp.component.scss']
})
export class ModalInfoWpComponent {

  constructor(
    private matDialog:MatDialog,
    public theme:ThemesService

  ){

  }


}
