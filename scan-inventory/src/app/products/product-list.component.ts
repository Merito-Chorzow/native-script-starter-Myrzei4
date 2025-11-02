import { ChangeDetectionStrategy, Component, computed, inject, NO_ERRORS_SCHEMA } from '@angular/core';
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
export class ProductListComponent {
  private router = inject(RouterExtensions);
  productService = inject(ProductService);
  products = computed(() => this.productService.items());

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