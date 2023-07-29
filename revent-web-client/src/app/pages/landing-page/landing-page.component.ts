import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DEFAULT_ITEM_PREVIEW } from 'src/app/constants';
import { ProductService } from 'src/app/services/product.service';
import { items } from 'src/TEMP MOCK FILES/item-previews';
import { Product } from '../../../../../common/product';
import { ProductPreview } from '../../../../../common/product-preview';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  items: Product[];
  constructor(private productService: ProductService) {
    this.items = [];
  }

  async ngOnInit(): Promise<void> {
    this.items = await this.productService.getAll();
  }
}
