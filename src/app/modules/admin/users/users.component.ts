import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersService } from './services/users.service';
import { Usuario } from './models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'email', 'perfil', 'activo', 'fechaCreacion', 'actions'];
  loading = true;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.usersService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Usuario creado correctamente', 'Cerrar', { duration: 3000 });
        this.loadUsuarios();
      }
    });
  }

  openEditDialog(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.loadUsuarios();
      }
    });
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usersService.deleteUsuario(id).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadUsuarios();
        },
        error: (error: { error: { message: any; }; }) => {
          this.snackBar.open(error.error?.message || 'Error al eliminar el usuario', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  getNombrePerfil(idPerfil: number): string {
    const usuario = this.usuarios.find(u => u.idPerfil === idPerfil);
    return usuario?.perfil?.nombre || 'Desconocido';
  }
}