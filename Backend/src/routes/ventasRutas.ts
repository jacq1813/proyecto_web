import expres, { Request, Response } from 'express';
import * as ventasServices from '../services/ventasServices';

const router = expres.Router();

//http://localhost:3001/api/ventas
router.get('/', async (_req:Request, res:Response) => {
    let ventas = await ventasServices.obtenerVentas();
    res.send(ventas);
})

//http://localhost:3001/api/ventas/1
router.get('/:id', async (req: Request, res: Response) => {
    
    let ventas = await ventasServices.encuentraVenta(Number(req.params.id));
    res.send(ventas);
})

//busca ventas por id de cliente
//http://localhost:3001/api/ventas/1/cliente
router.get('/:id/cliente', async (req: Request, res: Response) => {
    
    let ventas = await ventasServices.ventasCliente(Number(req.params.id));
    res.send(ventas);
})

//busca ventas por id de articulo
//http://localhost:3001/api/ventas/1/articulo
router.get('/:id/articulo', async (req: Request, res: Response) => {
    
    let ventas = await ventasServices.ventasArticulo(Number(req.params.id));
    res.send(ventas);
})

// Insertar datos de ventas
//http://localhost:3001/api/ventas
router.post('/', async (req : Request, res:Response) => {
    try {
        const { id_articulo, id_cliente, cantidad, precio, fecha_venta } = req.body;
        const nueva = await ventasServices.realizaVenta({ id_articulo, id_cliente, cantidad, precio, fecha_venta });
        res.send(nueva);
    }
    catch (e) {
        res.send({ error: "No se puede realizar la venta" });
        // res.status(400).send("Error en los datos")
    }
})

export default router;