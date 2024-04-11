import { CategoryModel } from "../models/mysql/category.js";
import { validateCategory, validatePartialCategory } from "../schema/category-schema.js";


export class CategoryController{
    static async getAll(req, res){
        const categories = await CategoryModel.getAll();
        res.json(categories);
    }

    static async getById(req, res){
        const { id } = req.params;
        const category = await CategoryModel.getById({ id });
        if(category){
            return res.json(category);
        }
        res.status(404).json({ message: 'Movie not found' });
    }

    static async create(req, res){
        const result = validateCategory(req.body);
        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)});      
        }
        const newCategory = await CategoryModel.create({ input: result.data });
        res.status(201).json(newCategory);
    }

    static async delete(req, res){
        const { id } = req.params;

        const result = await CategoryModel.delete({ id });
        if(result === false){
            return res.status(404).json({ message: "Category not found"});
        }
        
        res.status(201).json({message: "Category deleted"});
    }

    static async update(req, res){
        const { id } = req.params;
        const result = validatePartialCategory(req.body);

        if(!result){
            return res.status(400).json({error: JSON.parse(result.error.message)});
        }

        await CategoryModel.update({ id }, { input: result.data });
        res.status(201).json({message: "Category updated"});
    }
}