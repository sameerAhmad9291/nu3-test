import * as xml2js from 'xml2js';

import { readFile, UPLOAD_PATH } from "../../utils";
import { IProduct } from '../interfaces/product.interface';
import Product from '../models/product.model';
import { sendWebhook } from '../utils/requestbin';

export const processXMLFile = async (file) => {
    const products = await readXMLFile(file);
    const updatedRows = await saveOrUpdate(products);
    updatedRows.map(data => {
        sendWebhook(data);
    });
    return updatedRows;
}

export const saveOrUpdate = async (products: IProduct[]) => {
    const promises = products.map((product) => Product.findOneAndUpdate({
        handle: product.handle,
    }, {
        ...product,
    }, {
        new: true,
        upsert: true,
    }).lean());

    const updatedRows = await Promise.all(promises);
    return updatedRows;
}

export const readXMLFile = async (file: Express.Multer.File): Promise<IProduct[]> => {
    const parser = new xml2js.Parser({
        ignoreAttrs: true,
    });
    const data = await readFile(`${UPLOAD_PATH}${file.filename}`);
    const jsonData = await parser.parseStringPromise(data, { compact: true });

    const products = jsonData?.products.product;
    const jsonObject = products.map((prod) => {
        const [id] = prod?.id;
        const [title] = prod?.title;
        const [bodyHtml] = prod['body-html'];
        const [vendor] = prod?.vendor;
        const [productType] = prod['product-type'];
        const [createdAt] = prod['created-at'];
        const [handle] = prod['handle'];
        const [publishedScope] = prod['published-scope'];
        const [tags] = prod['tags'];
        const [image] = prod['image'].map((img) => {
            return {
                "id": img.id.pop(),
                "productId": +img['product-id']?.pop(),
                "createdAt": img['created-at']?.pop(),
                "updatedAt": img['updated-at']?.pop(),
                "width": +img['width']?.pop(),
                "height": +img['height']?.pop(),
                "src": img['src']?.pop(),
            }
        });

        return {
            title,
            bodyHtml,
            vendor,
            productType,
            handle,
            publishedScope,
            tags,
            image,
            createdAt,
            id: +id,
        } as IProduct
    })

    return jsonObject;
}

export const getProducts = async (): Promise<IProduct[]> => {
    return Product.find({}).lean();
}
