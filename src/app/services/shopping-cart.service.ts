import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private apiUrl = 'http://localhost:8080/api'; // URL base da API
  private bearerToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJuYW1lIjoiTGVvbmFyZG8gUm9kcmlndWVzIiwic3ViIjoibGVvbmFyZG9AYWRtaW5uLmNvbSIsImlhdCI6MTczMjkxNjk0NCwiZXhwIjoxNzMzMDAzMzQ0fQ.0dBm5C6fZm6269X-PHxis_4RWvez5LMfXOdsUveYMKg"
  constructor(private http: HttpClient) {}

  public getShoppingCart(userId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/cart/${userId}`, { headers, withCredentials: true });
  }

  public updateCartItem(itemId: string, data: any) {
    const headers = new HttpHeaders({
      Authorization: this.bearerToken
    });
    return this.http.put(`/cart/items/${itemId}`, data);
  }

  public deleteCartItem(itemId: string) {
    const headers = new HttpHeaders({
      Authorization: this.bearerToken
    });
    return this.http.delete(`/cart/items/${itemId}`);
  }

  public checkout() {
    const headers = new HttpHeaders({
      Authorization: this.bearerToken
    });
    return this.http.post('/payments', {});
  }
}
