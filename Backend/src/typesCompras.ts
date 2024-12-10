export interface Compra {
    id: number;
    id_articulo: number;
    id_cliente: number;
    cantidad: number;
    precio: number;
    iva: number;
    subtotal: number;
    total: number;
    fecha_compra: string;
}
// OMITIR el campo 'id' de Compra, subtotal y total se calculan en base a cantidad y precio
export interface CompraNueva {
    id_articulo: number;
    id_cliente: number;
    cantidad: number;
    precio: number;
    iva: number;
    fecha_compra: string;
}
