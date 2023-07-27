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
    const products: ProductPreview[] = [];
    await fetch(environment.SERVER_URL + 'api/' + 'products', {
      method: 'GET',
    }).then(async (res) => {
      const data = await res.json();
      data.forEach((p: any) => {
        const product: ProductPreview = {
          id: p.id,
          image: p.image ? p.image.src : '',
          title: p.title,
          price: p.variants[0].price,
          address: '3800 Normanville',
          city: 'Montréal',
          province: 'QC',
          category: 'Vêtements',
        };
        products.push(product);
      });
    });

    return products;
  }

  async get(handle: string) {
    const result = await this.communicationService.queryToShopify(
      PRODUCT_BY_HANDLE_QUERY,
      { handle: handle }
    );
    console.log(result);
    const productPreview: ProductPreview = {
      id: result.productByHandle.handle,
      image: result.productByHandle.images.edges[0].node.url,
      title: result.productByHandle.title,
      price: result.productByHandle.priceRange.maxVariantPrice.amount,
      address: '3800 Normanville',
      city: 'Montréal',
      province: 'QC',
      category: 'Vêtements',
    };
    const product: Product = {
      preview: productPreview,
      description: result.productByHandle.description,
      otherImages: result.productByHandle.images.edges.map((edge: any) => {
        return edge.node.url;
      }),
      condition: 'Comme neuf',
      sellerID: result.productByHandle.vendor,
      filters: {},
    };
    return product;
  }

  // exemple de handle
  // the-collection-snowboard-hydrogen
}
