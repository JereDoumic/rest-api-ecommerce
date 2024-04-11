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

export class ProductModel{
    static async getAll(){
        const [products, tableInfo] = await connection.query("SELECT * FROM product");
        
        return products;
    }

    static async getById({ id }){
        const [products, tableInfo] = await connection.query
            (`SELECT * FROM product WHERE id_product = ?;`, [id]);
        if(products.length === 0){
            return null;
        }
        
        return products[0];
    }

    static async create({ input }){
        const {
            id_category,
            title,
            description,
            price,
            image
        } = input;
        
        let id;

        try{
            const result = await connection.query(`INSERT INTO product (id_category, title, description, price, image)
            VALUES(?, ?, ?, ?, ?);`, [id_category, title, description, price, image]);
            id = result[0].insertId;
        } catch(e){
            //puede enviar informacion sensible
            throw new Error("Error creating product");
        }

        const [product, tableInfo] = await connection.query("SELECT * FROM product WHERE id_product = ?", [id]);
        return product[0];
    }       

    static async delete({ id }){
        const result = await connection.query("DELETE FROM product WHERE id_product = ?", [id]);

        if(result[0].affectedRows > 0){
            return true;
        } else{
            return false;
        }
    }

    static async update({ id }, { input }){
        const [products, tableInfo] = await connection.query("SELECT * FROM product WHERE id_product = ?;", [id]);

        const productUpdated = {
            ...products[0],
            ...input
        }

        const result = await connection.query(`UPDATE product 
        SET id_category = ?, title = ?, description = ?, price = ?, image = ?
        WHERE id_product = ?`,
        [productUpdated.id_category, productUpdated.title, productUpdated.description, 
        productUpdated.price, productUpdated.image, id]);
    
        if(result[0].affectedRows > 0){
            const [product, tableInfo] = await connection.query("SELECT * FROM product WHERE id_product = ?", [id]);
            return product[0];
        } else{
            return false;
        }
    }

}