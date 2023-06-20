import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http:HttpClient) { }

  
  upload(fileImage:any){
    const data=new FormData
    data.append('file', fileImage);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', environment.cloudinary_cloud);
    data.append('folder', environment.cloudinary_cloud);

    return this.http.post(
      `https://api.cloudinary.com/v1_1/${environment.cloudinary_cloud}/upload`, 
      data
    )
    
  }
}
