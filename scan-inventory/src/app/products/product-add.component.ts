import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ProductService } from './product.service';
import { Product } from './product';
import { requestPermissions, takePicture } from '@nativescript/camera';
import { ImageAsset } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-product-add',
  templateUrl: './product-add.component.html',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddComponent {
  name = '';
  code = '';
  status = 'active';
  description = '';
  imageUrl: string = '';
  productService = inject(ProductService);
  routerExtensions = inject(RouterExtensions);

  takePhoto(): void {
  requestPermissions().then(() => {
    takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: true }).then((imageAsset: ImageAsset) => {
      this.imageUrl = imageAsset.android?.toString() || imageAsset.ios?.toString();
    });
  });
}

  save(): void {
    if (!this.name || !this.code) return;
    const newProduct: Product = {
      id: 0,
      name: this.name,
      code: this.code,
      status: this.status,
      description: this.description,
      imageUrl: this.imageUrl
    };
    this.productService.addProduct(newProduct);
    this.routerExtensions.navigate(['/products']);
  }
}