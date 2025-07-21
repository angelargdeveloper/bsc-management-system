export interface Perfil {
  idPerfil: number;
  nombre: string;
  descripcion?: string;
}

export interface Usuario {
  idUsuario: number;
  nombre: string;
  email: string;
  contraseña?: string;
  idPerfil: number;
  activo: boolean;
  fechaCreacion: Date;
  perfil?: Perfil;
}

export interface UsuarioForm {
  nombre: string;
  email: string;
  contraseña: string;
  confirmarContraseña: string;
  idPerfil: number;
  activo: boolean;
}