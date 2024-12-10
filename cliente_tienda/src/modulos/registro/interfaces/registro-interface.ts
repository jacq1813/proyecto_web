export interface Registro {
    id: number;
    id_personal: number;
    fecha: string;
    hora: string;
    movimiento: string;
}

export type RegistroNuevo = Omit<Registro, 'id'> & { movimiento: 'entrada' | 'salida' };
