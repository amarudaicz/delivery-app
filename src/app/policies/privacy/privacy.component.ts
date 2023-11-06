import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    document.body.style.background = '#fff'
    
  }



  ngOnDestroy(): void {
    document.body.style.background = ''
    
  }
}
