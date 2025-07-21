import { Component, OnInit } from '@angular/core';
import { Producto } from '././models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ProductFormComponent // Asegúrate de que este componente también sea standalone
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService] // Provee el servicio aquí en lugar de imports
})
export class ProductsComponent implements OnInit {
  products: Producto[] = [];
  displayedColumns: string[] = ['claveProducto', 'nombre', 'descripcion', 'existencia', 'precio', 'actions'];
  loading = true;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productsService.getAllProducts().subscribe({
      next: (products: Producto[]) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Producto creado correctamente', 'Cerrar', { duration: 3000 });
        this.loadProducts();
      }
    });
  }

  openEditDialog(product: Producto): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Producto actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.snackBar.open('Producto eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadProducts();
        },
        error: (error: { error: { message: any; }; }) => {
          this.snackBar.open(error.error?.message || 'Error al eliminar el producto', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}