import express,{Request,Response} from 'express';
import * as comprasServices from '../services/comprasServices';

const router = express.Router();

//http://localhost:3001/api/compras
router.get('/', async (_req:Request, res:Response) => {
    let compras = await comprasServices.obtenerCompras();
    res.send(compras);
})

//http://localhost:3001/api/compras/1
router.get('/:id', async (req: Request, res: Response) => {
    
    let compras = await comprasServices.encuentraCompra(Number(req.params.id));
    res.send(compras);
})

// Insertar datos de compras
//http://localhost:3001/api/compras
router.post('/', async (req : Request, res:Response) => {
    try {
        const { id_articulo, cantidad, precio, iva, fecha_compra } = req.body;
        const nueva = await comprasServices.realizaCompra({ id_articulo, cantidad, precio, iva, fecha_compra });
        res.send(nueva);
    }
    catch (e) {
        res.send({ error: "No se puede realizar la compra" });
        // res.status(400).send("Error en los datos")
    }
})

export default router;