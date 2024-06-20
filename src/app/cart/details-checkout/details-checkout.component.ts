import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-details-checkout',
  templateUrl: './details-checkout.component.html',
  styleUrls: ['./details-checkout.component.scss']
})
export class DetailsCheckoutComponent {
  constructor( @Inject(MAT_DIALOG_DATA) public data:{total:number,shipping:number}){
    console.log(this.data)
    window.history.pushState({ modal: true }, 'modal');
    
  }


}
