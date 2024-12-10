import { registroSchema } from "../schemas/registro.schema";
import { RegistroNuevo } from "../typesRegistro";

const conexion = require('../conection/conec');

export const obtenerRegistros = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM registros');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener los registros" };
    }
}

export const agregaRegistro = async (nuevo: RegistroNuevo) => {
    try {

        const validacion = registroSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await conexion.query('INSERT INTO registros (id_personal, fecha, hora) VALUES (?, ?, ?)', [nuevo.id_personal, nuevo.fecha, nuevo.hora]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el registro" };
    }
}


