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

export const encuentraCompra = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM compras WHERE id = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener la compra" };
    }
}


export const realizaCompra = async (nueva: CompraNueva) => {
    try {
        const validacion = compraSchema.safeParse(nueva);
        if (!validacion.success) {
            console.log("Error en la validación");
            return { error: validacion.error };
        }

        // Calcular subtotal y total
        const subtotal: number = nueva.precio * nueva.cantidad;
        const iva: number = subtotal * nueva.iva;
        const total: number = subtotal * (1 + nueva.iva);

       

        // Insertar la nueva compra en la tabla compras
        const [results] = await conexion.query(
            'INSERT INTO compras (id_articulo, cantidad, precio, iva, subtotal, total, fecha_compra) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nueva.id_articulo, nueva.cantidad, nueva.precio, iva, subtotal, total, nueva.fecha_compra]
        );

        // Obtener la cantidad actual del artículo
        const [articuloResult] = await conexion.query('SELECT cantidad_almacen FROM articulos WHERE id = ?', [nueva.id_articulo]);
        if (!articuloResult || articuloResult.length === 0) {
            throw new Error("El artículo no existe");
        }

        const cantidadActual: number = articuloResult[0].cantidad_almacen;

        // Calcular la nueva cantidad
        const cantidadNueva = cantidadActual + nueva.cantidad;

        // Actualizar la cantidad en la tabla articulos
        await conexion.query('UPDATE articulos SET cantidad_almacen = ? WHERE id = ?', [cantidadNueva, nueva.id_articulo]);

    
        return results;
    } catch (err) {
        // Revertir la transacción en caso de error
        await conexion.rollback();
        console.log(err);
        return { error: "No se puede realizar la compra" };
    }
};
