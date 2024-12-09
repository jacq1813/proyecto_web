import express, { Request, Response } from 'express';
import * as clientesServices from '../services/clientesServices';

const router = express.Router();

//http://localhost:3001/api/clientes
router.get('/', async (_req: Request, res: Response) => {
    let clientes = await clientesServices.obtenerClientes();
    res.send(clientes);
})

// Insertar datos de clientes
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, direccion, telefono, correo_electronico, ciudad} = req.body;
        const nuevo = await clientesServices.agregaCliente({ nombre, direccion, telefono, correo_electronico, ciudad });
        res.send(nuevo);
    }
    catch (e) {
        res.send({ error: "No se puede agregar el cliente" });
        // res.status(400).send("Error en los datos")
    }
})

// Modificar datos
router.put('/', async (req: Request, res: Response) => {
    try {

        const { nombre, direccion, telefono, correo_electronico, ciudad } = req.body;
        const modificado = await clientesServices.modificarCliente({ nombre, direccion, telefono, correo_electronico, ciudad });
        res.send(modificado);

    } catch (e) {
        res.status(400).send("Error en los datos")
    }
})

// Eliminar datos
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await clientesServices.eliminarCliente(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.send({ error: "No se puede eliminar el cliente" });
    }
})
