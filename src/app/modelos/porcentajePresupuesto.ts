import { Cuentas } from "./cuentas";

export class PorcentajePresupuesto {
    public id: number=0;
    public fecha : Date = new Date();
    idCuenta !: Cuentas;
    public porcentaje: number=0;
}
