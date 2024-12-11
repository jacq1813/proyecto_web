import { z } from "zod";

export const ventaSchema = z.object({
    id_articulo: z.number().int().positive().min(1).max(9999),
    id_cliente: z.number().int().positive().min(1).max(9999),
    cantidad: z.number().int().positive().min(1),
    precio: z.number().positive().min(1),
    fecha_venta: z.string().min(10).max(20)
}).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
);