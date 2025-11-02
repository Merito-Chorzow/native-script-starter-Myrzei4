import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { ProductService } from './product.service';
import { Product } from './product';
import * as Camera from '@nativescript/camera';
import { ImageAsset, ImageSource, knownFolders, path } from '@nativescript/core';

@Component({
  selector: 'ns-product-add',
  templateUrl: './product-add.component.html',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddComponent {
  name = '';
  code = '';
  status = 'active';
  description = '';
  imageUrl = '';

  constructor(
    private productService: ProductService,
    private routerExtensions: RouterExtensions
  ) {}

  async takePhoto(): Promise<void> {
    try {
      await Camera.requestPermissions();
      const imageAsset: ImageAsset = await Camera.takePicture({
        width: 800,
        height: 800,
        keepAspectRatio: true,
        saveToGallery: false
      });
      const source = new ImageSource();
      await source.fromAsset(imageAsset);
      const docs = knownFolders.documents();
      const fileName = `product_${Date.now()}.jpg`;
      const saved = source.saveToFile(path.join(docs.path, fileName), 'jpg');
      if (saved) {
        const localPath = path.join(docs.path, fileName);
        this.imageUrl = localPath;
      } else {
        this.imageUrl = imageAsset.android?.toString() || imageAsset.ios?.toString() || '';
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  }

  save(): void {
    if (!this.name?.trim() || !this.code?.trim()) return;
    const newProduct: Product = {
      id: 0,
      name: this.name.trim(),
      code: this.code.trim(),
      status: this.status,
      description: this.description,
      imageUrl: this.imageUrl
    };
    this.productService.addProduct(newProduct);
    this.routerExtensions.navigate(['/products'], { clearHistory: true });
  }
}