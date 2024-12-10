export interface Articulo {
    id: number;
    descripcion: string;
    precio: number;
    cantidad_almacen: number;
    fecha_caducidad: string;
}

export type ArticuloAgregar = Omit<Articulo, 'id'>;


