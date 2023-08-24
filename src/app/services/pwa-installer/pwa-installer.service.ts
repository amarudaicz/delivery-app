import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaInstallerService {

  private deferredPrompt: any;

  constructor(private swUpdate:SwUpdate, private snackBar:MatSnackBar) {
    fromEvent(window, 'beforeinstallprompt').subscribe((event: Event) => {
      this.deferredPrompt = event;
    });
  }

  public promptInstall(): void {
    console.log('PROMPTEANDO');
    
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log('El usuario eligió', choiceResult.outcome);
        this.deferredPrompt = null;
      });
    }
  }

  public canInstall(): boolean {
    return !!this.deferredPrompt;
  }


  public isPwaMode():boolean{
    if (window.matchMedia('(display-mode: standalone)').matches)
    return true

    return false
  }

  redirectPwa(){
    
    if ((navigator as any).appInstalled) {
      // La PWA está instalada
      console.log('La PWA está instalada');
      
    } else {
      // La PWA no está instalada
    }

  }


  checkForUpdates() {

    if (!this.swUpdate.isEnabled) {
      console.log('Not Enabled');
      return;
    }

    this.swUpdate.versionUpdates.subscribe((event:VersionEvent) => {
      if (event.type === 'VERSION_DETECTED') {
        this.showUpdateNotification();
      }
    });
  }

  private showUpdateNotification() {
    const snackBarRef = this.snackBar.open('Hay una nueva actualización disponible.', 'Actualizar');

    // snackBarRef.onAction().subscribe(() => {
    //   this.swUpdate.checkForUpdate().then(version => location.reload())
    //   window.location.reload();
    // });
  }


}
