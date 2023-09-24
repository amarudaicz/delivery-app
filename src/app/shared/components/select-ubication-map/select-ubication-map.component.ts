import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  MapMouseEvent,
  NavigationControl,
} from '@tomtom-international/web-sdk-maps';
import { LatLng } from '@tomtom-international/web-sdk-services';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { TomtomService } from 'src/app/services/tomtom-service/tomtom.service';

@Component({
  selector: 'app-select-ubication-map',
  templateUrl: './select-ubication-map.component.html',
  styleUrls: ['./select-ubication-map.component.scss'],
})
export class SelectUbicationMapComponent implements OnDestroy {
  currentMarker: any;
  cords: any;
  map: any;
  @Output() emitCords = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  constructor(
    private tomtom: TomtomService,
    private layout: LayoutStateService
  ) {
    setTimeout(() => {
      this.displayMapView();
    }, 200);
  }


  async displayMapView() {
    this.layout.blockBody();
    this.map = await this.tomtom.getMap('mapContainer');
    this.map.on('click', (event: MapMouseEvent<'click'>) => {
      console.log(event);
      const { lng, lat } = event.lngLat;

      if (this.currentMarker) {
        this.currentMarker.remove();
      }

      this.currentMarker = this.tomtom.addMarker(lng, lat, this.map);
    });

    const navControl = new NavigationControl({
      showZoom: true, // Mostrar control de zoom
      showPitch: false, // No mostrar control de inclinación
    });

    this.map.addControl(navControl, 'top-right');
  }

  saveMarker() {

    if (!this.currentMarker) {
      return;
    }
    this.cords = this.currentMarker.getLngLat();
    console.log(this.cords);
    this.emitCords.emit(this.cords);
    this.closeMap()

  }


  closeMap(){
    this.close.emit(true)
  }
  
  ngOnDestroy(): void {
    this.layout.unblockBody();
  }

  
}
