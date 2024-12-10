import { z } from "zod";

const horaRegEx = new RegExp(
    /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
);

export const registroSchema = z.object({

    id_personal: z.number().int().positive().min(1).max(9999),
    fecha: z.string().min(10).max(10),
    hora: z.string().regex(horaRegEx, "Formato de hora incorrecto, debe ser HH:MM")
});