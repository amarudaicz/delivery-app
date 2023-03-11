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
  ){}


  deferredPrompt:any;


  ngOnInit(): void {
    this.deferredPrompt = (window as any).deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (event: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = event;
      // Update UI to notify the user they can add to home screen
    });
      
    console.log(this.deferredPrompt);
  }

  install(): void {
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
    });
  }


}
