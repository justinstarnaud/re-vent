//import { DatabaseService } from '../services/database.service';
import { Request, Response, Router } from "express";
// import { ValidateFunction, Validator } from 'express-json-validator-middleware';
// import { StatusCodes } from 'http-status-codes';
import { Service } from "typedi";
import { ShopifyService } from "../services/shopify.service";

@Service()
export class HttpController {
  router: Router;
  shopify: ShopifyService;

  constructor() {
    this.configureRouter();
  }

  private configureRouter() {
    this.router = Router();
    this.shopify = new ShopifyService();

    this.router.get("/products", async (req: Request, res: Response) => {
      const products = await this.shopify.getProducts();
      res.json(products);
    });

    this.router.get("/products/:id", async (req: Request, res: Response) => {
      const products = await this.shopify.getProductsByCollection(
        parseInt(req.params.id)
      );
      res.json(products);
    });

    this.router.get("/product/:id", async (req: Request, res: Response) => {
      const product = await this.shopify.getProductById(req.params.id);
      res.json(product);
    });

    this.router.post("/metafield/:id", async (req: Request, res: Response) => {
      const field = await this.shopify.createMetaField(parseInt(req.params.id));
      res.json(field);
    });

    // this.router.post('/product', async (req: Request, res: Response) => {
    //     const response = await this.shopify.createProduct();
    //     res.json(response);
    // });
  }
}
