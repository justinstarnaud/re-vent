import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductPreview } from '../../../../../common/product-preview';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('result') result!: ElementRef<HTMLElement>;
  products: ProductPreview[];
  displayedProducts: ProductPreview[];

  constructor(private productService: ProductService) {
    this.products = [];
    this.displayedProducts = [];
  }

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getAll();
  }

  resetSearch() {
    this.input.nativeElement.value = '';
    this.result.nativeElement.classList.add('hidden');
    this.displayedProducts = [];
  }

  updateSearch() {
    let field = this.input.nativeElement.value;
    if (field.length < 3) {
      this.result.nativeElement.classList.add('hidden');
      this.displayedProducts = [];
    } else {
      this.result.nativeElement.classList.remove('hidden');
      this.displayedProducts = this.products.filter(
        (product: ProductPreview) => {
          return product.title.toLowerCase().includes(field.toLowerCase());
        }
      );
    }
  }

  preventClose(event: Event) {
    event.preventDefault();
  }
}
