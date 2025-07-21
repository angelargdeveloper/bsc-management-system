import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductsComponent } from './modules/inventory/products/products.component';
import { UsersComponent } from './modules/admin/users/users.component';
import { ReportsComponent } from './modules/inventory/reports/reports.component'; // Make sure this exists
import { OrdersComponent } from './modules/sales/orders/orders.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent }, // Now /dashboard/users will work
      { path: 'products', component: ProductsComponent }, // /dashboard/products
      { path: 'reports', component: ReportsComponent }, // /dashboard/reports
      { path: 'orders', component: OrdersComponent }, // /dashboard/orders
      
      { path: '', redirectTo: 'users', pathMatch: 'full' }, // Default child route
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Handle 404
];