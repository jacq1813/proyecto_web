import express, { Request, Response } from 'express';
import * as articulosServices from '../services/articulosServices';

const router = express.Router();

//http://localhost:3001/api/articulos
router.get('/', async (_req: Request, res: Response) => {
    let articulos = await articulosServices.obtenerArticulos();
    res.send(articulos);
})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    let articulo = await articulosServices.encuentraArticulo(Number(id));
    res.send(articulo);
})

// Insertar datos de articulos
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descripcion, precio, cantidad_almacen, fecha_caducidad } = req.body;
        const nuevo = await articulosServices.agregaArticulo({ descripcion, precio, cantidad_almacen, fecha_caducidad });
        res.send(nuevo);
    }
    catch (e) {
        res.send({ error: "No se puede agregar el articulo" });
        // res.status(400).send("Error en los datos")
    }
})

// Modificar datos
router.put('/', async (req: Request, res: Response) => {
    try {

        const { descripcion, precio, cantidad_almacen, fecha_caducidad } = req.body;
        const modificado = await articulosServices.modificarArticulo({ descripcion, precio, cantidad_almacen, fecha_caducidad });
        res.send(modificado);

    } catch (e) {
        res.status(400).send("Error en los datos")
    }
})

// Eliminar datos
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await articulosServices.eliminarArticulo(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.send({ error: "No se puede eliminar el articulo" });
    }
})

export default router;