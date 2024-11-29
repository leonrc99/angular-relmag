import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarotService {
  private apiUrl = 'http://localhost:8080/api'; // URL base da API

  constructor(private http: HttpClient) {}

  public getTarotConsultants(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarot/consultants`);
  }

  public getConsultantById(consultantId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarot/consultants/${consultantId}`);
  }
  
  public createAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarot/appointments`, appointmentData);
  }
}
