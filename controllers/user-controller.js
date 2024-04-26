import { User } from "../models/mysql/user.js";
import { validatePartialUser, validateUser } from "../schema/user-schema.js";


export class UserController{
    static async getAll(req, res){
        const { email, password } = req.query;
        const users = await User.getAll({email}, {password});
        if(users){
            return res.json(users);
        }
        res.json({message: "User not found"});
        
    }

    static async getById(req, res){
        const { id } = req.params;
        const users = await User.getById({ id });

        res.json(users);
    }

    static async create(req, res){
        const result = validateUser(req.body);

        if(!result){
            return res.status(400).json({error: JSON.parse(result.error.message)});         
        }

        const user = await User.create({ input: result.data });
        res.json(user);
    }

    static async delete(req, res){
        const { id } = req.params;

        const userDeleted = await User.delete({ id });
        if(!userDeleted){
            return res.status(404).json({message: "User not found"});
        } 
        res.json({ message: "User deleted"});
    }

    static async update(req, res){
        const { id } = req.params;
        const result = validatePartialUser(req.body);

        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)});         
        }

        const userUpdated = await User.update({ id }, { input: result.data });
        res.json(userUpdated);
    }
}