import {ClienteAutorizacionPago} from './clienteAutorizacionPago';
export class DatosFormularioPago{
    public id: number = 0;
    public fechaSorteo: Date = new Date();
    public seriePreImpresa: string = '';
    public serieImpresa: string = '';
    public colillaImpresa: string = '';
    public serieCodigoVenta: number = 0;
    public nombreSorteoLoteria: string = '';
    public totalFormulario: number = 0;
    public totalGanadoBruto: number = 0;
    public cedulaColocador: string = '';
    idClientesAutorizacionPago !: ClienteAutorizacionPago;
}
