import { readFile, UPLOAD_PATH } from "../../utils";
import { IInventory } from "../interfaces/inventory.interface";
import Inventory from "../models/inventory.model";
import { sendWebhook } from "../utils/requestbin";

export const processCSVFile = async (file) => {
    const inventories = await readCSVFile(file);
    const updatedRows = await saveOrUpdate(inventories);
    updatedRows.map(data => {
        sendWebhook(data);
    });
    return updatedRows;
}

export const saveOrUpdate = async (inventories: IInventory[]) => {
    const promises = inventories.map((inventory) => Inventory.findOneAndUpdate({
        handle: inventory.handle,
    }, {
        ...inventory,
    }, {
        new: true,
        upsert: true,
    }).lean());

    const updatedRows = await Promise.all(promises);
    return updatedRows;
}

const readCSVFile = async (file): Promise<IInventory[]> => {
    const data = await readFile(`${UPLOAD_PATH}${file.filename}`);
    const lines = data.replace(/['"]+/g, '').split('\r\n');
    const headers = lines[0].split(';');
    const rows: IInventory[] = [];
    lines.shift();
    lines.filter(str => str).map(l => {
        const obj = {} as IInventory;
        const line = l.split(';');
        line.map((txt, i) => {
            obj[headers[i]] = txt;
        });

        rows.push(obj)
    })

    return rows;
}

export const getStock = async (): Promise<IInventory[]> => {
    return Inventory.find({}).lean();
}