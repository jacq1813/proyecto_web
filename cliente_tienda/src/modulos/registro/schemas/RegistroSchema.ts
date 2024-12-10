import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const RegistroSchema = toTypedSchema(
  zod.object({
    id_personal: zod
      .number({ message: "La clave del empleado es obligatoria" })
      .int({ message: "Debe ser un número entero" })
      .positive({ message: "Debe ser un número positivo" }),
    fecha: zod
      .string({ message: "La fecha es obligatoria" })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Debe ser una fecha válida (YYYY-MM-DD)",
      }), // Validación de fecha
    hora: zod
      .string({ message: "La hora es obligatoria" })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Debe ser una hora válida (HH:mm)",
      }), // Formato 24 horas
    movimiento: zod
      .enum(["entrada", "salida"], { message: "El movimiento debe ser 'entrada' o 'salida'" }),
  })
);
