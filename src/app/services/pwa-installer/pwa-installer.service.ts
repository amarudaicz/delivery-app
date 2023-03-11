import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaInstallerService {

  private deferredPrompt: any;

  constructor() {
    fromEvent(window, 'beforeinstallprompt').subscribe((event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

  public promptInstall(): void {
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
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true
      console.log('stanDLONE');
    }else{
      return false
    }
  }
}
