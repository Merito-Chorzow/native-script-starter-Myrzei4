import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({providedIn: 'root'})
export class ProductService {
  items = signal<Product[]>([
    {
      id: 1,
      name: 'Scanner X100',
      code: 'SCX100',
      status: 'active',
      description: 'High-speed barcode scanner',
      imageUrl: ''
    },
    {
      id: 2,
      name: 'Thermal Printer T200',
      code: 'TP200',
      status: 'inactive',
      description: 'Compact thermal printer for labels',
      imageUrl: ''
    }

  ]);

  getProduct(id: number): Product {
    return this.items().find(p => p.id === id);
  }

  addProduct(product: Product): void {
    const current = this.items();
    this.items.set([...current, { ...product, id: current.length + 1 }]);
  }

  deleteProduct(id: number): void {
    this.items.set(this.items().filter(p => p.id !== id));
  }
}
