import { Cuentas } from 'src/app/modelos/cuentas';
export class PresupuestoContable {
    public id: number=0;
    public fecha : Date = new Date();
    public presupuesto: number=0;
    idCuenta!: Cuentas;
}
