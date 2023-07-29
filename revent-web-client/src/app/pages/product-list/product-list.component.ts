import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filters } from 'src/app/interfaces/filters';
import { ProductService } from 'src/app/services/product.service';
import { items, itemsFilter } from 'src/TEMP MOCK FILES/item-previews';
import { ClothingFilter } from '../../../../../common/filters';
import { Product } from '../../../../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  category: string;
  products: Product[];
  filteredProducts: Product[];

  sortOpen: boolean;
  currentSort: string;
  showFiltersMobile: boolean;
  sortName: string;
  received: boolean;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.category = '';
    this.received = false;
    this.currentSort = 'vedette';
    this.sortOpen = false;
    this.sortName = 'En vedette';
    this.showFiltersMobile = false;
    this.products = [];
    this.route.queryParams.subscribe(async (params) => {
      this.category = params['category'];
      // TODO: Get only category ?

      this.products = await this.productService.getAll();
      this.filteredProducts = JSON.parse(JSON.stringify(this.products));
      this.received = true;
    });
    this.filteredProducts = [];
  }
  ngOnInit(): void {}

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  toggleSort() {
    this.sortOpen = !this.sortOpen;
  }

  async closeSort(newSort: string = '') {
    if (newSort) {
      this.currentSort = newSort;
      switch (this.currentSort) {
        case 'vedette':
          // this.products = await this.productService.getAll();
          this.sortName = 'En vedette';
          break;
        case 'recents':
          // TODO: AJOUTER UN CHAMPS 'DATEAJOUT' DANS SHOPIFY
          this.sortName = 'Les plus récents';

          break;
        case 'prixcroissant':
          this.products.sort((p1: Product, p2: Product) => {
            return parseInt(p1.preview.price) - parseInt(p2.preview.price);
          });
          this.products = JSON.parse(JSON.stringify(this.products));
          this.sortName = 'Prix croissant';

          break;
        case 'prixdescroissant':
          this.products.sort((p1: Product, p2: Product) => {
            return parseInt(p2.preview.price) - parseInt(p1.preview.price);
          });
          this.products = JSON.parse(JSON.stringify(this.products));
          this.sortName = 'Prix décroissant';

          break;
      }
    }
    this.sortOpen = false;
  }

  async updateFilters(filtersUpdate: Map<string, any[]>) {
    this.filteredProducts = this.products.filter((product: Product) => {
      return (
        parseInt(product.preview.price) >= filtersUpdate.get('price')![0] &&
        parseInt(product.preview.price) <= filtersUpdate.get('price')![1]
      );
    });

    filtersUpdate.delete('price');
    for (const [filterName, filterValues] of filtersUpdate) {
      this.filteredProducts = this.filteredProducts.filter(
        (product: Product) => {
          if (!product.filters) return false;
          return filterValues.includes(
            product.filters[filterName as keyof ClothingFilter]
          );
        }
      );
    }
  }

  showFilters() {
    this.showFiltersMobile = true;
  }

  hideFilters() {
    this.showFiltersMobile = false;
  }
}
