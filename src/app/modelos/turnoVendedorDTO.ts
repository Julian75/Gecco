export class TurnoVendedorDTO {
  public id: number=0;
  public fecha_inicio: Date = new Date();
  public fecha_final: Date = new Date();
  public id_oficina: number=0;
  public ide_subzona: number=0;
  public nombre_oficina: string="";
  public id_sitio_venta: number=0;
  public nombre_sitio_venta: string="";
  public id_vendedor: number=0;
  public nombre_vendedor: string="";
  public estado: string="";
  public id_turno: number=0;
}
