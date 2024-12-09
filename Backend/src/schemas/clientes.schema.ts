import { z } from 'zod';

const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const correoRegEx = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);

export const clienteSchema = z.object({
    nombre: z.string().min(2, "Minimo 2 caracteres").max(200, "Maximo 200 caracteres"),
    direccion: z.string().min(2, "Minimo 2 caracteres").max(300, "Maximo 300 caracteres"),
    telefono: z.string().regex(telefonoRegEx),
    correo_electronico: z.string().regex(correoRegEx, "Correo electronico invalido"),
    ciudad: z.string().min(2, "Minimo 2 caracteres").max(100, "Maximo 100 caracteres")

}).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
);