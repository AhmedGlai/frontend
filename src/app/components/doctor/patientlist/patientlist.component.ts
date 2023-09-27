import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor, DoctorServicesService } from 'src/app/services/doctor-services.service';
interface appointmentHistory {
  history: AppointmentRecord[]
}
interface AppointmentRecord {
  date: Date;
  patientName: string;
  providerName: string;
  reasonForVisit: string;
  diagnoses: string[];
  treatments: string[];
  followUpInstructions: string;
}
interface patientDetails {
  patientid: String
  adress: String,
  weight: String,
  gender: String,
  heigth: String,
  appointmenthistory: appointmentHistory
}
interface patient {
  id: String
  name: String,
  lastname: String,
  title:String,
  profilePhoto:String,
  email: String,
  phone: String,
  patientDetails:patientDetails
}
const Opatientlist: Observable<patient[]> = of([])
 

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  patientList: patient[] = []
  pages:patient[][] = []
  Currentpage:number=1
  totalPages:number=0
  profilesDetails:patientDetails[]=[]
  user!:Doctor
  constructor(docservice:DoctorServicesService){
docservice.doctor$.subscribe((k)=>{
  this.user=k
  console.log(this.user)
})
  }
  ngOnInit(): void {
    this.getpatients()
  }
  getpatients() {
    Opatientlist.subscribe(key => {
      for (let k of key) {
        this.patientList.push(
          k
        )

      }
      this.pages = this.paginate(key, 8);
    })
    console.log(this.pages)

  }
  paginate(items: patient[], pageSize: number): patient[][] {
    const pages = [];
    let currentPage: patient[] = [];
    let currentIndex = 0;
    this.profilesDetails=[]
    for (const item of items) {
      if (currentIndex < pageSize) {
        currentPage.push(item);
        currentIndex++;
        
      } else {
        pages.push(currentPage);
        currentPage = [item];
        currentIndex = 1;
      }
    }
  
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
    for (const item of items) {
      if (currentIndex < pageSize) {
        currentPage.push(item);
        currentIndex++;
        
      } else {
        pages.push(currentPage);
        currentPage = [item];
        currentIndex = 1;
      }
    }
  
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
    for (const item of items) {
      if (currentIndex < pageSize) {
        currentPage.push(item);
        currentIndex++;
        
      } else {
        pages.push(currentPage);
        currentPage = [item];
        currentIndex = 1;
      }
    }
  
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
    for (const item of items) {
      if (currentIndex < pageSize) {
        currentPage.push(item);
        currentIndex++;
        
      } else {
        pages.push(currentPage);
        currentPage = [item];
        currentIndex = 1;
      }
    }
  
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }


    this.totalPages=pages.length
    return pages;
  }
  getPatientsOfpage(i:number){
return  this.pages[i]
  }
  getPages(): number[] {
    const pages: number[] = [];
    let startPage: number, endPage: number;
    
    if (this.totalPages <= 2) {
      // If there are 2 or fewer pages, display all pages
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // If there are more than 2 pages, display a range of 3 pages
      if (this.Currentpage <= 2) {
        startPage = 1;
        endPage = 3;
     
      } else if (this.Currentpage >= this.totalPages - 1) {
        pages.push(1);
        pages.push(0);
        startPage = this.totalPages - 2;
        endPage = this.totalPages;
      } else { if(this.Currentpage ==3){
        pages.push(1);
       
        startPage = this.Currentpage - 1;
        endPage = this.Currentpage + 1;
      }else{
          pages.push(1);
        pages.push(0);
        startPage = this.Currentpage - 1;
        endPage = this.Currentpage + 1;

      }
      

      }
    }
   
    // Create an array of page numbers to display
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    // Add the last page number if it's not already in the array
   
    if ( this.totalPages > 2 && this.Currentpage < this.totalPages-2) {
      startPage = 1;
      endPage = 3;
      pages.push(0);
    }
    if (this.Currentpage < this.totalPages-1) {
      pages.push(this.totalPages);
    }
    return pages;
  }
  
}  