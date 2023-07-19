import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filters } from 'src/app/interfaces/filters';
import { ProductPreview } from 'src/app/interfaces/product-preview';
import { ProductService } from 'src/app/services/product.service';
import { items } from 'src/TEMP MOCK FILES/item-previews';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  category: string;
  products: ProductPreview[];
  sortOpen: boolean;
  currentSort: string;
  showFiltersMobile: boolean;
  sortName: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.category = '';
    this.currentSort = 'vedette';
    this.sortOpen = false;
    this.sortName = 'En vedette';
    this.showFiltersMobile = false;
    this.products = items;
    this.route.queryParams.subscribe(async (params) => {
      this.category = params['category'];
      // TODO: Get only category ?
      this.products = await this.productService.getAll();
    });
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
          this.products = await this.productService.getAll();
          this.sortName = 'En vedette';
          break;
        case 'recents':
          // TODO: AJOUTER UN CHAMPS 'DATEAJOUT' DANS SHOPIFY
          this.sortName = 'Les plus récents';

          break;
        case 'prixcroissant':
          this.products.sort((p1: ProductPreview, p2: ProductPreview) => {
            return parseInt(p1.price) - parseInt(p2.price);
          });
          this.products = JSON.parse(JSON.stringify(this.products));
          this.sortName = 'Prix croissant';

          break;
        case 'prixdescroissant':
          this.products.sort((p1: ProductPreview, p2: ProductPreview) => {
            return parseInt(p2.price) - parseInt(p1.price);
          });
          this.products = JSON.parse(JSON.stringify(this.products));
          this.sortName = 'Prix décroissant';

          break;
      }
    }
    this.sortOpen = false;
  }

  async updateFilters(filtersUpdate: filters) {
    this.products = await this.productService.getAll();
    this.products = this.products.filter((product: ProductPreview) => {
      return (
        parseInt(product.price) >= filtersUpdate.price[0] &&
        parseInt(product.price) <= filtersUpdate.price[1]
      );
    });
  }

  showFilters() {
    this.showFiltersMobile = true;
  }

  hideFilters() {
    this.showFiltersMobile = false;
  }
}
