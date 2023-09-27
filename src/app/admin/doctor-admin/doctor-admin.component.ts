import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/services/doctor-services.service';

interface response{
  content : Doctor[]
}


@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css']
})
export class DoctorAdminComponent implements OnInit {
  private apiServerUrl="http://localhost:8080/api/doctors";

  doc: Doctor[] = []
constructor( private http:HttpClient){}

  ngOnInit(): void {
    this.getDoc().subscribe((dt)=>{
      
      this.doc=dt.content
      console.log(this.doc)
    })
    
  }
  
  getDoc():Observable<response>{
    const params:HttpParams =
    new HttpParams().set('page',0)
    .set('size',9)

    return this.http.get<response>(`${this.apiServerUrl}/getall`,{params})
  }

}
