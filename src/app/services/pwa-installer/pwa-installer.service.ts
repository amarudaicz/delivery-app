import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaInstallerService {

  private deferredPrompt: any;

  constructor() {
    fromEvent(window, 'beforeinstallprompt').subscribe((event: Event) => {
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
    if (window.matchMedia('(display-mode: standalone)').matches)
    return true

    else
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


}
