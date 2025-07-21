import { Injectable } from '@angular/core';
import { ProductsApiService } from './products-api.service';
import { Producto, ProductoForm } from '../models/product.model';
import { Observable, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private apiService: ProductsApiService,
    private snackBar: MatSnackBar
  ) { }

  getAllProducts(): Observable<Producto[]> {
    return this.apiService.getProducts().pipe(
      map(products => products.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }

  getProductById(id: number): Observable<Producto> {
    return this.apiService.getProduct(id);
  }

    createProduct(product: ProductoForm): Observable<Producto> {
    return this.apiService.createProduct({
        ...product,
        idProducto: 0,
        idUsuarioCreacion: 0,
        fechaCreacion: new Date()
    });
    }

updateProduct(id: number, product: ProductoForm): Observable<Producto> {
    return this.apiService.updateProduct(id, {
      ...product,
      idProducto: id,
      idUsuarioCreacion: 0,
      fechaCreacion: new Date()
    }).pipe(
      map(() => {
        // Devuelve el producto actualizado (puedes ajustar esto según tu API)
        return {
          ...product,
          idProducto: id,
          idUsuarioCreacion: 0,
          fechaCreacion: new Date()
        } as Producto;
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.deleteProduct(id);
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}