import * as express from 'express';
import { getProducts } from '../services/product.service';

export const getAll = async (req: express.Request, res: express.Response): Promise<void> => {
    const products = await getProducts();
    res.send(products);
}
