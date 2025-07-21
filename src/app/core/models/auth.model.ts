export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  idUsuario: number;
  nombre: string;
  email: string;
  idPerfil: number;
  activo: boolean;
  fechaCreacion: string;
  perfil: {
    idPerfil: number;
    nombre: string;
    descripcion: string;
  };
}