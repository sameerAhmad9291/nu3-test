import * as mongoose from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

interface ProductModel extends IProduct, mongoose.Document { };

const imageSchema: mongoose.Schema = new mongoose.Schema({
    id: Number,
    productId: Number,
    createdAt: Date,
    updatedAt: Date,
    width: Number,
    height: Number,
    src: String,
}, { _id: false });

const productSchema: mongoose.Schema = new mongoose.Schema({
    id: Number,
    title: String,
    bodyHtml: String,
    vendor: String,
    productType: String,
    createdAt: Date,
    handle: String,
    publishedScope: String,
    tags: String,
    image: imageSchema,
});

const Product = mongoose.model<ProductModel>("Product", productSchema, 'products');

export default Product;
