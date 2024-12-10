import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const PersonalSchema = toTypedSchema(
    zod.object({
        id:zod.number({message: 'Rquerido'}).int().positive({message:'Un entero positivo'}),
        nombre:zod.string().min(1,{message: 'Nombre requerido'}).max(200,{message: 'Máximo 200 caracteres'}),
        direccion:zod.string().min(1,{message: 'Direccion requerida'}).max(300,{message: 'Máximo 300 caracteres'}),
        telefono:zod.string().min(10,{message: 'Minimo 10 números'}).max(15,{message: 'Máximo 15 números'}),
        estatus: zod.number({message: 'Estatus requerido'}).int().positive({message:'Minimo 1'}).min(1).max(2,{message: 'Maximo 2'})
    }).or(
        zod.object({
            nombre:zod.string().min(1,{message: 'Nombre requerido'}).max(200,{message: 'Máximo 200 caracteres'}),
            direccion:zod.string().min(1,{message: 'Direccion requerido'}).max(300,{message: 'Máximo 300 caracteres'}),
            telefono:zod.string().min(10,{message: 'Minimo 10 números'}).max(15,{message: 'Máximo 15 números'}),
            estatus: zod.number({message: 'Estatus requerido'}).int().positive({message:'Minimo 1'}).min(1).max(2,{message: 'Maximo 2'})
        })
    )
)