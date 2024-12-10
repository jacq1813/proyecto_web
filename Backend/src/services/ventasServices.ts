import { ventaSchema } from "../schemas/ventas.schema";
import { VentaNueva } from "../typesVentas";

const conexion = require('../conection/conec');

export const obtenerVentas = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM ventas');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener las ventas" };
    }
}

export const encuentraVenta = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM ventas WHERE id = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener la venta" };
    }
}

export const ventasCliente = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM ventas WHERE id_cliente = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener la venta" };
    }
}

export const ventasArticulo = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM ventas WHERE id_articulo = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener la venta" };
    }
}

export const realizaVenta = async (nueva: VentaNueva) => {
    try {
        const validacion = ventaSchema.safeParse(nueva);
        if (!validacion.success) {
            console.log("Error en la validación");
            return { error: validacion.error };
        }
        const subtotal:number = nueva.precio * nueva.cantidad;
        const total:number = subtotal * (1+nueva.iva);
        // debe insertar la venta en la base de datos y ademas debe actualizar la cantidad de articulos en la tabla articulos
        const [results] = await conexion.query('INSERT INTO ventas (id_articulo, id_cliente, cantidad, precio, iva, subtotal, total, fecha_venta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nueva.id_articulo, nueva.id_cliente, nueva.cantidad, nueva.precio, nueva.iva, subtotal, total, nueva.fecha_venta]);
        // Agregar la actualización de la cantidad de articulos en la tabla articulos
        // const results2 = await conexion.query('SELECT cantidad_almacen FROM articulos WHERE id = ?', nueva.id_articulo);
        // const cantidadActual = results2.cantidad_almacen;
        // const cantidadNueva = cantidadActual - nueva.cantidad;
        // await conexion.query('UPDATE articulos SET cantidad_almacen = ? WHERE id = ?', [cantidadNueva, nueva.id_articulo]);

        return results;
    }
    catch (err) {
        console.log(err);
        return { error: "No se puede realizar la venta" };
    }
}