import { z } from "zod";

export const articulosSchema = z.object({
  
    descripcion: z.string().min(2, "Minimo 2 caracteres").max(300, "Maximo 300 caracteres"),
    precio: z.number().positive().min(1),
    cantidad_almacen: z.number().int().positive(),

    }).or(
        z.object({
            id: z.number().int().positive().min(1).max(9999)
        })
    );