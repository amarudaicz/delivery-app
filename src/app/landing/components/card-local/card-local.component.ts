import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Local } from 'src/app/interfaces/local-interface';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { AlertLocalClosedComponent } from '../alert-local-closed/alert-local-closed.component';
import { CartService } from 'src/app/services/cartData/cart.service';

@Component({
  selector: 'app-card-local',
  templateUrl: './card-local.component.html',
  styleUrls: ['./card-local.component.scss']
})
export class CardLocalComponent implements OnInit {

  @Input() local!: Local

  constructor(
    private router: Router,
    private layoutState: LayoutStateService,
    public localData: LocalDataService,
    private themeService: ThemesService,
    private previewCategory: PreviewCategoryService,
    private matDialog: MatDialog,
    private cartService: CartService
    ) {


  }

  ngOnInit(): void {

  }

  redirectLocal() {
    this.localData.resetData()

    setTimeout(() => {
      this.layoutState.state.menuMobile = false
      this.layoutState.updateState()
      this.themeService.stateTheme.next(false)
      this.previewCategory.category_id = undefined
      this.previewCategory.productsByCategory.next([])
      this.router.navigate([this.local?.name_url])
      
    }, 100);

  }

  preRedirect() {

    if (this.localData.islocalOpen(this.local?.schedules!)){
      this.redirectLocal()
      return
    }

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
