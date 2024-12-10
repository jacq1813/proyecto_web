import express from 'express';
import * as comprasServices from '../services/comprasServices';

const router = express.Router();

//http://localhost:3001/api/compras
router.get('/', async (_req, res) => {
    let compras = await comprasServices.obtenerCompras();
    res.send(compras);
})

// Insertar datos de compras
router.post('/', async (req, res) => {
    try {
        const { id_articulo, id_cliente, cantidad, precio, iva, fecha_compra } = req.body;
        const nueva = await comprasServices.realizaCompra({ id_articulo, id_cliente, cantidad, precio, iva, fecha_compra });
        res.send(nueva);
    }
    catch (e) {
        res.send({ error: "No se puede realizar la compra" });
        // res.status(400).send("Error en los datos")
    }
})

export default router;