import { z } from "zod";

export const articulosSchema = z.object({

    descripcion: z.string().min(2, "Minimo 2 caracteres").max(300, "Maximo 300 caracteres"),
    precio: z.number().positive().min(1),
    cantidad_almacen: z.number().int().positive(),
    fecha_caducidad: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (debe ser YYYY-MM-DD)")
        .refine(date => {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime()); // Verifica si la fecha es válida
        }, { message: "La fecha no es válida" })
        .refine(date => {
            const today = new Date();
            const inputDate = new Date(date);
            return inputDate > today; // Verifica que la fecha sea futura
        }, { message: "La fecha debe ser futura" })

    });