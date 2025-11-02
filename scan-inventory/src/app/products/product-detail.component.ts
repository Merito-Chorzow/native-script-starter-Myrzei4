import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
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
export class ProductDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  routerExtensions = inject(RouterExtensions);
  productService = inject(ProductService);
  product = signal<Product>(null);

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.product.set(this.productService.getProduct(id));
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product()?.id);
    this.routerExtensions.navigate(['/products']);
  }
}