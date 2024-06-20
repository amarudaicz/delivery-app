import { Component, Input } from '@angular/core';
import { ThemesService, themeProperty } from 'src/app/services/themes/themes.service';

export interface FeatureModel{
  emoji:string,
  title:string,
  subtitle:string
  background:themeProperty
}

@Component({
  selector: 'app-feature-in-home',
  templateUrl: './feature-in-home.component.html',
  styleUrls: ['./feature-in-home.component.scss']
})
export class FeatureInHomeComponent {

  constructor(public theme:ThemesService){

  }
  @Input() feature?:FeatureModel 

}
