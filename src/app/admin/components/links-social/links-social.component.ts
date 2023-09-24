import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, startWith } from 'rxjs';
import { Local } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';

@Component({
  selector: 'app-links-social',
  templateUrl: './links-social.component.html',
  styleUrls: ['./links-social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksSocialComponent implements OnInit {
  form: FormGroup;
  linksFormArray: FormArray;
  editing: boolean = false;
  loadForm: boolean = false;
  countDeleteLink = 0
  localSubject: BehaviorSubject<Local> = new BehaviorSubject<any>(undefined);

  mockIcons = [
    {
      icon: 'pi-instagram',
      value: 'Instagram',
      color: 'text-red-500',
    },
    {
      icon: 'pi-facebook',
      value: 'Facebook',
      color: 'text-blue-700',
    },
    {
      icon: 'pi-twitter',
      value: 'Twitter',
      color: 'text-blue-400',
    },
    {
      icon: 'pi-globe',
      value: 'Sitio web',
      color: '',
    },
  ];

  constructor(
    private adminService: AdminService,
    private notificationsAdmin: NotificationsAdminService,
    private formBuilder: FormBuilder,
    private dc:ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({ links: this.formBuilder.array([]) });
    this.linksFormArray = this.form.get('links') as FormArray;
  }

  ngOnInit(): void {
  

    this.adminService.local$.subscribe((local) => {
      if (!local || !local.links) return;

        local.links.forEach((e) => {
          this.linksFormArray.push(
            this.formBuilder.group({
              name: [e.name, Validators.required],
              url: [e.url, Validators.required],
            })
          );
        });

        this.form.disable()
        this.dc.detectChanges()
      
    });

  }
    

  submitForm() {

    if (this.form.invalid){
      this.notificationsAdmin.new('Completar los campos requeridos');
      this.form.markAllAsTouched()
      return
    }

    if (!this.form.dirty) {
      this.editing = false
      this.form.disable();

      return
    }

    this.loadForm = true
    this.adminService 
    .updateLinks(this.form.value)
    .pipe( 
      catchError(({error}) => {
        this.loadForm = false
        return handleError(error, this.notificationsAdmin);
      })
      )
      .subscribe((res) => {
        this.form.disable();
        this.form.markAsPristine();
        this.notificationsAdmin.new(
          'Enlaces de redes sociales actualizados',
          'Ok',
          {
            push: true,
            section: 'Enlaces',
          }
          );
        });

        this.editing = false;
        this.loadForm = false;
      };

  editForm() {
    this.editing = true;
    this.form.enable()

  }

  newLink() {
    if (this.linksFormArray.controls.length === 4) {
      this.notificationsAdmin.new('Puedes agregar como maximo 4 enlaces');
      return;
    }

    const newLinkGroup = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
    });

    this.linksFormArray.push(newLinkGroup);
    this.form.markAsDirty()
  }

  removeLink(index: number) {
    this.linksFormArray.removeAt(index);
    this.form.markAsDirty()
  }

  getIcon(name: string) {
    if (!name) return { color: '', icon: '' };

    const iconName = name.toLowerCase();
    console.log(this.mockIcons.find((e) => e.value.toLowerCase() === iconName));

    return this.mockIcons.find((e) => e.value.toLowerCase() === iconName);
  }

  //OPTION = Instagram
  getDisabled(option: string) {
    const arrayLinks: { name: string; url: string; icon: string }[] =
      this.linksFormArray.value;
    return arrayLinks.some((e) => e.name === option);
  }
}
