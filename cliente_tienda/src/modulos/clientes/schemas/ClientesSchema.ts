import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ClientesSchema = toTypedSchema(
    zod.object({
        id:zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        nombre:zod.string().min(1,{message: 'Nombre requerido'}).max(100,{message: 'Máximo 100 caracteres'}),
        direccion:zod.string().min(1,{message: 'Dirección requerida'}).max(200,{message: 'Máximo 200 caracteres'}),
        telefono:zod.string().min(1,{message: 'Teléfono requerido'}).max(20,{message: 'Máximo 20 caracteres'}),
        correo_electronico:zod.string().email({message: 'Correo electrónico inválido'}),
        ciudad:zod.string().min(1,{message: 'Ciudad requerida'}).max(100,{message: 'Máximo 100 caracteres'})
    }).or(
        zod.object({
            nombre:zod.string().min(1,{message: 'Nombre requerido'}).max(100,{message: 'Máximo 100 caracteres'}),
            direccion:zod.string().min(1,{message: 'Dirección requerida'}).max(200,{message: 'Máximo 200 caracteres'}),
            telefono:zod.string().min(1,{message: 'Teléfono requerido'}).max(20,{message: 'Máximo 20 caracteres'}),
            correo_electronico:zod.string().email({message: 'Correo electrónico inválido'}),
            ciudad:zod.string().min(1,{message: 'Ciudad requerida'}).max(100,{message: 'Máximo 100 caracteres'})
        })
    )
)