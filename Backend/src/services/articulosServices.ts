import { ArticuloNuevo } from '../typesArticulos';

const conexion = require('../database/conexion');

export const obtenerArticulos = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM articulos');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener los articulos" };
    }
}

export const agregaArticulo = async (nuevo: ArticuloNuevo) => {
    try {
        const [results] = await conexion.query('INSERT INTO articulos (nombre, precio, cantidad, estatus) VALUES (?, ?, ?, ?)', [nuevo.descripcion, nuevo.precio, nuevo.cantidad_almacen, nuevo.fecha_caducidad]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el articulo" };
    }
}

export const modificarArticulo = async (modificado: ArticuloNuevo) => {

    try {
        const [results] = await conexion.query('UPDATE articulos SET nombre=?, precio = ?, cantidad = ?, estatus = ? WHERE id = ?', [modificado.descripcion, modificado.precio, modificado.cantidad_almacen, modificado.fecha_caducidad]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar el articulo" };
    }
}

export const eliminarArticulo = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM articulos WHERE id = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el articulo" };
    }
}


