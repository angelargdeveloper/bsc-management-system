// order-form.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderForm = this.fb.group({
      productoId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      cliente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ordersService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.ordersService.createOrder(this.orderForm.value).subscribe({
        next: () => {
          this.snackBar.open('Pedido creado', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open(error.error?.message || 'Error al crear pedido', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  validateStock(): void {
    const productId = this.orderForm.get('productoId')?.value;
    const quantity = this.orderForm.get('cantidad')?.value;
    
    if (productId && quantity) {
      this.ordersService.validateStock(productId, quantity).subscribe({
        next: (isValid) => {
          if (!isValid) {
            this.orderForm.get('cantidad')?.setErrors({ stock: true });
          }
        }
      });
    }
  }
}