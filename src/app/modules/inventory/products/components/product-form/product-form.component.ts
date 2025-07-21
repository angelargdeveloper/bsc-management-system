import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Producto, ProductoForm } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isEdit = false;
  loading = false;
  private operationSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Producto }
  ) {
    this.form = this.fb.group({
      claveProducto: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(255)]],
      existencia: [0, [Validators.required, Validators.min(0)]],
      precio: [0, [Validators.required, Validators.min(0)]]
    });

    if (this.data?.product) {
      this.isEdit = true;
      this.patchForm(this.data.product);
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.operationSubscription?.unsubscribe();
  }

  patchForm(product: Producto): void {
    this.form.patchValue({
      claveProducto: product.claveProducto,
      nombre: product.nombre,
      descripcion: product.descripcion,
      existencia: product.existencia,
      precio: product.precio
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const productData: ProductoForm = this.form.value;

    const operation$: Observable<Producto> = this.isEdit 
      ? this.productsService.updateProduct(this.data.product!.idProducto, productData)
      : this.productsService.createProduct(productData);

    this.operationSubscription = operation$.subscribe(
      (product: Producto) => {
        this.dialogRef.close(product);
      },
      (error: any) => {
        console.error('Error:', error);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}