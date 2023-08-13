import { state } from '@angular/animations';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { enterLeft, enterRight } from 'src/app/animations/main-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Category } from 'src/app/interfaces/category-interfaz';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { noScriptValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-main-edit-product',
  templateUrl: './main-edit-product.component.html',
  styleUrls: ['./main-edit-product.component.scss'],
  animations:[enterRight,enterLeft,fadeIn],
  providers:[MessageService, ConfirmationService],
})
export class MainEditProductComponent {
  

  @Input() product?:Product|any

  constructor(
    public theme: ThemesService,
    private localService: LocalDataService,
    private formBuilder: FormBuilder,
    private configDialog: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private cloudinary: CloudinaryService,
    private http: HttpClient,
    private adminService: AdminService,
    private toast: MessageService
  ) {
 

  }


  ngOnInit(): void {

    window.history.pushState({modal:true}, 'modal')
    console.log(window.history);
    
    
  
  }

  closeEditProduct(){
    this.product.editing = false
  }

  @HostListener('window:popstate')
  onPopState() {
    // Detectar el evento de retroceso del historial
    this.closeEditProduct()
  }



}
