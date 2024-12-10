export interface Venta {
    id: number;
    id_articulo: number;
    id_cliente: number;
    cantidad: number;
    precio: number;
    iva: number;
    subtotal: number;
    total: number;
    fecha_venta: string;
}

export interface VentaAgregar {
    id_articulo: number;
    id_cliente: number;
    cantidad: number;
    precio: number;
    iva: number;
    fecha_venta: string;
}