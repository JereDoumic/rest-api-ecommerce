import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
    user: "root",
    host: "localhost",
    password: "",
    database: "ecommerce",
    port: 3306
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class CategoryModel{
    static async getAll(){
        const [categories, tableInfo] = await connection.query("SELECT * FROM category");
        
        return categories;
    }

    static async getById({ id }){
        const [categories, tableInfo] = await connection.query(`SELECT * FROM category WHERE id_category = ?`, [id]);
        if(categories.length === 0){
            return null;
        }        
        return categories[0];
    }

    static async create({ input }){
        const { category } = input;
        let id;
        try{
            const result = await connection.query(`INSERT INTO category (category) VALUES (?);`, [category]);
            id = result[0].insertId;
        } catch (error) {
            throw new Error("Error creating category");
        }

        const [categories, tableInfo] = await connection.query("SELECT * FROM category WHERE id_category = ?", [id]);
        return categories[0];
    }

    static async delete({ id }){
        const result = await connection.query("DELETE FROM category WHERE id_category = ?", [id]);

        if(result[0].affectedRows > 0){
            return true;
        } else{
            return false;
        }
    }

    static async update({ id }, { input }){
        const [category, tableInfo] = await connection.query("SELECT * FROM category WHERE id_category = ?", [id]);

        const categoryToUpdate = {
            ...category,
            ...input
        }

        await connection.query("UPDATE category SET category = ? WHERE id_category = ?", [categoryToUpdate.category, id]);
    }
}