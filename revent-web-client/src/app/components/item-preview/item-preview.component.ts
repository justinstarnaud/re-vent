import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_ITEM_PREVIEW } from 'src/app/constants';
import { ProductPreview } from 'src/app/interfaces/product-preview';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.scss'],
})
export class ItemPreviewComponent implements OnInit {
  @Input() size: number;
  @Input() item: ProductPreview = DEFAULT_ITEM_PREVIEW;
  constructor() {
    this.size = 200;
  }

  ngOnInit(): void {}
}
