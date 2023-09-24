import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { NotificationsAdminService } from '../services/notifications-admin/notifications-admin.service';
import { Inject} from '@angular/core';

export const handleError = (error:any, notification:NotificationsAdminService) => {
  console.log(error);
  
  error = error.type ? 'A ocurrido un error intente nuevamente' : error  

  notification.new(error, 'Ok');

  return throwError(
    () => new Error(error)
  );
};
