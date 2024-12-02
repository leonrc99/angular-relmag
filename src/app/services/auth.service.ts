import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Atualize conforme necessário
  private token: any

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  public login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  public saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("authToken", `${token}`);
    }
  }

  public decodeToken(): any {
    if (this.token) {
      const decodedToken = jwtDecode(this.token);
      return decodedToken;
    }
    return null;
  }

  public register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  public logout(): void {
    localStorage.removeItem('authToken');
  }
}
