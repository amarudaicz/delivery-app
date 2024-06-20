import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PwaInstallerService } from 'src/app/services/pwa-installer/pwa-installer.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-newselter-box',
  templateUrl: './newselter-box.component.html',
  styleUrls: ['./newselter-box.component.scss']
})
export class NewselterBoxComponent implements OnInit {
  constructor(
    public theme:ThemesService,
    private pwaInstaller:PwaInstallerService
  ){}



  ngOnInit(): void {

      
  }

  install(): void {
    if (this.pwaInstaller.canInstall()) {
      this.pwaInstaller.promptInstall()
    }
 
  }

  setPromt(event:Event){
    
  }

}
