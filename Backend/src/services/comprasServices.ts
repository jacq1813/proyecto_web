import { compraSchema } from "../schemas/compras.schema";
import { CompraNueva } from "../typesCompras";

const conexion = require('../conection/conec');

export const obtenerCompras = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM compras');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener las compras" };
    }
}

export const realizaCompra = async (nueva: CompraNueva) => {
    try {
        const validacion = compraSchema.safeParse(nueva);
        if (!validacion.success) {
            return { error: validacion.error };
        }

        const subtotal = nueva.precio * nueva.cantidad;
        const total = subtotal * (1+nueva.iva);
        // debe insertar la compra en la base de datos y ademas debe actualizar la cantidad de articulos en la tabla articulos
        const [results] = await conexion.query('INSERT INTO compras (id_articulo, cantidad, precio, iva, subtotal, total, fecha_compra) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nueva.id_articulo, nueva.cantidad, nueva.precio, nueva.iva, subtotal, total, nueva.fecha_compra]);

        // Agregar la actualización de la cantidad de articulos en la tabla articulos
        const results2 = await conexion.query('SELECT cantidad_almacen FROM articulos WHERE id = ?', nueva.id_articulo);
        const cantidadActual = results2.cantidad_almacen;
        const cantidadNueva = cantidadActual + nueva.cantidad;
        await conexion.query('UPDATE articulos SET cantidad_almacen = ? WHERE id = ?', [cantidadNueva, nueva.id_articulo]);

        return results;
    }
    catch (err) {
        return { error: "No se puede realizar la compra" };
    }
}