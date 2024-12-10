export interface Registro {
    id: number;
    id_personal: number;
    fecha: Date;
    hora: string;
}

export type RegistroNuevo = Omit<Registro, 'id'>;
