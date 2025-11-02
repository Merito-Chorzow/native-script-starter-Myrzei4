import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list.component';
import { ProductAddComponent } from './products/product-add.component';
import { ProductDetailComponent } from './products/product-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'add', component: ProductAddComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];