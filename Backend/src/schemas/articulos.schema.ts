import { z } from "zod";

export const articulosSchema = z.object({
    id: z.number().int().positive(),
    descripcion: z.string().min(2, "Minimo 2 caracteres").max(300, "Maximo 300 caracteres"),
    precio: z.number().positive().min(1),
    cantidad_almacen: z.number().int().positive(),

    });