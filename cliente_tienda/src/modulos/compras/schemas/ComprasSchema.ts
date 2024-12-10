import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ComprasSchema = toTypedSchema(
    zod.object({
        id:zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        id_articulo:zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        cantidad:zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        precio:zod.number({message: 'Requerido'}).positive({message:'Un número positivo'}),
        iva:zod.number({message: 'Requerido'}).positive({message:'Un número positivo'}),
        subtotal:zod.number({message: 'Requerido'}).positive({message:'Un número positivo'}),
        total:zod.number({message: 'Requerido'}).positive({message:'Un número positivo'}),
        fecha:zod.string().min(1,{message: 'Fecha requerida'}).max(10,{message: 'Máximo 10 caracteres'})
    }).or(
        zod.object({
            id_articulo:zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
    })
    )
)