import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, ErrorHandler, EventEmitter, OnDestroy, Output, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { interval } from 'rxjs';
import { enterRight } from 'src/app/animations/main-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { OptionProduct, DetailsOptions } from 'src/app/interfaces/optionProduct-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { noScriptValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-add-group-option',
  templateUrl: './add-group-option.component.html',
  styleUrls: ['./add-group-option.component.scss'],
  animations:[enterRight, fadeIn]
})

export class AddGroupOptionComponent implements OnDestroy {


  @Output() closeForm = new EventEmitter<boolean>()
  @ViewChild('optionsGroup') containerDisplay:ElementRef|any
  editing: boolean = false;
  processLoad: boolean = false
  optionsList: FormArray
  formVariations: FormGroup;
  formOptions: FormGroup;
  currentOptions: any[] = []


  constructor(
    private layoutService: LayoutStateService,
    private toast: MatSnackBar,
    private formBuilder: FormBuilder,
    private adminService: AdminService) {

    this.formVariations = this.formBuilder.group({
      nameVariation: ['', Validators.required, noScriptValidator()],
      typePrice: [3, Validators.required],
      simple: [false],
      multiple: [true],
      max: [1, Validators.required],
      min: [0, Validators.required]
    });

    console.log(this.containerDisplay);
    

    this.formOptions = this.formBuilder.group({
      options: this.formBuilder.array([]),
    }, Validators.required) 

    this.optionsList = this.formOptions.get('options') as FormArray;


    this.adminService.optionsGroup.subscribe(data => {
      console.log(data);
      this.currentOptions = data
    })

    

    this.layoutService.blockBody()
  }

  saveOptions() {
    console.log(this.formVariations);

    if (this.formVariations.invalid || this.formOptions.invalid) {
      this.formVariations.markAllAsTouched();
      this.formOptions.markAllAsTouched();
      this.toast.open('Completar los campos requeridos.', '', { duration: 3000 })
      return;

    }

    if (this.formVariations.get('simple')?.value || this.formVariations.get('typePrice')?.value === 1) {
      this.formVariations.get('min')?.setValue(0)
      this.formVariations.get('max')?.setValue(1)
      this.formVariations.get('multiple')?.setValue(false)
    }

    this.formVariations.get('nameVariation')?.setValue(this.capitalize(this.formVariations.get('nameVariation')?.value))

    const option = { ...this.formVariations.value, ...this.formOptions.value, id:this.genId(this.currentOptions) }

    console.log(option);

    this.currentOptions.push(option)

    const creatingToast = this.toast.open('Creando grupo de opciones.')

    this.adminService.postOptionGroup({ options: this.currentOptions }).subscribe(res => {
      console.log(option);
      this.toast.open('Grupo de opciones creado con exito.', '', { duration: 3000 })
      this.closeAddGroup()
      this.adminService.optionsGroup.next(this.currentOptions)
    })


  }

  addOption() {
    console.log(this.containerDisplay);
    
    const optionGroup = this.formBuilder.group({
      nameOption: ['', Validators.required],
      price: [0],
      active:true
    });
    this.optionsList.push(optionGroup);
    
    const container = this.containerDisplay.nativeElement
    container.scrollTop = container.scrollHeight;
  }

  removeOption(index: number) {
    if (this.optionsList.length !== 1) {
      this.optionsList.removeAt(index);
      this.formOptions.updateValueAndValidity();
    }
  }

  capitalize(value: string) {
    if (value)
      return value[0]?.toUpperCase() + value.slice(1)
    else return null
  }

  closeAddGroup() {
    this.closeForm.emit(false)
  }



  genId(arr:any[]){
    if (!arr.length) {
      return 1
    }

    const lastId = arr[arr.length - 1].id
    console.log(lastId);
    
    return lastId + 1
  }

  ngOnDestroy(): void {
    this.layoutService.unblockBody()
  }

}