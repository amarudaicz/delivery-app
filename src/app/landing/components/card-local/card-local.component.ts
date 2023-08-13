import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Local } from 'src/app/interfaces/local-interface';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { AlertLocalClosedComponent } from '../alert-local-closed/alert-local-closed.component';

@Component({
  selector: 'app-card-local',
  templateUrl: './card-local.component.html',
  styleUrls: ['./card-local.component.scss']
})
export class CardLocalComponent implements OnInit {

  @Input() local?: any

  constructor(
    private router: Router,
    private layoutState: LayoutStateService,
    private localData: LocalDataService,
    private themeService: ThemesService,
    private previewCategory: PreviewCategoryService,
    private matDialog: MatDialog) {


  }

  ngOnInit(): void {

  }

  redirectLocal() {
    this.localData.resetData()
    this.localData.load = true

    setTimeout(() => {
      this.layoutState.state.menuMobile = false
      this.layoutState.updateState()
      this.themeService.stateTheme.next(false)
      this.previewCategory.category_id = undefined
      this.previewCategory.productsByCategory.next([])
      this.router.navigate([this.local.name_url])
      
    }, 100);

  }

  preRedirect() {
    if (this.islocalOpen(this.local)) {
      this.redirectLocal()
    } else {

      const dialogRef = this.matDialog.open(AlertLocalClosedComponent, {
        width: window.innerWidth > 1024 ? '55%' : '95%',
        panelClass:'shadow-2'
      })

      dialogRef.afterClosed().subscribe(confirm => {
        if (confirm) {
          this.redirectLocal()
        }
      })

    }


  }

  islocalOpen(local: Local) {

    // const { horarios } = local
    // const currentDate = new Date()
    // const currentHours = currentDate.getHours();
    // const currentMinutes = currentDate.getMinutes();
    // let currentDay = currentDate.toLocaleString('es-AR', { weekday: 'short' });
    // currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);
    // let openingHours;

    // if (horarios?.semana.dias.includes(currentDay)) {
    //   openingHours = horarios?.semana;
    // } else if (horarios?.finDeSemana.dias.includes(currentDay)) {
    //   openingHours = horarios?.finDeSemana;
    // } else {
    //   return false; // El negocio está cerrado porque no es el día correspondiente
    // }

    // const maIn = this.getTimeFromString(openingHours.maIn);
    // const maFn = this.getTimeFromString(openingHours.maFn);
    // const taIn = this.getTimeFromString(openingHours.taIn);
    // const taFn = this.getTimeFromString(openingHours.taFn);

    // if (
    //   (currentHours > maIn.hours || (currentHours === maIn.hours && currentMinutes >= maIn.minutes)) &&
    //   (currentHours < maFn.hours || (currentHours === maFn.hours && currentMinutes <= maFn.minutes))
    // ) {
    //   return true; // El negocio está abierto en la mañana
    // }

    // if (
    //   (currentHours > taIn.hours || (currentHours === taIn.hours && currentMinutes >= taIn.minutes)) &&
    //   (currentHours < taFn.hours || (currentHours === taFn.hours && currentMinutes <= taFn.minutes))
    // ) {
    //   return true; // El negocio está abierto en la tarde/noche
    // }

    return false; // El negocio está cerrado en la hora actual
  }




  getTimeFromString(timeString: string) {
    if (!timeString) {
      return {
        hours: 0,
        minutes: 0
      }
    }
    const [hours, minutes] = timeString?.split(/[ap]m/)[0].split(':');
    return {
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10)
    };
  }


}
