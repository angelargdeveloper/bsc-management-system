import { Component, OnInit } from '@angular/core';
import { ReportsService } from './services/reports.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  stockReport: any[] = [];
  ordersReport: any[] = [];
  activeTab = 'stock';
  loading = false;

  constructor(
    private reportsService: ReportsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadStockReport();
  }

  loadStockReport(): void {
    this.loading = true;
    this.reportsService.getStockReport().subscribe({
      next: (data) => {
        this.stockReport = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar reporte', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  loadOrdersReport(): void {
    this.loading = true;
    this.reportsService.getOrdersReport().subscribe({
      next: (data) => {
        this.ordersReport = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar reporte', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
    if (tab === 'stock') {
      this.loadStockReport();
    } else {
      this.loadOrdersReport();
    }
  }
}