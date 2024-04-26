import mysql from "mysql2/promise";

const CONFIG_DEFAULT = {
    user: "root",
    host: "localhost",
    password: "",
    database: "ecommerce",
    port: 3306
}

const connectionString = process.env.PORT ?? CONFIG_DEFAULT;

const connection = await mysql.createConnection(connectionString);

export class User{

    static async getAll({email} , {password}){

        if(email && password){
            
            const [user, tableInfo] = await connection.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password]);

            if(user.length === 0){
                return null;
            }
            return user[0];
        }

        const[users, tableInfo] = await connection.query("SELECT * FROM user;");
        return users;
    }

    static async getById({ id }){
        const[users, tableInfo] = await connection.query("SELECT * FROM user WHERE id_user = ?;", [id]);

        if(users.length === 0){
            return null;
        }
        return users[0];
    }

    static async create({ input }){
        const {
            email,
            password,
            userName
        } = input;

        let id;
        try{
            const result = await connection.query(`INSERT INTO user (email, password, userName) 
            VALUES (?, ?, ?);`, [email, password, userName]);
            
            id = result[0].insertId;
        } catch {
            throw new Error("Error creating User");
        }

        const [user, tableInfo] = await connection.query("SELECT * FROM user WHERE id_user = ?", [id]);
        return user[0];

    }

    static async delete({ id }){
        const result = await connection.query("DELETE FROM user WHERE id = ?", [id]);

        if(result.length === 0){
            return null;
        }
        return true;
    }

    static async update({ id }, { input }){
        const [users, tableInfo] = await connection.query("SELECT * FROM user WHERE id_user = ?", [id]);
        const user = {
            ...users[0],
            ...input
        };

        const result = await connection.query(`UPDATE user SET email = ?, password = ?, userName = ?
        WHERE id_user = ?;`,
        [user.email, user.password, user.userName, id]);

        if(result[0].affectedRows > 0){
            const[users, tableInfo] = await connection.query("SELECT * FROM user WHERE id_user = ?", [id]);
            return users[0];
        } else {
            return false;
        }
    }

}