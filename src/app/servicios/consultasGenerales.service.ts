import { PresupuestoContable2 } from './../modelos/modelos2/presupuestoContable2';
import { LibroMayor2 } from './../modelos/modelos2/libroMayor2';
import { AsignacionArticulos2 } from './../modelos/modelos2/asignacionArticulos2';
import { Inventario2 } from './../modelos/modelos2/inventario2';
import { OrdenCompra2 } from './../modelos/ordenCompra2';
import { UsuariosAdministracion2 } from './../modelos/modelos2/usuariosAdministracion2';
import { Cotizacion2 } from './../modelos/cotizacion2';
import { ConsultaRaspa } from './../modelos/consultaRaspa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Historial2 } from '../modelos/modelos2/Historial2';
import { Soporte2 } from '../modelos/soporte2';
import { ArchivoSolicitud2 } from '../modelos/modelos2/archivoSolicitud2';
import { DetalleSolicitud2 } from '../modelos/detalleSolicitud2';
import { AsignarTurnoVendedor2 } from '../modelos/asignarTurnoVendedor2';
import { HistorialSolicitudes2 } from '../modelos/modelos2/historialSolicitudes2';
import { Cuentas2 } from '../modelos/modelos2/cuentas2';
import { PorcentajePresupuesto2 } from '../modelos/modelos2/porcentajePresupuesto2';
import { Raspas2 } from '../modelos/modelos2/raspas2';
import { GestionProceso2 } from '../modelos/gestionProceso2';
import { AuditoriaActivo2 } from '../modelos/modelos2/auditoriaActivo2';
import { MatrizNecesidadDetalle2 } from '../modelos/modelos2/matrizNecesidadDetalle2';
import { AsignacionProceso2 } from '../modelos/modelos2/asignacionProceso2';
import { AuditoriaActivoRegistro2 } from '../modelos/modelos2/auditoriaActivoRegistro2';

@Injectable({
  providedIn: 'root'
})
export class ConsultasGeneralesService {

  private path = this.sharedService.APIUrl+'/ConsultasGenerales';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public listarRaspaGeco(id: number){
    return this.http.get<ConsultaRaspa[]>(this.path+"/ObtenerRaspa?raspa='"+id+"'");
  }

  public listarRaspaConsultaNoGecco(){
    return this.http.get<ConsultaRaspa[]>(this.path+"/ObtenerRaspasSiga");
  }

  public listarCotizacion(idSolicitud: number){
    return this.http.get<Cotizacion2[]>(this.path+"/ObtenerCotizacion?idSolicitud="+idSolicitud);
  }

  public listarUsuariosAdministracion(idSolicitud: number){
    return this.http.get<UsuariosAdministracion2[]>(this.path+"/ObtenerUsuariosAdministracion?idSolicitud="+idSolicitud);
  }

  public listarOrdenCompra(idSolicitud: number){
    return this.http.get<OrdenCompra2[]>(this.path+"/ObtenerOrdenCompra?idSolicitud="+idSolicitud);
  }

  public listarDetalleSolicitud(idSolicitud: number){
    return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerDetalleSolicitud?idSolicitud="+idSolicitud);
  }

  //Solicitudes detalles listadas por el id y cuando el estado sea diferente de 59
  public listarDetalleSolicitud2(idSolicitud: number){
    return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerDetalleSolicitudEst?idSolicitud="+idSolicitud);
  }

  //Solicitudes detalles listadas por el id y cuando el estado este en 56 o 57
  public listarDetalleSolicitudEstados(idSolicitud: number){
    return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerDetalleSolicitudEstados?idSolicitud="+idSolicitud);
  }

  //Todos los historiales que sean de una sola solicitud
  public listarHistorialSC(idSolicitudSC: number){
    return this.http.get<Historial2[]>(this.path+"/ObtenerHistorial?idSolicitudSC="+idSolicitudSC);
  }

  //Soportes subidos por parte de los remitentes en la solicitud
  public listarSoporteSC(idHistorialSC: number){
    return this.http.get<Soporte2[]>(this.path+"/ObtenerSoporteSC?idHistorialSC="+idHistorialSC);
  }

  //Soportes subidos por parte de los remitentes en la solicitud
  public listarArchivosSC(idSolicitudSC: number){
    return this.http.get<ArchivoSolicitud2[]>(this.path+"/ObtenerArchivosSC?idSolicitudSC="+idSolicitudSC);
  }

  //Listar Asignar turnos vendedores con fecha actual
  public listarAsignarTurnosVendedores(fechaActual: String){
    return this.http.get<AsignarTurnoVendedor2[]>(this.path+"/ObtenerAsignarTurnosVendedores?fechaActual="+fechaActual);
  }

  //Listar todos los inventarios que no tienen los mismos activos que ya se dieron de baja
  public listarInventariosSinBaja(){
    return this.http.get<Inventario2[]>(this.path+"/ObtenerInventarioBaja");
  }

  //Listar Asignaciones activas que no tienen los mismos activos que ya se dieron de baja
  public listarAsignacionesActivosSinBaja(){
    return this.http.get<AsignacionArticulos2[]>(this.path+"/ObtenerAsignacionArticulos");
  }

  //Listar Cuenta
  public listarCuenta(codigo){
    return this.http.get<Cuentas2[]>(this.path+"/ObtenerCuenta?codigo="+codigo);
  }

  //Lista todos los historiales que tengan el mismo id de solicitud del parametro
  public listarHistorialesSolicitudes(idSolicitudSC){
    return this.http.get<HistorialSolicitudes2[]>(this.path+"/ObtenerHistorialesSolicitudes?idSolicitudSC="+idSolicitudSC);
  }

