import mysql from 'mysql2/promise';
import { personalSchema } from '../schemas/personal.schema';
import { Personal, PersonalNuevo } from '../typesPersonal';


const conexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'pw2024',
    port: 3307, // tuve que cambiar el puerto en mi caso a 3307 porque ya estaba ocupado el 3306
    //xovxyw-keCnej-nawqy0
    multipleStatements: false
});

export const obtenerPersonal = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM personal');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener el personal" };
    }
}


export const encuentraPersonal = async (id: number) => {
    try {
        const identificador = { id: id }
        const validacion = personalSchema.safeParse(identificador);
        if (!validacion.success) {
            return {
                error: validacion.error
            }
        }
        const [results] = await conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede encontrar el personal" };
    }
}

export const obtenerPersonalTelefono = async (telefono: string) => {
    try {
        //const consulta = `SELECT * FROM personal WHERE telefono=${telefono} AND estatus=1`;
        //const [results] = await conexion.query(consulta);

        const tel = { telefono: telefono }
        const validacion = personalSchema.safeParse(tel);
        if (!validacion.success) {
            return {
                error: validacion.error
            }
        }
        const [results] = await conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus = 1', telefono);
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener el personal con ese numero de telefono" };
    }
}

export const agregarPersonal = async (nuevo: PersonalNuevo) => {
    try {
        const validacion = personalSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await conexion.query('INSERT INTO personal (nombre, direccion, telefono, estatus) VALUES (?, ?, ?, ?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.estatus]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el personal" };
    }
}

export const modificarPersonal = async (modificado: Personal) => {
    try {

        const validacion = personalSchema.safeParse(modificado);
        if (!validacion.success) {
            return {
                error: validacion.error
            }
        }
        const [results] = await conexion.query('UPDATE personal SET nombre=?, direccion = ?, telefono = ?, estatus = ? WHERE id = ?', [modificado.nombre, modificado.direccion, modificado.telefono, modificado.estatus, modificado.id]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar el personal" };
    }
}

export const eliminarPersonal = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM personal WHERE id = ?', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el personal" };
    }
}