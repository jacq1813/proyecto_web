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
        const iva:number = subtotal * 0.16;
        const total:number = subtotal * (1.16);
        
        const [results] = await conexion.query('INSERT INTO ventas (id_articulo, id_cliente, cantidad, precio, iva, subtotal, total, fecha_venta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nueva.id_articulo, nueva.id_cliente, nueva.cantidad, nueva.precio, iva, subtotal, total, nueva.fecha_venta]);

         // Obtener la cantidad actual del artículo
         const [articuloResult] = await conexion.query('SELECT cantidad_almacen FROM articulos WHERE id = ?', [nueva.id_articulo]);
         if (!articuloResult || articuloResult.length === 0) {
             throw new Error("El artículo no existe");
         }
 
         const cantidadActual: number = articuloResult[0].cantidad_almacen;
 
         // Calcular la nueva cantidad
         const cantidadNueva = cantidadActual - nueva.cantidad;
 
         // Actualizar la cantidad en la tabla articulos solo si la cantidad actual es mayor o igual a la cantidad a vender
            if(cantidadNueva >= 0){
                await conexion.query('UPDATE articulos SET cantidad_almacen = ? WHERE id = ?', [cantidadNueva, nueva.id_articulo]);
            }
            else{
                return { error: "No hay suficiente cantidad en el almacen" };
            }
        return results;
    }
    catch (err) {
        console.log(err);
        return { error: "No se puede realizar la venta" };
    }
}