  //Lista todos los libros mayores de acuerdo a una fecha y cuenta
  public listarLibrosMayor(idCuenta, fecha){
    return this.http.get<LibroMayor2[]>(this.path+"/ObtenerLibroMayor?idCuenta="+idCuenta+"&fecha="+fecha);
  }

  //Lista todos los porcentaje presupuesto de acuerdo a una fecha y cuenta
  public listarPorcentajePresupuesto(idCuenta, fecha){
    return this.http.get<PorcentajePresupuesto2[]>(this.path+"/ObtenerPorcentajePresupuesto?idCuenta="+idCuenta+"&fecha="+fecha);
  }

  //Lista todos los presupuestos contables de acuerdo a una fecha y cuenta
  public listarPresupuestoContable(fecha){
    return this.http.get<PresupuestoContable2[]>(this.path+"/ObtenerPresupuestoContable?fecha="+fecha);
  }

  //Lista todos los libros mayores de acuerdo a una fecha y cuenta
  public listarLibrosMayorFechas(idCuenta, fecha){
    return this.http.get<LibroMayor2[]>(this.path+"/ObtenerLibroMayorFechas?idCuenta="+idCuenta+"&fecha="+fecha);
  }

   //Lista todos los libros mayores de acuerdo a una fecha y cuenta
   public listarLibrosMayorAñoyMes(fecha){
    return this.http.get<LibroMayor2[]>(this.path+"/ObtenerLibroMayorAñoyMes?fecha="+fecha);
  }

  //Lista todos los libros mayores de acuerdo a una fecha y cuenta
  public listarPresupuestoContableFecha(idCuenta, fecha){
    return this.http.get<PresupuestoContable2[]>(this.path+"/ObtenerPresupuestoContableCuentaFecha?idCuenta="+idCuenta+"&fecha="+fecha);
  }

  //Lista todos los libros mayores de acuerdo a una fecha y cuenta
  public listarLibrosMayorAño(fecha){
    return this.http.get<LibroMayor2[]>(this.path+"/ObtenerLibroMayorAño?fecha="+fecha);
  }

  //Lista todos los libros mayores de acuerdo a una fecha y cuenta
  public listarCuentasPorJerarquia(idJerarquiaCuenta){
    return this.http.get<Cuentas2[]>(this.path+"/ObtenerCuentaJerarquia?idJerarquiaCuenta="+idJerarquiaCuenta);
  }

  //Lista todos los raspas de gecco por rango de fecha
  public listarRaspasGecco(fechaInicio, fechaFinal){
    return this.http.get<Raspas2[]>(this.path+"/ObtenerRaspasGecco?fechaInicio="+fechaInicio+"&fechaFinal="+fechaFinal);
  }

  //Lista todos las gestion proceso del detalle de la solicitud digitado
  public listarGestionProcesoSolicitud(idDetalleSolicitud){
    return this.http.get<GestionProceso2[]>(this.path+"/ObtenerGestionProcesoSolicitud?idDetalleSolicitud="+idDetalleSolicitud);
  }

  //Lista todas las auditorias de activos de acuerdo a un id detalle solicitud y fecha con tiempo
  public listarAuditoriaActivos(idAuditoriaActivoRegistro, idAsignacionPuntoVentaActivo){
    return this.http.get<AuditoriaActivo2[]>(this.path+"/ObtenerAuditoriaActivo?idAuditoriaActivoRegistro="+idAuditoriaActivoRegistro+"&idAsignacionPuntoVentaActivo="+idAsignacionPuntoVentaActivo);
  }

  //Lista todas las auditorias de activos de registro de acuerdo a unas fechas en especifico
  public listarAuditoriaActivosRegistroFechas(fechaInicio, fechaFinal){
    return this.http.get<AuditoriaActivoRegistro2[]>(this.path+"/ObtenerAuditoriaActivoRegistroFechas?fechaInicio="+fechaInicio+"&fechaFinal="+fechaFinal);
  }

  //Lista todas las matrices de necesidad detalle que esten en la fecha digitada y el id del tipo de proceso del usuario logeado en la matariz
  public listarMatrizDetalleProceso(idTipoProceso, fecha){
    return this.http.get<MatrizNecesidadDetalle2[]>(this.path+"/ObtenerMatrizDetalleProceso?idTipoProceso="+idTipoProceso+"&fecha="+fecha);
  }

  //Lista todas las asignaciones procesos por el id del usuario
  public listarAsignacionesProceso(idUsuario){
    return this.http.get<AsignacionProceso2[]>(this.path+"/ObtenerAsignacionProceso?idUsuario="+idUsuario);
  }

  //Lista todas las auditorias de activos registro de acuerdo a un id de usuario y fecha con tiempo
  public listarAuditoriaActivosRegistro(fecha, idUsuario){
    return this.http.get<AuditoriaActivoRegistro2[]>(this.path+"/ObtenerAuditoriaActivoRegistro?fecha="+fecha+"&idUsuario="+idUsuario);
  }

  //Lista todas las auditorias de activos de acuerdo a un id auditoria activo registro
  public listarAuditoriaActivosConIdRegistro(idAuditoriaActivoRegistro){
    return this.http.get<AuditoriaActivo2[]>(this.path+"/ObtenerAuditoriaActivoIdRegistro?idAuditoriaActivoRegistro="+idAuditoriaActivoRegistro);
  }

  // public listarGestionProceso(idUsuario: number){
  //   return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerGestionProceso?idUsuario="+idUsuario);
  // }

  // public listarProcesoCategoria(idCategoria: number){
  //   return this.http.get<DetalleSolicitud2[]>(this.path+"/ObtenerGestionProceso?idCategoria="+idCategoria);
  // }

}
