export interface Compra {
    id: number;
    id_articulo: number;
    cantidad: number;
    precio: number;
    iva: number;
    subtotal: number;
    total: number;
    fecha_compra: string;
}
//que omita el id, el subtotal, total
export interface CompraAgregar {
    id_articulo: number;
    cantidad: number;
    precio: number;
    iva: number;
    fecha_compra: string;
}