import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http:HttpClient) { }

  
  upload(fileImage:any){
    const data=new FormData
    data.append('file', fileImage);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'diyorb8ka');

    return this.http.post(
      'https://api.cloudinary.com/v1_1/diyorb8ka/upload', 
      data
    )
    
  }
}
