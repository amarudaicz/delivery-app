import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ConfigLocalComponent } from './config-local.component';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { of } from 'rxjs';

describe('ConfigLocalComponent', () => {
  let component: ConfigLocalComponent;
  let fixture: ComponentFixture<ConfigLocalComponent>;
  let formBuilder: FormBuilder;
  let localDataService: LocalDataService;
  let toastr: MessageService;
  let adminService: AdminService;
  let cloudinary: CloudinaryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ConfigLocalComponent],
      providers: [
        FormBuilder,
        LocalDataService,
        MessageService,
        AdminService,
        CloudinaryService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigLocalComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.inject(FormBuilder);
    localDataService = TestBed.inject(LocalDataService);
    toastr = TestBed.inject(MessageService);
    adminService = TestBed.inject(AdminService);
    cloudinary = TestBed.inject(CloudinaryService);

    component.form = formBuilder.group({
      name: [''],
      phone: [''],
      location: [''],
      transfer: [null],
      delivery: [true],
      delivery_cost: [null],
      delivery_time: [null],
      instagram: [''],
      website: [''],
      maps: ['']
    });

    component.horariosForm = formBuilder.group({
      daysWeek: [['']],
      daysWeekend: [['']],
      semanaMañanaInicio: [''],
      semanaMañanaFin: [''],
      semanaTardeInicio: [''],
      semanaTardeFin: [''],
      finDeSemanaMañanaInicio: [''],
      finDeSemanaMañanaFin: [''],
      finDeSemanaTardeInicio: [''],
      finDeSemanaTardeFin: ['']
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable form and horariosForm on ngOnInit', () => {
    component.ngOnInit();

    expect(component.form.disabled).toBeTrue();
    expect(component.horariosForm.disabled).toBeTrue();
  });

  it('should enable form and horariosForm on editDataLocal', () => {
    component.editDataLocal();

    expect(component.form.enabled).toBeTrue();
    expect(component.horariosForm.enabled).toBeTrue();
  });

  it('should set data on setDataLocal', () => {
    const testData = {
      name: 'Test Name',
      location: 'Test Location',
      phone: '3543578188',
      instagram: 'https://www.instagram.com/amarudaicz/',
      website: 'https://www.websites.com/delyAPP/',
      maps: 'https://goo.gl/maps/vvcbUmHh5sc5bv7Q7',
      transfer: null,
      horarios: {
        semana: {
          dias: [],
          maIn: null,
          maFn: null,
          taIn: null,
          taFn: null
        },
        finDeSemana: {
          dias: [],
          maIn: null,
          maFn: null,
          taIn: null,
          taFn: null
        }
      }
    };

    spyOn(adminService, 'getLocal').and.returnValue({
      subscribe: (callback: (data: any) => void) => {
        callback(testData);
      }
    } as any);

    component.setDataLocal();

    expect(component.product).toEqual(testData);
    expect(component.form.value).toEqual(testData);
    expect(component.horariosForm.value).toEqual(testData.horarios);
  });


  it('should send data to server and show success message', async () => {
    // Set up the form data
    component.form.setValue({
      name: 'Test Name',
      phone: '123456789',
      location: 'Test Location',
      transfer: null,
      delivery: true,
      delivery_cost: null,
      delivery_time: null,
      instagram: '',
      website: '',
      maps: ''
    });

    component.horariosForm.setValue({
      daysWeek: [],
      daysWeekend: [],
      semanaMañanaInicio: '',
      semanaMañanaFin: '',
      semanaTardeInicio: '',
      semanaTardeFin: '',
      finDeSemanaMañanaInicio: '',
      finDeSemanaMañanaFin: '',
      finDeSemanaTardeInicio: '',
      finDeSemanaTardeFin: ''
    });

    // Mock the adminService.updateLocal() method
    spyOn(adminService, 'updateLocal').and.returnValue(of({}));

    // Call the method to send data to server
    component.saveDataLocal();

    // Expect the updateLocal() method to have been called
    expect(adminService.updateLocal).toHaveBeenCalled();

    // Expect the toastr success message to have been shown
    expect(toastr.add).toHaveBeenCalledWith({
      severity: 'success',
      detail: 'Los datos han sido guardados'
    });

    // Expect the form and horariosForm to be disabled after saving data
    expect(component.form.disabled).toBeTrue();
    expect(component.horariosForm.disabled).toBeTrue();
  });

  it('should show error message if form is invalid', async () => {
    // Set up the form data
    component.form.setValue({
      name: '',
      phone: '123456789',
      location: 'Test Location',
      transfer: null,
      delivery: true,
      delivery_cost: null,
      delivery_time: null,
      instagram: '',
      website: '',
      maps: ''
    });
  // Add more tests for other methods and functionality as needed

});
})
