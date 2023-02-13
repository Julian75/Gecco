import { TipoDocumento } from './tipoDocumento';
export class ClienteAutorizacionPago{
    public id: number = 0;
    public nombre: string = '';
    public cedula: string = '';
    public direccion: string = '';
    public telefono: string = '';
    idTipoDocumento !: TipoDocumento;
}
