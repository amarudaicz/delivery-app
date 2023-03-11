import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    window.addEventListener('beforeinstallprompt', (event: any) => this.setPromt(event));
      
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
      this.deferredPrompt = null
      window.removeEventListener('beforeinstallprompt', (event:any) => this.setPromt(event) )
    });
  }

  setPromt(event:Event){
    event.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = event;

  }

}
