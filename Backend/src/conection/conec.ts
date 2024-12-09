require('dotenv').config();
import mysql from 'mysql2/promise';
const HOST : string = process.env.HOST || 'localhost';
const USER : string = process.env.DB_USER || 'root';
const BD : string = process.env.DATABASE || 'proyecto';
const PUERTO : number = parseInt(process.env.PORT || '3306');


const testConnection = async () => {
    try {
        const connection = await conexion.getConnection();
        console.log("Conexión exitosa a la base de datos");
        connection.release(); // Liberar la conexión al pool.
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

testConnection();

const conexion = mysql.createPool({
    host: HOST,
    user: USER,
    database: BD,
    port: PUERTO, // tuve que cambiar el puerto en mi caso a 3307 porque ya estaba ocupado el 3306
    //xovxyw-keCnej-nawqy0
    multipleStatements: false
});

module.exports = conexion;
