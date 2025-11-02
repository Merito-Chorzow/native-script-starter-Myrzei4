import { ChangeDetectionStrategy, Component, computed, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { RouterExtensions } from '@nativescript/angular';
import { ProductService } from './product.service';

@Component({
  selector: 'ns-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  private router = inject(RouterExtensions);
  productService = inject(ProductService);
  products = computed(() => this.productService.items());
  isLoading = computed(() => this.productService.isLoading());
  error = computed(() => this.productService.error());

  ngOnInit(): void {
    this.productService.load(5, 0);
  }

  onItemTap(args: any): void {
    const index = args.index;
    const item = this.products()[index];
    if (item) {
      this.router.navigate(['/product', item.id]);
    }
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }
}