import { ProductPreview } from './product-preview';

export interface Product {
  preview: ProductPreview;
  description: string;
  otherImages: string[];
  condition: string; // hardcode
  sellerID: string;
}
