import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Patient {
  id: String
  name: String,
  lastname: String,
  title:String,
  profilePhoto:String,
  email: String,
  phone: String
}
@Component({
  selector: 'app-patient-admin',
  templateUrl: './patient-admin.component.html',
  styleUrls: ['./patient-admin.component.css']
})
export class PatientAdminComponent implements OnInit {
  patientList: Patient[] = []
  private apiServerUrl="http://localhost:8080/api/patients";
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getPatient().subscribe((pt:Patient[])=>{
      this.patientList=pt
      console.log(this.patientList)
    },(e)=>{console.error('Error fetching patients:', e)})
  }
  
  getPatient(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiServerUrl}/getAll`)
  }

  
}
