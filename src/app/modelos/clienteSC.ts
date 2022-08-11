import { TipoDocumento } from "./tipoDocumento";
export class ClienteSC{
    public id: number=0;
    public nombre: string="";
    public apellido: string="";
    idTipoDocumento !: TipoDocumento;
    public documento: number=0;
    public correo: string="";
    public telefono: number=0;
}
