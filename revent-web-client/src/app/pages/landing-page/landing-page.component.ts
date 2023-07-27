import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DEFAULT_ITEM_PREVIEW } from 'src/app/constants';
import { ProductService } from 'src/app/services/product.service';
import { items } from 'src/TEMP MOCK FILES/item-previews';
import { ProductPreview } from '../../../../../common/product-preview';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  items: ProductPreview[];
  constructor(private productService: ProductService) {
    this.items = items;
  }

  async ngOnInit(): Promise<void> {
    this.items = await this.productService.getAll();
  }
}
