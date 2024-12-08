import mysql from 'mysql2/promise';

const conexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'pw2024',
    port: 3307, // tuve que cambiar el puerto en mi caso a 3307 porque ya estaba ocupado el 3306
    //xovxyw-keCnej-nawqy0
    multipleStatements: false
});

module.exports = conexion;
