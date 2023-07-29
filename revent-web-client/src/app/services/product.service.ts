import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { ALL_PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from '../constants';
import { Product } from '../../../../common/product';
import { ProductPreview } from '../../../../common/product-preview';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private communicationService: CommunicationService) {}

  async getAll() {
    const products: Product[] = [];
    await fetch(environment.SERVER_URL + 'api/' + 'products', {
      method: 'GET',
    }).then(async (res) => {
      const data = await res.json();
      data.forEach((p: any) => {
        const productPreview: ProductPreview = {
          id: p.id,
          image: p.image ? p.image.src : '',
          title: p.title,
          price: p.variants[0].price,
          address: '3800 Normanville',
          city: 'Montréal',
          province: 'QC',
          category: 'Vêtements',
        };
        const product: Product = {
          preview: productPreview,
          description: 'DEFAULT DESC',
          otherImages: p.images.map((img: any) => {
            return img.src;
          }),
          condition: 'Comme neuf',
          sellerID: p.vendor,
          filters: {},
        };

        products.push(product);
      });
    });

    return products;
  }

  async get(id: number): Promise<Product | undefined> {
    let productFromId;
    await fetch(environment.SERVER_URL + 'api/' + 'product/' + id, {
      method: 'GET',
    }).then(async (res) => {
      const result = await res.json();

      const productPreview: ProductPreview = {
        id: result.id,
        image: result.image ? result.image.src : '',
        title: result.title,
        price: result.variants[0].price,
        address: '3800 Normanville',
        city: 'Montréal',
        province: 'QC',
        category: 'Vêtements',
      };
      const product: Product = {
        preview: productPreview,
        description: 'DEFAULT DESC',
        otherImages: result.images.map((img: any) => {
          return img.src;
        }),
        condition: 'Comme neuf',
        sellerID: result.vendor,
        filters: {},
      };

      productFromId = product;
    });

    return productFromId;
  }

  // exemple de handle
  // the-collection-snowboard-hydrogen
}
