import { Estado } from "./estado";

export class TipoActivo {
    public id: number = 0;
    public descripcion: string = '';
    idEstado !: Estado;
}
