import {Usuario} from './usuario';
import {MotivoAutorizacionPago} from './motivoAutorizacionPago';
import {DatosFormularioPago} from './datosFormularioPago';
import * as moment from 'moment';
export class SolicitudAutorizacionPago{
    public id: number = 0;
    public fecha=new Date(new Date().getTime()).toISOString();
    public idOficina: number = 0;
    public nombreOficiona: string = '';
    idUsuario !: Usuario;
    idMotivoAutorizacionPago !: MotivoAutorizacionPago;
    idDatosFormularioPago !: DatosFormularioPago;
}
