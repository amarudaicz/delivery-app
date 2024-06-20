import { AfterViewChecked, Component } from '@angular/core';

@Component({
  selector: 'app-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss']
})
export class HowToBuyComponent implements AfterViewChecked {
  constructor(){
    this.showImage()

  }
  images: string[] = ['imagen1.jpg', 'imagen2.jpg']; // Ruta de las imágenes
  currentIndex = 0;
  showGif:boolean = false

  ngAfterViewChecked(): void {
      this.showGif = true
  }
  
  showImage() {
    setInterval(() => {
      this.currentIndex = this.currentIndex === 0 ? 1 : 0
    },  this.currentIndex === 0 ? 10000 : 5000);
  }
}

