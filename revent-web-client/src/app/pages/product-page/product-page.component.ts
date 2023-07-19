import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_ITEM, DEFAULT_SELLER } from 'src/app/constants';
import { Product } from 'src/app/interfaces/product';
import { seller } from 'src/app/interfaces/seller';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  id: string;
  item: Product;
  selectedImg: string;
  seller: seller;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.id = '';
    this.seller = DEFAULT_SELLER;
    this.item = DEFAULT_ITEM;
    this.route.queryParams.subscribe(async (params) => {
      this.id = params['id'];
      this.item = await this.productService.get(this.id);
      this.item.otherImages.shift();
      this.selectedImg = this.item.preview.image;
    });
    this.selectedImg = this.item.preview.image;
  }

  ngOnInit(): void {}

  selectImg(img: string) {
    this.selectedImg = img;
  }
}
