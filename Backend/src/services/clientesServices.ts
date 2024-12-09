import { clienteSchema } from '../schemas/clientes.schema';
import { Cliente, ClienteNuevo } from '../typesClientes';

const conexion = require('../conection/conec');

export const obtenerClientes = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM clientes');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener los clientes" };
    }
}

export const encuentraCliente = async (id: number) => {
    try {
        const identificador = { id: id }
        const validacion = clienteSchema.safeParse(identificador);
        if (!validacion.success) {
            return {
                error: validacion.error
            }
        }
        const [results] = await conexion.query('SELECT * FROM clientes WHERE id = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener el cliente" };
    }
}

export const agregaCliente = async (nuevo: ClienteNuevo) => {
    try {

        const validacion = clienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await conexion.query('INSERT INTO clientes (nombre, direccion, telefono, correo_electronico, ciudad) VALUES (?, ?, ?, ?, ?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.correo_electronico, nuevo.ciudad]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el cliente" };
    }
}

export const modificarCliente = async (modificado: Cliente) => {

    try {
        const validacion = clienteSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        
        const [results] = await conexion.query('UPDATE clientes SET nombre=?, direccion = ?, telefono = ?, correo_electronico = ?, ciudad = ? WHERE id = ?', [modificado.nombre, modificado.direccion, modificado.telefono, modificado.correo_electronico, modificado.ciudad, modificado.id]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar el cliente" };
    }
}

export const eliminarCliente = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM clientes WHERE id = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el cliente" };
    }
}
