import { Injectable } from '@angular/core';
import { UsersApiService } from './users-api.service';
import { Observable, map } from 'rxjs';
import { Usuario, UsuarioForm, Perfil } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PERFILES } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private apiService: UsersApiService,
    private snackBar: MatSnackBar
  ) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.apiService.getUsuarios().pipe(
      map(usuarios => usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.apiService.getUsuario(id);
  }

  createUsuario(usuario: UsuarioForm): Observable<Usuario> {
    // Validar contraseña antes de enviar
    if (!this.validarContraseña(usuario.contraseña)) {
      throw new Error('La contraseña no cumple con los requisitos mínimos');
    }

    if (usuario.contraseña !== usuario.confirmarContraseña) {
      throw new Error('Las contraseñas no coinciden');
    }

    const usuarioToCreate = {
      idUsuario: 0, // Valor temporal, el backend debe asignar el ID real
      nombre: usuario.nombre,
      email: usuario.email,
      contraseña: usuario.contraseña,
      idPerfil: usuario.idPerfil,
      activo: usuario.activo,
      fechaCreacion: new Date()
    };

    return this.apiService.createUsuario(usuarioToCreate);
}

  updateUsuario(id: number, usuario: UsuarioForm): Observable<Usuario> {
    const usuarioToUpdate = {
      ...usuario,
      idUsuario: id,
      contraseña: usuario.contraseña || undefined, // No actualizar contraseña si está vacía
      fechaCreacion: new Date()
    };

    return this.apiService.updateUsuario(id, usuarioToUpdate).pipe(
      map(() => {
        return {
          ...usuarioToUpdate
        } as Usuario;
      })
    );
  }

  deleteUsuario(id: number): Observable<void> {
    return this.apiService.deleteUsuario(id);
  }

  getPerfiles(): Observable<Perfil[]> {
    // Puedes usar PERFILES estáticos o llamar al API
    return this.apiService.getPerfiles();
    // return of(PERFILES); // Alternativa con datos estáticos
  }

  validarContraseña(contraseña: string): boolean {
    // Mínimo 8 caracteres, al menos una letra y un número
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(contraseña);
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}