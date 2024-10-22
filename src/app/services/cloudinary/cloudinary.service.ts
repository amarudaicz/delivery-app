import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';
import { AdminService } from '../admin/admin.service';
import { UploadClient } from '@uploadcare/upload-client'

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  localFolder?:string
  clientUploadcare = new UploadClient({ publicKey: 'YOUR_PUBLIC_KEY' })

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

  uploadCare(fileImage:any){
    console.log(fileImage);
    return this.clientUploadcare.uploadFile(fileImage)
  }

  

  
}
