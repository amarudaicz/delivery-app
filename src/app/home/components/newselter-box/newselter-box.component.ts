import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-newselter-box',
  templateUrl: './newselter-box.component.html',
  styleUrls: ['./newselter-box.component.scss']
})
export class NewselterBoxComponent implements OnInit {
  constructor(
    public theme:ThemesService,
    private matSnackBar:MatSnackBar
  ){}


  deferredPrompt:any;


  ngOnInit(): void {
    this.deferredPrompt = (window as any).deferredPrompt
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault()
      this.deferredPrompt = event;
    });
    console.log('actual');
    
      
  }

  install(): void {
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        
        this.matSnackBar.open('Instalando', '', {
          duration: 3000
        })
        
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
    });
  }


}
