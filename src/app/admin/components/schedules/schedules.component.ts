import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Days, Local, Schedules } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
})
export class SchedulesComponent {
  form: FormGroup;
  hours: string[];
  days: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
  @Output() editing = new EventEmitter<boolean>();

  loadForm: boolean = false;
  formArrayDays: FormArray;
  local?:Local;
  formComplete:boolean=false
  formChanged:boolean = false


  
  constructor(
    private formBuilder: FormBuilder,
    public adminService: AdminService,
    private notificationsAdmin: NotificationsAdminService,
    public localService:LocalDataService
  ) {

    this.hours = this.genHours();
    this.form = this.formBuilder.group({
      days: this.formBuilder.array([]), // FormArray para los días
    });

    const daysFormArray = this.form.get('days') as FormArray;
    this.formArrayDays = daysFormArray;

    this.adminService.local$.subscribe(local=>{
      
      console.log(local);
      
      if (!local) return
      this.local = local

      if (!this.formComplete) {
        for (const [i, day] of this.days.entries()) {
          console.log(day);
          
          const dayFormGroup = this.formBuilder.group({
            name: this.getDayShort(day),
            open: false,
            shifts: local.schedules ? this.formBuilder.array(this.setShiftsDay(local.schedules.days[i])) : this.formBuilder.array([]) // FormArray para los turnos
          });
    
          daysFormArray.push(dayFormGroup);
        }
        this.formComplete = true
      }
  
      this.form.patchValue(local.schedules);
      console.log(this.form);

    })

  }

  submitForm() {

    if (this.form.invalid) {
      this.notificationsAdmin.new('Completar los campos requeridos');
      this.form.markAllAsTouched()
      return;
    }

    if (!this.form.dirty) {
      this.editing.emit(true)
      return
    }

    this.loadForm = true;
    this.adminService.updateSchedules(this.form.value).pipe(
      catchError(({error}) => {
        this.loadForm = false;
        return handleError(error, this.notificationsAdmin);
      })).subscribe((res) => {
        this.local!.schedules = this.form.value
        this.adminService.local$.next(this.local)
        // this.adminService.getLocal().subscribe()
        this.notificationsAdmin.new('Horarios actualizados con exito', 'Ok', {push: true,});
        this.editing.emit(true);
        this.loadForm = false;
        this.form.markAsPristine()
      });
  }

 
  getShiftsFormArray(dayFormGroup: any): FormArray {
    return dayFormGroup.get('shifts') as FormArray;
  }

  getDayShort(day: string) {
    const lowercaseDay = day.toLowerCase();

    // Remove accents using regular expressions
    const withoutAccents = lowercaseDay
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    // Get the first three letters
    const firstThreeLetters = withoutAccents.slice(0, 3);

    return firstThreeLetters;
  }

  setShiftsDay(day: any) {
    const shifts = day.shifts.map((e: any) =>
      this.formBuilder.group({ start: e.start, end: e.end })
    );
    return shifts;
  }

  createShiftsDay() {
    return this.formBuilder.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });
  }

  addShift(dayFormGroup: any) {
    const shiftsArray = this.getShiftsFormArray(dayFormGroup);
    shiftsArray.push(this.createShiftsDay());
  }

  removeShift(dayFormGroup: any, index: number) {
    const shiftsArray = this.getShiftsFormArray(dayFormGroup);
    shiftsArray.removeAt(index);
    this.form.markAsDirty()
  }

  genHours() {
    let horas = [];
    for (let hora = 0; hora < 24; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 15) {
        let horaFormateada =
          ('0' + hora).slice(-2) + ':' + ('0' + minuto).slice(-2);
        horas.push(horaFormateada);
      }
    }
    return horas;
  }

}
