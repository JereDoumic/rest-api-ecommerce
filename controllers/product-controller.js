import {validateProduct, validatePartialProduct} from "../schema/product-schema.js"
import {ProductModel} from "../models/mysql/product.js";

export class ProductController{
    static async getAll(req, res) {
        const products = await ProductModel.getAll();
        return res.json(products);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const product = await ProductModel.getById({ id });
        res.json(product);
    }

    static async create(req, res) {
        const result = validateProduct(req.body);
        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)});        
        }

        const newProduct = await ProductModel.create({ input: result.data });

        res.status(201).json(newProduct);
    }

    static async delete(req, res){
        const { id } = req.params;

        const result = await ProductModel.delete({ id });
        if(!result){
            return res.status(404).json({message: "Product not found"});
        }

        res.json({ message: "Product deleted"});
    }

    static async update(req, res){
        const { id } = req.params;
        const result = validatePartialProduct(req.body);

        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)});        
        } 

        const productUpdated = await ProductModel.update({id}, { input: result.data });
        res.json(productUpdated);
    }
}