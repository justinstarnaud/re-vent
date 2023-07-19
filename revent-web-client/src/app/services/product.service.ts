import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { ALL_PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from '../constants';
import { Product } from '../interfaces/product';
import { ProductPreview } from '../interfaces/product-preview';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private communicationService: CommunicationService) {}

  async getAll() {
    const products: ProductPreview[] = [];
    const result = await this.communicationService.queryToShopify(
      ALL_PRODUCTS_QUERY
    );
    result.products.edges.forEach((edge: any) => {
      const product: ProductPreview = {
        handle: edge.node.handle,
        image: edge.node.images.edges[0].node.url,
        title: edge.node.title,
        price: edge.node.priceRange.maxVariantPrice.amount,
        address: '3800 Normanville',
        city: 'Montréal',
        province: 'QC',
        category: 'Vêtements',
      };
      products.push(product);
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
      handle: result.productByHandle.handle,
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
    };
    return product;
  }

  // exemple de handle
  // the-collection-snowboard-hydrogen
}
