//import { ALL_PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from "../constants";
import { environment } from "../environments/environment";
import { ProductPreview } from "@common/product-preview";
//import { Product } from "../../../common/product";

// import { Product } from "../interfaces/product";
// import { ProductPreview } from "../interfaces/product-preview";
// import Shopify from "shopify-api-node";
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const fetch = require("node-fetch");
import '@shopify/shopify-api/adapters/node';
import {shopifyApi, LATEST_API_VERSION, Shopify, Session} from '@shopify/shopify-api';
import {RestResources, restResources} from '@shopify/shopify-api/rest/admin/2023-07';


export class ShopifyService {
  shopify: Shopify<RestResources>;
  session: Session;
  constructor() {
    this.shopify = shopifyApi({
        apiKey: environment.SHOPIFY_API_KEY,
        apiSecretKey: environment.SHOPIFY_API_SECRET_KEY,
        scopes: ['read_products'],
        hostName: environment.SHOPIFY_HOST_NAME,
        hostScheme: 'https',
        apiVersion: LATEST_API_VERSION,
        isEmbeddedApp: true,
        isCustomStoreApp: true,
        adminApiAccessToken: environment.SHOPIFY_API_ACCESS_TOKEN,
        userAgentPrefix: undefined,
        privateAppStorefrontAccessToken: undefined,
        customShopDomains: undefined,
        billing: undefined,
        logger: {
          log: (severity, message) => {
            console.log(severity, message);
          },
        },
        restResources,
      });
    this.session = this.shopify.session.customAppSession(environment.SHOPIFY_HOST_NAME);

  }

  async createProduct() {
    const product = new this.shopify.rest.Product({session: this.session});
    product.title = "test-js-api";
    product.body_html = "<strong>Testing</strong>";
    product.vendor = "re-vent";
    product.product_type = "test-type";
    product.status = "draft";
    await product.save({
        update: true,
    });
    return this.createMetaField(product.id);
  }

  
  async getProductsByCollection(id: number){
      const collect = await this.shopify.rest.Collection.products({
          session: this.session,
          id: id,
    });
    return collect
  }

  async getProducts(){
    const products = await this.shopify.rest.Product.all({
        session: this.session,
    });
    return products.data.map((product) => {
      const p: ProductPreview = {
        id: product.id ?? 0,
        title: product.title ?? '',
        image: product.image?.src ?? '',
        price: Array.isArray(product.variants) ? product.variants[0].price : '',
        address: 'string', // meta
        city: 'string', // meta
        province: 'string', // meta
        category: 'string',

      }
      return p;
    })
  }

  async getProductById(id: string){
    const product = await this.shopify.rest.Product.find({
        session: this.session,
        id: id
    });
    return product;
  }

  async createMetaField(id: number | null){
    const metafield = new this.shopify.rest.Metafield({session: this.session});
    metafield.product_id = id;
    metafield.namespace = "my_fields";
    metafield.key = "sponsor";
    metafield.type = "single_line_text_field";
    metafield.value = "Shopify";
    await metafield.save({
    update: true,
    });
    return metafield;
  }

// OLD GRAPHQL API CALLS


  // async getAll() {
  //   const products: ProductPreview[] = [];
  //   const result = await this.query(ALL_PRODUCTS_QUERY);
  //   result.products.edges.forEach((edge: any) => {
  //       const image = edge.node.images.edges[0];
  //       const url = image ? image.node.url : ''
  //     const product: ProductPreview = {
  //       id: edge.node.id,
  //       handle: edge.node.handle,
  //       image: url,
  //       title: edge.node.title,
  //       price: edge.node.priceRange.maxVariantPrice.amount,
  //       address: "3800 Normanville",
  //       city: "Montréal",
  //       province: "QC",
  //       category: "Vêtements",
  //     };
  //     products.push(product);
  //   });
  //   return products;
  // }

  // async get(handle: string) {
  //   const result = await this.query(PRODUCT_BY_HANDLE_QUERY, {
  //     handle: handle,
  //   });
  //   const productPreview: ProductPreview = {
  //     id: result.productByHandle.id,
  //     handle: result.productByHandle.handle,
  //     image: result.productByHandle.images.edges[0].node.url,
  //     title: result.productByHandle.title,
  //     price: result.productByHandle.priceRange.maxVariantPrice.amount,
  //     address: "3800 Normanville",
  //     city: "Montréal",
  //     province: "QC",
  //     category: "Vêtements",
  //   };
  //   const product: Product = {
  //     preview: productPreview,
  //     description: result.productByHandle.description,
  //     otherImages: result.productByHandle.images.edges.map((edge: any) => {
  //       return edge.node.url;
  //     }),
  //     condition: "Comme neuf",
  //     sellerID: result.productByHandle.vendor,
  //   };
  //   return product;
  // }

  // private async query(query: string, variables?: object) {
  //   try {
  //     const result = await fetch(
  //       `https://${environment.SHOPIFY_HOST_NAME}/api/2023-04/graphql.json`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Shopify-Storefront-Access-Token":
  //             environment.SHOPIFY_STOREFRONT_TOKEN,
  //         },
  //         body: JSON.stringify({ query: query, variables: variables }),
  //       }
  //     ).then((res: any) => res.json());

  //     if (result.errors) {
  //       console.log({ errors: result.errors });
  //     } else if (!result || !result.data) {
  //       console.log({ result });
  //       return [];
  //     }
  //     return result.data;
  //   } catch (error) {
  //     console.log(error);
  //     return [];
  //   }
  // }
}
