import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DEFAULT_ITEM_PREVIEW } from 'src/app/constants';
import { ProductPreview } from 'src/app/interfaces/product-preview';
import { ProductService } from 'src/app/services/product.service';
import { items } from 'src/TEMP MOCK FILES/item-previews';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  items: ProductPreview[];
  constructor(private productService: ProductService) {
    // TODO: remplacer avec les vrais items
    this.items = items;
  }

  async ngOnInit(): Promise<void> {
    this.items = await this.productService.getAll();
  }
}
