import { z } from "zod";

export const compraSchema = z.object({
    id_articulo: z.number().int("hola").positive().min(1).max(9999),
    cantidad: z.number().int().positive().min(1),
    precio: z.number().positive().min(1),
    iva: z.number().positive().min(0).max(1),
    subtotal: z.number().positive().min(1),
    total: z.number().positive().min(1),
    fecha_compra: z.string().min(10, "Minimo 10 caracteres").max(20, "Maximo 10 caracteres")
}).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
);
