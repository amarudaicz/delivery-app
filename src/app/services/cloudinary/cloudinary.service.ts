import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';
import { AdminService } from '../admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  localFolder?:string
  constructor(private http:HttpClient, private adminService:AdminService) {
    this.adminService.local$.subscribe(local=>{
      this.localFolder = local?.name_url
    })
   }

  
  upload(fileImage:any){
    const data=new FormData
    data.append('file', fileImage);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', environment.cloudinary_cloud);
    data.append('folder', this.localFolder! || '');
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${environment.cloudinary_cloud}/upload`, 
      data
    )
  }

  
}
