import * as express from 'express';
import { getStock } from '../services/inventory.service';

export const getAll = async (req: express.Request, res: express.Response): Promise<void> => {
    const stock = await getStock();
    res.send(stock);
}
