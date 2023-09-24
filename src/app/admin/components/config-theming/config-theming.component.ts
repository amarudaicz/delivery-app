import { Component, OnInit, OnDestroy } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-config-theming',
  templateUrl: './config-theming.component.html',
  styleUrls: ['./config-theming.component.scss'],
})
export class ConfigThemingComponent implements OnInit {
  currentTheme: any | Theme;
  currentProp: string[] = [];
  allThemes: any|Theme[];

  constructor(private theme: ThemesService, private adminService:AdminService) {}

  ngOnInit(): void {

    this.adminService.local$.subscribe(data=>{
      console.log(data);
      
      if (!data) return 

      this.theme.setTheme(data.theme)
      this.currentTheme = this.theme.getCurrentTheme();
      this.currentProp = Object.keys(this.currentTheme).splice(2, 10);
      this.allThemes = this.theme.getAllThemes();
    })

  }

  changeThemeLocal(idTheme:number) {
    console.log(idTheme);

    //CAMBIAR EL THEME EN LA DB

  }

 
}