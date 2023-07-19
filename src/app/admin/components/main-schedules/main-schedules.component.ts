import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';

@Component({
  selector: 'app-main-schedules',
  templateUrl: './main-schedules.component.html',
  styleUrls: ['./main-schedules.component.scss'],
})
export class MainSchedulesComponent {
  editing: boolean = false;


  days: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  fullDay(day:string) {
    day = day.toLowerCase(); // Convertir a minúsculas para asegurar coincidencia
  
    switch (day) {
      case 'lun':
        return 'Lunes';
      case 'mar':
        return 'Martes';
      case 'mie':
        return 'Miércoles';
      case 'jue':
        return 'Jueves';
      case 'vie':
        return 'Viernes';
      case 'sab':
        return 'Sábado';
      case 'dom':
        return 'Domingo';
      default:
        return 'Día inválido';
    }
  }
  
  constructor(
    public adminService: AdminService,
    public localService: LocalDataService
  ) {}
}
