import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Atualize conforme necessário
  private token: any;

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  public saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', `${token}`);
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
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  public logout(): void {
    localStorage.removeItem('authToken');
  }

  getLoggedUser() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/api/users/me`, {
      headers,
      withCredentials: true,
    });
  }
}
