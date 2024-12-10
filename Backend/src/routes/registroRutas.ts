import express, { Request, Response } from 'express';

import * as registroServices from '../services/registroServices';

const router = express.Router();

//http://localhost:3001/api/registro
router.get('/', async (_req: Request, res: Response) => {
    let registros = await registroServices.obtenerRegistros();
    res.send(registros);
})


// Insertar datos de registro
router.post('/', async (req: Request, res: Response) => {
    try {
        const { id_personal, fecha, hora } = req.body;
        const nuevo = await registroServices.agregaRegistro({ id_personal, fecha, hora });
        res.send(nuevo);
    }
    catch (e) {
        res.send({ error: "No se puede agregar el registro" });
    }
})

export default router;