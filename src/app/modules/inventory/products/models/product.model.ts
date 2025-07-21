export interface Producto {
  idProducto: number;
  claveProducto: string;
  nombre: string;
  descripcion?: string;
  existencia: number;
  precio: number;
  idUsuarioCreacion: number;
  fechaCreacion: Date;
  usuarioCreacion?: {
    idUsuario: number;
    nombre: string;
  };
}

export interface ProductoForm {
  claveProducto: string;
  nombre: string;
  descripcion?: string;
  existencia: number;
  precio: number;
}