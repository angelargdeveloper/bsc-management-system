import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; 

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (!response.token) {
          throw new Error('Token no recibido en la respuesta');
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.idUsuario,
          name: response.nombre,
          email: response.email,
          role: response.perfil.nombre
        }));
      }),
      catchError(error => {
        console.error('Error en login:', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

}