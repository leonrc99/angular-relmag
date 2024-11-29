import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private apiUrl = 'http://localhost:8080/api'; // URL base da API
  private bearerToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ09OU1VMVEFOVCIsIm5hbWUiOiJDb25zdWx0YW50IFVzZXIgMSIsInN1YiI6ImNvbnN1bHRhbnQxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMyODI0MDI4LCJleHAiOjE3MzI5MTA0Mjh9.Z6llrCHUMBbRINqomWSulOWXwh6HvHnAl_Kr1-aJdF4"
  constructor(private http: HttpClient) {}

  getShoppingCart(userId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/cart/${userId}`, { headers, withCredentials: true });
  }

  updateCartItem(itemId: string, data: any) {
    const headers = new HttpHeaders({
      Authorization: this.bearerToken
    });
    return this.http.put(`/cart/items/${itemId}`, data);
  }

  deleteCartItem(itemId: string) {
    const headers = new HttpHeaders({
      Authorization: this.bearerToken
    });
    return this.http.delete(`/cart/items/${itemId}`);
  }

  checkout() {
    const headers = new HttpHeaders({
      Authorization: this.bearerToken
    });
    return this.http.post('/payments', {});
  }
}
