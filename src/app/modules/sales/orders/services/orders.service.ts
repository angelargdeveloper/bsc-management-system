import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/productos`);
  }

  validateStock(productId: number, quantity: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUrl}/productos/${productId}/validate-stock?quantity=${quantity}`);
  }
}