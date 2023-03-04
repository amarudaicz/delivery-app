import { Component } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-loader-full',
  templateUrl: './loader-full.component.html',
  styleUrls: ['./loader-full.component.scss']
})
export class LoaderFullComponent {
  constructor(public theme:ThemesService){

  }

}
