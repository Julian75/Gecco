export class SolicitudAutorizacionPago2{
    public id: number=0;
    public fecha = new Date(new Date().getTime()).toISOString();
    public idOficina: number=0;
    public nombreOficiona: string="";
    public idUsuario: number=0;
    public idMotivoAutorizacionPago: number=0;
    public idDatosFormularioPago: number=0;
}
