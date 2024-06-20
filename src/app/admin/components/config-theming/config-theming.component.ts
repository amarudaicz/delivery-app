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
  local?: Local;
  background: string = '';
  backgroundSec: string = '';
  disableRadio: boolean = false;

  constructor(
    private theme: ThemesService,
    private adminService: AdminService,
    private notificationsAdmin: NotificationsAdminService
  ) {}

  ngOnInit(): void {
    this.adminService.local$.subscribe((local) => {
      if (!local) return;
      this.local = local;
      this.currentTheme =  !isNaN(this.local.theme) ? this.theme.getTheme(local.theme) : {...JSON.parse(this.local.theme), name:'Personalizado'};
      this.currentProp = Object.keys(this.theme.themes[0]).splice(2, 10);
      this.allThemes = this.theme.themes.filter((t) => t.id !== Number(this.local!.theme));

      if(isNaN(local.theme)){
        const theme = JSON.parse(local.theme)
        console.log(theme);
        this.background = theme.background
        this.backgroundSec = theme.backgroundSec
      }

    });
  }

  changeThemeLocal(themeId: number) {
    console.log(themeId);
    this.disableRadio = true;
    this.adminService.updateLocal({ theme: themeId }).subscribe((res) => {
      this.notificationsAdmin.new(
        'Colores de la tienda actualizados con éxito'
      );

      this.local!.theme = themeId;
      this.currentTheme = this.theme.getTheme(themeId);
      this.allThemes = this.theme.themes.filter((t) => t.id !== themeId);
      this.disableRadio = false;
    });
  }

  setPersonalTheme() {
    const theme = {
      background: this.background,
      backgroundSec: this.backgroundSec,
      name:'Personalizado',
      id:99
    };

    if (!this.isOkThemePersonal(theme)) {
      this.notificationsAdmin.new(
        'Revise que los códigos Hexadecimales sean correctos e incluyan "#" '
      );
      return
    }

    this.adminService.updateLocal({theme:JSON.stringify(theme)}).subscribe((res) => {
      this.notificationsAdmin.new(
        'Colores de la tienda actualizados con éxito'
      );

      this.local!.theme = theme
      this.allThemes = this.theme.themes.filter((t) => t.id !== this.local!.theme.id);
      this.currentTheme = theme;
    })
  }

  deleteThemePersonal() {
    this.notificationsAdmin
      .new(
        'Realmente quiere eliminar su tema personalizado? se establecerá el tema por defecto',
        'Eliminar'
      )
      .onAction()
      .subscribe((ok) => {
        this.adminService.updateLocal({theme:1}).subscribe((res) => {
          this.notificationsAdmin.new(
            'Colores de la tienda actualizados con éxito'
          );
          this.currentTheme = this.theme.themes[0]
          this.allThemes = this.theme.themes.filter((t) => t.id !== 1);
          this.background = '';
          this.backgroundSec = '';
        })
      });
  }

  isHexadecimal(code: string) {
    return code.includes('#');
  }

  isOkThemePersonal(theme: { background: string; backgroundSec: string }) {
    return (
      this.isHexadecimal(theme.background) &&
      this.isHexadecimal(theme.backgroundSec)
    );
  }
}
