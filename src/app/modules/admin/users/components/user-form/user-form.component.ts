import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Usuario, UsuarioForm } from '../../models/user.model';
import { Perfil } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  perfiles$: Observable<Perfil[]>;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario }
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.minLength(8)]],
      confirmarContraseña: [''],
      idPerfil: ['', Validators.required],
      activo: [true]
    }, { validator: this.passwordMatchValidator });

    this.perfiles$ = this.usersService.getPerfiles();
  }

  ngOnInit(): void {
    if (this.data && this.data.usuario) {
      this.isEditMode = true;
      this.userForm.patchValue({
        nombre: this.data.usuario.nombre,
        email: this.data.usuario.email,
        idPerfil: this.data.usuario.idPerfil,
        activo: this.data.usuario.activo
      });
      // Quitar validadores de contraseña en modo edición
      this.userForm.get('contraseña')?.clearValidators();
      this.userForm.get('confirmarContraseña')?.clearValidators();
      this.userForm.get('contraseña')?.updateValueAndValidity();
      this.userForm.get('confirmarContraseña')?.updateValueAndValidity();
    } else {
      // En modo creación, contraseña es requerida
      this.userForm.get('contraseña')?.setValidators([Validators.required, Validators.minLength(8)]);
      this.userForm.get('contraseña')?.updateValueAndValidity();
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('contraseña')?.value;
    const confirmPassword = form.get('confirmarContraseña')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const usuarioForm: UsuarioForm = this.userForm.value;

      if (this.isEditMode) {
        this.usersService.updateUsuario(this.data.usuario.idUsuario, usuarioForm).subscribe({
          next: () => {
            this.usersService.showMessage('Usuario actualizado correctamente');
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.usersService.showMessage(error.message || 'Error al actualizar usuario');
          }
        });
      } else {
        this.usersService.createUsuario(usuarioForm).subscribe({
          next: () => {
            this.usersService.showMessage('Usuario creado correctamente');
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.usersService.showMessage(error.message || 'Error al crear usuario');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}