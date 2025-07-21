import { Component, OnInit } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  displayedColumns: string[] = ['idPedido', 'cliente', 'fecha', 'total', 'actions'];
  loading = true;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.ordersService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar pedidos', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }
}