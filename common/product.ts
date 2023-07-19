import { ClothingFilter } from './filters';
import { ProductPreview } from './product-preview';

export interface Product {
  preview: ProductPreview;
  description: string;
  otherImages: string[];
  condition: string; // meta
  filters: ClothingFilter | null;
  sellerID: string;
}


