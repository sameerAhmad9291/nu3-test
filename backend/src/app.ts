import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import authenticationRoutes from './authentication/routes/user.route';
import fileStorageRoutes from './file-storage/routes/file-storage.route';
import productRoutes from './product-management/routes/product.route';
import inventoryRoutes from './product-management/routes/inventory.route'
import { authenticateToken } from "./authentication/middlewares/authenticate.middleware";

const app: express.Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/alive', (req, res) => res.send({ alive: true }));
app.use('/authentication', authenticationRoutes);
app.use('/file-storage', fileStorageRoutes);
app.use('/products', authenticateToken, productRoutes);
app.use('/inventory', authenticateToken, inventoryRoutes);

app.use(errorHandlerMiddleware);
export default app;

