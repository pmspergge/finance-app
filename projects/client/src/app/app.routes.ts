import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'add-transaction', component: TransactionFormComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
