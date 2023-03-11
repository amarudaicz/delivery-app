import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, map } from 'rxjs';
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
    fromEvent(window, 'beforeinstallprompt')
    .pipe(
      map((event: any) => {
        event.preventDefault();
        this.deferredPrompt = event;
      })
    )
    .subscribe();
    console.log(this.deferredPrompt);
  }

  install(): void {
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        this.deferredPrompt = null;
      } else {
        console.log('User dismissed the install prompt');
        this.ngOnInit()
      }
    });
  }


}
