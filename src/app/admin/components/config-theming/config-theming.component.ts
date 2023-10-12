import { Component, OnInit, OnDestroy } from '@angular/core';
import { Local } from 'src/app/interfaces/local-interface';
import { Theme } from 'src/app/interfaces/theme-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-config-theming',
  templateUrl: './config-theming.component.html',
  styleUrls: ['./config-theming.component.scss'],
})
export class ConfigThemingComponent implements OnInit {
  currentTheme: any | Theme;
  currentProp: string[] = [];
  allThemes?: any[];
  local?:Local
  disableRadio:boolean = false

  constructor(private theme: ThemesService, private adminService:AdminService, private notificationsAdmin:NotificationsAdminService) {}

  ngOnInit(): void {

    this.adminService.local$.subscribe(local=>{
      if (!local) return 
      this.local = local
      this.theme.setTheme(local.theme)
      this.currentTheme = this.theme.getTheme(local.theme);
      this.currentProp = Object.keys(this.currentTheme).splice(2, 10);
      this.allThemes = this.theme.themes.filter(t=>t.id !== local.theme);
    })

  }

  changeThemeLocal(themeId:number) {
    console.log(themeId);
    this.disableRadio = true
    this.adminService.updateLocal({theme:themeId}).subscribe(res=>{
      this.notificationsAdmin.new('Colores de la tienda actualizados con exito')
      this.local!.theme = themeId
      this.currentTheme = this.theme.getTheme(themeId);
      this.allThemes = this.theme.themes.filter(t=>t.id !== themeId);
      this.disableRadio = false
    })

    //CAMBIAR EL THEME EN LA DB

  }

 
}