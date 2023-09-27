import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpringAuthService } from './spring-auth.service';
import { patientProfile } from '../models/user-profile';
import { Observable, take } from 'rxjs';
export interface specialty{
  id:string,
  name:string,
  description:string
}
export interface Day {
  name: string,
  selected: boolean
}
export interface ShiftHours {
  name: string,
  start: string; // Start time of the shift (e.g., "9:00 AM")
  end: string; // End time of the shift (e.g., "5:00 PM")
  days:Day[],
  errors:string[]
}
export interface Doctor{
    id:string;

  
    name:string,

    lastname:string,
     description:string,
    email:string,
    profilepic:string,
   lat:number ,
   lon:number ,

  specialty:specialty,
  patients:patientProfile[],
   phone:string,
   shiftHours:ShiftHours[]
}
@Injectable({
  providedIn: 'root'
})
export class DoctorServicesService {
  currentdoc:Doctor | undefined
  private apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient, private auth: SpringAuthService) { 
   if(auth.isAuthenticated()){
    if(auth.user?.user_status=="done"){
      
    }
   }

  }
  createDoctor(doc:Doctor){
    return this.http.post(this.apiUrl+"/doctors/add",doc)
  }
  get doctor$():Observable< Doctor>{

 let uid
 this.auth.getUser().pipe(take(1)).subscribe((k)=>{
  uid=k.profileid
  console.log(uid)
 })
    return this.http.get<Doctor>(this.apiUrl+"/doctors/8")
  }

getallspecialities(){
return this.http.get(this.apiUrl+"/specialties")
}



}
