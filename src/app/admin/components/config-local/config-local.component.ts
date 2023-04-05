import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
@Component({
  selector: 'app-config-local',
  templateUrl: './config-local.component.html',
  styleUrls: ['./config-local.component.scss'],
  providers:[MessageService]
})
export class ConfigLocalComponent implements OnInit {
  form:FormGroup
  editing:boolean=false
  
  
  constructor(
    private formBuilder:FormBuilder,
    private localData:LocalDataService,
    private toastr:MessageService
  ){
    this.form = this.formBuilder.group({
      name:[''],
      phone:[''],
      ubication:[''],
      
      semanaMañanaInicio:[''],
      semanaMañanaFin:[''],
      semanaTardeInicio:[''],
      semanaTardeFin:[''],

      finDeSemanaMañanaInicio:[''],
      finDeSemanaMañanaFin:[''],
      finDeSemanaTardeInicio:[''],
      finDeSemanaTardeFin:[''],
      instagram:[''],
      website:[''],
      maps:['']
    })
  }

  ngOnInit(): void {
    this.form.disable()
    this.setDataLocal()

  }


  saveDataLocal(){
    this.form.disable()
    this.editing = false
    this.createObjectHoraries()
    const data = {
      name:this.form.get('name')?.value,
      phone:this.form.get('phone')?.value,
      ubication:this.form.get('ubication')?.value,
      instagram:this.form.get('instagram')?.value,
      website:this.form.get('website')?.value,
      maps:this.form.get('maps')?.value,
      horarios:this.createObjectHoraries()
    }

    console.log(data);
    
    this.toastr.add({severity:'success', detail:'Los datos han sido guardados'})

  }

  editDataLocal(){
    this.form.enable()
    this.editing = true
  }


  setDataLocal(){
    this.localData.local.subscribe(data=>{
      console.log(data);
      
      this.form.patchValue({
        name:data?.name,
        ubication:data?.ubication,
        phone:3543578188,
        semanaMañanaInicio:'09am',
        semanaMañanaFin:'13pm',
        semanaTardeInicio:'18pm',
        semanaTardeFin:'01am',
  
        finDeSemanaMañanaInicio:'13pm',
        finDeSemanaMañanaFin:'18pm',
        finDeSemanaTardeInicio:'',
        finDeSemanaTardeFin:'',

        instagram:'https://www.instagram.com/amarudaicz/',
        website:'https://www.websites.com/delyAPP/',
        maps:'https://goo.gl/maps/vvcbUmHh5sc5bv7Q7'
      })
    })  

  }

  createObjectHoraries(){
    const formData = this.form.controls
    const horarios = {
      semana:{
        semanaMañanaInicio:formData['semanaMañanaInicio'].value,
        semanaMañanaFin:formData['semanaMañanaFin'].value,
        semanaTardeInicio:formData['semanaTardeInicio'].value,
        semanaTardeFin:formData['semanaTardeFin'].value,
      },
      finDeSemana:{
        finDeSemanaMañanaInicio:formData['finDeSemanaMañanaInicio'].value,
        finDeSemanaMañanaFin:formData['finDeSemanaMañanaFin'].value,
        finDeSemanaTardeInicio:formData['finDeSemanaTardeInicio'].value,
        finDeSemanaTardeFin:formData['finDeSemanaTardeFin'].value,
      }
    }

    return horarios    

  }



}
