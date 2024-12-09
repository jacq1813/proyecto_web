import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ArticulosSchema = toTypedSchema(
    zod.object({
        id:zod.number({message: 'Requerido'}).int().positive({message:'Un entero positivo'}),
        descripcion:zod.string().min(1,{message: 'Descripción requerida'}).max(200,{message: 'Máximo 200 caracteres'}),
        precio:zod.number({message: 'Precio requerido'}).positive({message: 'Precio debe ser positivo'}),
        cantidad_almacen:zod.number({message: 'Cantidad requerida'}).positive({message: 'Cantidad debe ser positiva'}).int({message: 'Cantidad debe ser un entero'}),
        fecha_caducidad: zod.string({message: 'Fecha de caducidad requerida'})
    }).or(
        zod.object({
            descripcion:zod.string().min(1,{message: 'Descripción requerida'}).max(200,{message: 'Máximo 200 caracteres'}),
            precio:zod.number({message: 'Precio requerido'}).positive({message: 'Precio debe ser positivo'}),
            cantidad_almacen:zod.number({message: 'Cantidad requerida'}).positive({message: 'Cantidad debe ser positiva'}).int({message: 'Cantidad debe ser un entero'}),
            fecha_caducidad: zod.string({message: 'Fecha de caducidad requerida'})
        })
    )
)