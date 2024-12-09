import { articulosSchema } from '../schemas/articulos.schema';
import { Articulo, ArticuloNuevo } from '../typesArticulos';

const conexion = require('../conection/conec');

export const obtenerArticulos = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM articulos');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener los articulos" };
    }
}

export const encuentraArticulo = async (id: number) => {
    try {
        const identificador = { id: id }
        const validacion = articulosSchema.safeParse(identificador);
        if (!validacion.success) {
            return {
                error: validacion.error
            }
        }
        const [results] = await conexion.query('SELECT * FROM articulos WHERE id = ? LIMIT 1', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede encontrar el articulo" };
    }
}

export const agregaArticulo = async (nuevo: ArticuloNuevo) => {
    try {
        const validacion = articulosSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await conexion.query('INSERT INTO articulos (descripcion, precio, cantidad_almacen, fecha_caducidad) VALUES (?, ?, ?, ?)', [nuevo.descripcion, nuevo.precio, nuevo.cantidad_almacen, nuevo.fecha_caducidad]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el articulo" };
    }
}

export const modificarArticulo = async (modificado: Articulo) => {

    try {

        const validacion = articulosSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        
        const [results] = await conexion.query('UPDATE articulos SET descripcion = ?, precio = ?, cantidad_almacen = ?, fecha_caducidad = ? WHERE id = ?', [modificado.descripcion, modificado.precio, modificado.cantidad_almacen, modificado.fecha_caducidad, modificado.id]);
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


