import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'ns-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(RouterExtensions);
  product: Product | undefined;

  constructor() {
    const id = Number(this.route.snapshot.params['id']);
    this.product = this.productService.getProduct(id);
  }

  delete(): void {
    if (!this.product) return;
    this.productService.deleteProduct(this.product.id);
    this.router.navigate(['/products'], { clearHistory: true });
  }
}