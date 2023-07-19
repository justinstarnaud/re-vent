import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() {}

  async queryToShopify(query: string, variables?: object){
    try {
      const result = await fetch(`https://${environment.SHOPIFY_HOST_NAME}/api/2023-04/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": environment.SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query: query, variables: variables }),
      }).then((res) => res.json());
  
      if (result.errors) {
        console.log({ errors: result.errors });
      } else if (!result || !result.data) {
        console.log({ result });
        return [];
      }
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
