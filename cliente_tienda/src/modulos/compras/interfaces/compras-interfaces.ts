export interface Compra {
    id: number;
    id_articulo: number;
    cantidad: number;
    precio: number;
    iva: number;
    subtotal: number;
    total: number;
    fecha: string;
}

export type CompraAgregar = Omit<Compra, 'id'>;