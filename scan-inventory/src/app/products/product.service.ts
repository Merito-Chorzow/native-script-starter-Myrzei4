import { Injectable, signal } from '@angular/core';
import { Product } from './product';
import { QuoteApi } from './product-api.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  items = signal<Product[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  private api = new QuoteApi();
  private nextLocalId = 1000;
  private initialized = false;

  private mapQuoteToProduct(q: { id: number; quote: string; author: string }): Product {
    return {
      id: q.id,
      name: q.author || `Author ${q.id}`,
      code: `Q-${q.id}`,
      status: 'active',
      description: q.quote || '',
      imageUrl: ''
    };
  }

  async load(limit = 5, skip = 0): Promise<void> {
    if (this.initialized) return;
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const quotes = await this.api.getQuotes(limit, skip);
      const products = quotes.map(q => this.mapQuoteToProduct(q));
      this.items.set(products);
      const maxRemote = products.reduce((m, p) => Math.max(m, p.id), 0);
      this.nextLocalId = Math.max(this.nextLocalId, maxRemote + 1);
      this.initialized = true;
    } catch (err: any) {
      this.error.set(err?.message || 'Load failed');
    } finally {
      this.isLoading.set(false);
    }
  }

  addProduct(product: Product): void {
    const current = this.items();
    const newId = this.nextLocalId++;
    const toAdd: Product = { ...product, id: newId };
    this.items.set([...current, toAdd]);
  }

  updateProduct(updated: Product): void {
    this.items.set(this.items().map(p => (p.id === updated.id ? { ...updated } : p)));
  }

  deleteProduct(id: number): void {
    this.items.set(this.items().filter(p => p.id !== id));
  }

  getProduct(id: number): Product | undefined {
    return this.items().find(p => p.id === id);
  }
}