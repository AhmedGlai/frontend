// component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Specialty {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-specialties-admin',
  templateUrl: './specialties-admin.component.html',
  styleUrls: ['./specialties-admin.component.css']
})
export class SpecialtiesAdminComponent implements OnInit {
  showModal: boolean = false;
  specialties: Specialty[] = [];
  newSpecialty: Specialty = {
    id: 0,
    name: '',
    description: ''
  };

  private apiServerUrl = 'http://localhost:8080/api/specialties';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSpecialties();
  }
  openAddModal(): void {
    this.showModal = true;
    console.log('Modal opened');
  }

  getSpecialties(): void {
    this.http.get<Specialty[]>(`${this.apiServerUrl}/getAll`).subscribe(
      (specialties) => {
        this.specialties = specialties;
      },
      (error) => {
        console.error('Error retrieving specialties:', error);
      }
    );
  }

  addSpecialty(): void {
    this.http.post<Specialty>(`${this.apiServerUrl}/add`, this.newSpecialty).subscribe(
      () => {
        // Handle successful addition here (e.g., display a success message)
        this.newSpecialty = {
          id: 0,
          name: '',
          description: ''
        };
        this.showModal=false;
        this.getSpecialties();
      },
      (error) => {
        console.error('Error adding specialty:', error);
      }
    );
  }

  deleteSpecialty(specialtyId: number): void {
    this.http.delete<void>(`${this.apiServerUrl}/delete/${specialtyId}`).subscribe(
      () => {
        // Handle successful deletion here (e.g., display a success message)
        // Refresh the list of specialties
        this.getSpecialties();
      },
      (error) => {
        console.error('Error deleting specialty:', error);
      }
    );
  }

  
}
