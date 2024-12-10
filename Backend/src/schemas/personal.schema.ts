import { z } from "zod";

const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

/*const nombreRegEx = new RegExp(
    /^(A-Z|a-z{2,200})+$/
);*/


// validaciones con zod
export const personalSchema = z.object({

    nombre: z.string().min(2, "Minimo 2 caracteres").max(200, "Maximo 200 caracteres"),
    direccion: z.string().min(2).max(300),
    telefono: z.string().regex(telefonoRegEx),
    estatus: z.number().int().positive().min(1).max(2, "Los valores permitidos son 1 o 2")
    
}).refine(data => data.nombre == "TEC DE CULIACAN", {
    message: "La dirección debe ser TEC DE CULIACAN",
    path: ["direccion"]
}).refine(data => data.estatus <= 2, {
    message: "El estatus debe ser 1(vigente) o 2(baja)",
    path: ["estatus"]
}).or(
    z.object({
        telefono: z.string().min(10).max(15)
    })
).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
);