export interface Articulo {
    id: number;
    descripcion: string;
    precio: number;
    cantidad_almacen: number;
    fecha_caducidad: Date;
}

export type ArticuloNuevo = Omit<Articulo, 'id'>