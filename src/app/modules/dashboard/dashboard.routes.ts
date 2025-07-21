import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { adminGuard } from '../../core/guards/admin.guard';
import { staffGuard } from '../../core/guards/staff.guard';
import { sellerGuard } from '../../core/guards/seller.guard';
import { ProductsComponent } from '../inventory/products/products.component';
import { UsersComponent } from '../admin/users/users.component';

export const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'users', 
        component: UsersComponent,
        canActivate: [adminGuard]
      },
      { 
            path: 'products', 
            component: ProductsComponent,
            
      },
      { 
        path: 'reports', 
        loadComponent: () => import('../inventory/reports/reports.component').then(m => m.ReportsComponent),
        canActivate: [staffGuard]
      },
      { 
        path: 'orders', 
        loadComponent: () => import('../sales/orders/orders.component').then(m => m.OrdersComponent),
        canActivate: [sellerGuard]
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ] 
  }
];