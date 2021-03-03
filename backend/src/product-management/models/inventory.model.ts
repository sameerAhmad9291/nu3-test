import * as mongoose from 'mongoose';
import { IInventory } from '../interfaces/inventory.interface';

interface InventoryModel extends IInventory, mongoose.Document { };

const inventorySchema: mongoose.Schema = new mongoose.Schema({
    handle: String,
    location: String,
    amount: Number,
});

const Inventory = mongoose.model<InventoryModel>("Inventory", inventorySchema, 'inventories');

export default Inventory;
