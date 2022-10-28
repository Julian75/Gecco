import { Estado } from "./estado";

export class TipoProceso {
    id: number = 0;
    descripcion: string = "";
    idEstado !: Estado;
}
