import { PresupuestoContable2 } from 'src/app/modelos/modelos2/presupuestoContable2';
import { PeriodoEjecucion2 } from './../modelos/modelos2/periodoEjecucion2';
import { MovimientoComprasInventario2 } from './../modelos/modelos2/movimientosComprasInventario2';
import { Area2 } from './../modelos/modelos2/area2';
import { SolicitudSC2 } from './../modelos/modelos2/solicitudSC2';
import { Historial2 } from './../modelos/modelos2/Historial2';
import { AsignarTurno2 } from './../modelos/asignarTurno2';
import { EliminacionTurnoVendedor2 } from './../modelos/eliminacionTurnoVendedor2';
import { AsignarTurnoVendedor2 } from './../modelos/asignarTurnoVendedor2';
import { Usuario2 } from './../modelos/usuario2';
import { Articulo2 } from './../modelos/articulo2';
import { Categoria2 } from './../modelos/categoria2';
import { Proveedor2 } from './../modelos/proveedor2';
import { OrdenCompra2 } from './../modelos/ordenCompra2';
import { Proceso2 } from './../modelos/proceso2';
import { GestionProceso2 } from './../modelos/gestionProceso2';
import { Cotizacion2 } from './../modelos/cotizacion2';
import { CotizacionPdf2 } from './../modelos/cotizacionPdf2';
import { DetalleSolicitud2 } from './../modelos/detalleSolicitud2';
import { Solicitud2 } from './../modelos/solicitud2';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
import { TipoDocumento2 } from '../modelos/modelos2/tipoDocumento2';
import { Rol2 } from '../modelos/modelos2/rol2';
import { Modulo2 } from '../modelos/modelos2/modulo2';
import { Jerarquia2 } from '../modelos/modelos2/jerarquia2';
import { Configuracion2 } from '../modelos/modelos2/configuracion2';
import { TipoTurno2 } from '../modelos/modelos2/tipoTurno2';
import { TipoNovedades2 } from '../modelos/modelos2/tipoNovedades2';
import { Turnos2 } from '../modelos/modelos2/turnos2';
import { ElementosVisita2 } from '../modelos/modelos2/elementosVisita2';
import { OpcionesVisita2 } from '../modelos/modelos2/opcionesVisita2';
import {TipoServicio2} from '../modelos/modelos2/tipoServicio2';
import { EscalaSolicitudes2 } from '../modelos/modelos2/escalaSolicitudes2';
import { MotivoSolicitud2 } from '../modelos/modelos2/motivoSolicitud2';
import { ClienteSC2 } from '../modelos/modelos2/clienteSC2';
import { AsignacionUsuariosPqrs2 } from '../modelos/modelos2/asignacionUsuariosPQRS2';
import{ Sedes2 } from '../modelos/modelos2/sedes2';
import {IngresoPersonalEmpresa2} from '../modelos/modelos2/ingresoPersonalEmpresa2';
import { TipoActivo2 } from '../modelos/modelos2/tipoActivo2';
import { TipoProceso2 } from '../modelos/modelos2/tipoProceso2';
import { DetalleArticulo2 } from '../modelos/modelos2/detalleArticulo2';
import { HistorialArticulos2 } from '../modelos/modelos2/historialArticulo';
import { AsignacionProceso2 } from '../modelos/modelos2/asignacionProceso2';
import {AsignacionArticulos2} from '../modelos/modelos2/asignacionArticulos2';
import { AsignacionPuntoVenta2 } from '../modelos/modelos2/asignacionPuntoVenta2';
import { SolicitudBajasArticulos2} from '../modelos/modelos2/solicitudBajasArticulos2';
import { Compras } from '../modelos/compras';
import { Compras2 } from '../modelos/modelos2/compras2';
import { OpcionArticuloBaja2 } from '../modelos/modelos2/opcionArticuloBaja2';
import { SubProceso2 } from '../modelos/modelos2/subProceso2';
import { TipoNecesidad2 } from '../modelos/modelos2/tipoNecesidad2';
import { MatrizNecesidad2 } from '../modelos/modelos2/matrizNecesidad2';
import { MatrizNecesidadDetalle2 } from '../modelos/modelos2/matrizNecesidadDetalle2';
import { ArticulosBaja2 } from '../modelos/modelos2/articulosBaja2';
import { MediosRadiacion2 } from '../modelos/modelos2/mediosRadiacion2';
import { JerarquiaCuentas2 } from '../modelos/modelos2/jerarquiaCuentas2';
import { Cuentas2 } from '../modelos/modelos2/cuentas2';
import { LibroMayor2 } from '../modelos/modelos2/libroMayor2';
import { MotivoAutorizacionPago2 } from '../modelos/modelos2/motivoAutorizacionPago2';
import { ClienteAutorizacionPago2 } from '../modelos/modelos2/clienteAutorizacionPago2';
import { DatosFormularioPago2 } from '../modelos/modelos2/datosFormularioPago2';
import { SolicitudAutorizacionPago2 } from '../modelos/modelos2/solicitudAutorizacionPago2';
@Injectable({
  providedIn: 'root'
})
export class ModificarService {

  private path = this.sharedService.APIUrl+'/Modificar';

  constructor(private http:HttpClient,
    private sharedService:SharedService
     )
   { }

  public actualizarAsignarTurnoVendedor(asignarTurnoVendedor: AsignarTurnoVendedor2){
    return this.http.put<void>(this.path+'/AsignarTurnoVendedor/'+ asignarTurnoVendedor.id, asignarTurnoVendedor);
  }

  public actualizarEliminacion(eliminacion: EliminacionTurnoVendedor2){
    return this.http.put<void>(this.path+'/Eliminacion/'+ eliminacion.id, eliminacion);
  }

  public actualizarUsuario(usuario: Usuario2){
    return this.http.put<void>(this.path+'/Usuario/'+ usuario.id, usuario);
  }

  public actualizarArticulos(articulos: Articulo2){
    return this.http.put<void>(this.path+'/Articulos/'+ articulos.id, articulos);
  }

  public actualizarCategoria(categoria: Categoria2){
    return this.http.put<void>(this.path+'/Categoria/'+ categoria.id, categoria);
  }

  public actualizarCotizacion(cotizacion: Cotizacion2){
    return this.http.put<void>(this.path+'/Cotizacion/'+ cotizacion.id, cotizacion);
  }

  public actualizarCotizacionPdf(cotizacionPdf: CotizacionPdf2){
    return this.http.put<void>(this.path+'/CotizacionPdf/'+ cotizacionPdf.id, cotizacionPdf);
  }

  public actualizarDetalleSolicitud(detalleSolicitud: DetalleSolicitud2){
    return this.http.put<void>(this.path+'/DetalleSolicitud/'+ detalleSolicitud.id, detalleSolicitud);
  }

  public actualizarSolicitud(solicitud: Solicitud2){
    return this.http.put<void>(this.path+'/Solicitud/'+ solicitud.id, solicitud);
  }

  public actualizarProveedor(proveedor: Proveedor2){
    return this.http.put<void>(this.path+'/Proveedor/'+ proveedor.id, proveedor);
  }

  public actualizarGestionProceso(gestionproceso: GestionProceso2){
    return this.http.put<void>(this.path+'/GestionProceso/'+ gestionproceso.id, gestionproceso);
  }

  public actualizarOrdenCompra(ordencompra: OrdenCompra2){
    return this.http.put<void>(this.path+'/OrdenCompra/'+ ordencompra.id, ordencompra);
  }

  public actualizarProceso(proceso: Proceso2){
    return this.http.put<void>(this.path+'/Proceso/'+ proceso.id, proceso);
  }

  public actualizarAsignarTurnoPuntoVenta(asignarTurnoPuntoVenta: AsignarTurno2){
    return this.http.put<void>(this.path+'/AsignarTurnoPuntoVenta/'+ asignarTurnoPuntoVenta.id, asignarTurnoPuntoVenta);
  }

  public actualizarHistorialSC(historialSC: Historial2){
    return this.http.put<void>(this.path+'/HistorialSC/'+ historialSC.id, historialSC);
  }

  public actualizarSolicitudSC(solicitudSC: SolicitudSC2){
    return this.http.put<void>(this.path+'/SolicitudSC/'+ solicitudSC.id, solicitudSC);
  }

  public actualizarTipoDocumento(tipoDocumento: TipoDocumento2){
    return this.http.put<void>(this.path+'/TipoDocumento/'+ tipoDocumento.id, tipoDocumento);
  }

  public actualizarRol(rol: Rol2){
    return this.http.put<void>(this.path+'/Rol/'+ rol.id, rol);
  }

  public actualizarModulo(modulo: Modulo2){
    return this.http.put<void>(this.path+'/Modulo/'+ modulo.id, modulo);
  }

  public actualizarJerarquia(jerarquia: Jerarquia2){
    return this.http.put<void>(this.path+'/Jerarquia/'+ jerarquia.id, jerarquia);
  }

  public actualizarConfiguracion(configuracion: Configuracion2){
    return this.http.put<void>(this.path+'/Configuracion/'+ configuracion.id, configuracion);
  }

  public actualizarTipoTurno(tipoTurno: TipoTurno2){
    return this.http.put<void>(this.path+'/TipoTurno/'+ tipoTurno.id, tipoTurno);
  }

  public actualizarTipoNovedades(tipoNovedades: TipoNovedades2){
    return this.http.put<void>(this.path+'/TipoNovedades/'+ tipoNovedades.id, tipoNovedades);
  }

  public actualizarTurnos(turnos: Turnos2){
    return this.http.put<void>(this.path+'/Turnos/'+ turnos.id, turnos);
  }

  public actualizarElementosVisita(elementosVisita: ElementosVisita2){
    return this.http.put<void>(this.path+'/ElementosVisita/'+ elementosVisita.id, elementosVisita);
  }

  public actualizarOpcionesVisita(opcionesVisita: OpcionesVisita2){
    return this.http.put<void>(this.path+'/OpcionesVisita/'+ opcionesVisita.id, opcionesVisita);
  }

  public actualizarTipoServicio(tipoServicio: TipoServicio2){
    return this.http.put<void>(this.path+'/TipoServicio/'+ tipoServicio.id, tipoServicio);
  }

  public actualizarEscalaSolicitudes(escalaSolicitudes: EscalaSolicitudes2){
    return this.http.put<void>(this.path+'/EscalaSolicitud/'+ escalaSolicitudes.id, escalaSolicitudes);
  }

  public actualizarMotivoSolicitud(motivoSolicitud: MotivoSolicitud2){
    return this.http.put<void>(this.path+'/MotivoSolicitud/'+ motivoSolicitud.id, motivoSolicitud);
  }

  public actualizarClienteSC(clienteSC: ClienteSC2){
    return this.http.put<void>(this.path+'/ClienteSC/'+ clienteSC.id, clienteSC);
  }

  public actualizarAsignacionUsuariosPQRS(asignacionUsuariosPQRS: AsignacionUsuariosPqrs2){
    return this.http.put<void>(this.path+'/AsignacionUsuariosPQRS/'+ asignacionUsuariosPQRS.id, asignacionUsuariosPQRS);
  }

  public actualizarArea(area: Area2){
    return this.http.put<void>(this.path+'/Area/'+ area.id, area);
  }

  public actualizarSede(sede: Sedes2){
    return this.http.put<void>(this.path+'/Sede/'+ sede.id, sede);
  }

  public actualizarIngresoPersonalEmpresa(ingresoPersonalEmpresa: IngresoPersonalEmpresa2){
    return this.http.put<void>(this.path+'/IngresoPersonalEmpresa/'+ ingresoPersonalEmpresa.id, ingresoPersonalEmpresa);
  }

  public actualizarTipoActivo(tipoActivo: TipoActivo2){
    return this.http.put<void>(this.path+'/TipoActivo/'+ tipoActivo.id, tipoActivo);
  }

  public actualizarTipoProceso(tipoProceso: TipoProceso2){
    return this.http.put<void>(this.path+'/TiposProcesos/'+ tipoProceso.id, tipoProceso);
  }

  public actualizarDetalleArticulo(detalleArticulo: DetalleArticulo2){
    return this.http.put<void>(this.path+'/DetalleArticulo/'+ detalleArticulo.id, detalleArticulo);
  }

  public actualizarHistorialArticulos(historialArticulos: HistorialArticulos2){
    return this.http.put<void>(this.path+'/HistorialArticulo/'+ historialArticulos.id, historialArticulos);
  }

  public actualizarAsignacionProceso(asignacionProceso: AsignacionProceso2){
    return this.http.put<void>(this.path+'/AsignacionesProcesos/'+ asignacionProceso.id, asignacionProceso);
  }

  public actualizarAsignacionArticulos(asignacionArticulos: AsignacionArticulos2){
    return this.http.put<void>(this.path+'/AsignacionesArticulos/'+ asignacionArticulos.id, asignacionArticulos);
  }

  public actualizarAsignacionPuntoVenta(asignacionPuntoVenta: AsignacionPuntoVenta2){
    return this.http.put<void>(this.path+'/AsignacionPuntoVentaArticulo/'+ asignacionPuntoVenta.id, asignacionPuntoVenta);
  }

  public actualizarActivoBaja(bajaActivo: ArticulosBaja2){
    return this.http.put<void>(this.path+'/ActivoBaja/'+ bajaActivo.id, bajaActivo);
  }

  public actualizarSolicitudBajaArticulo(solicitudBajasArticulos: SolicitudBajasArticulos2){
    return this.http.put<void>(this.path+'/SolicitudBajasArticulos/'+ solicitudBajasArticulos.id, solicitudBajasArticulos);
  }

  public actualizarCompras(compra: Compras2){
    return this.http.put<void>(this.path+'/Compras/'+ compra.id, compra);
  }

  public actualizarMovimientoCI(movimientoComprasInventario: MovimientoComprasInventario2){
    return this.http.put<void>(this.path+'/MovimientoComprasInventario/'+ movimientoComprasInventario.id, movimientoComprasInventario);
  }

  public actualizarOpcionArticuloBaja(opcionArticuloBaja: OpcionArticuloBaja2){
    return this.http.put<void>(this.path+'/OpcionArticuloBaja/'+ opcionArticuloBaja.id, opcionArticuloBaja);
  }

  public actualizarSubProceso(subproceso: SubProceso2){
    return this.http.put<void>(this.path+'/SubProceso/'+ subproceso.id, subproceso);
  }

  public actualizarTipoNecesidad(tipoNecesidad: TipoNecesidad2){
    return this.http.put<void>(this.path+'/TipoNecesidad/'+ tipoNecesidad.id, tipoNecesidad);
  }

  public actualizarMatrizNecesidad(matrizNecesidad: MatrizNecesidad2){
    return this.http.put<void>(this.path+'/MatrizNecesidad/'+ matrizNecesidad.id, matrizNecesidad);
  }

  public actualizarMatrizNecesidadDetalle(matrizNecesidadDetalle: MatrizNecesidadDetalle2){
    return this.http.put<void>(this.path+'/MatrizNecesidadDetalle/'+ matrizNecesidadDetalle.id, matrizNecesidadDetalle);
  }

  public actualizarMediosRadiacion(mediosRadiacion: MediosRadiacion2){
    return this.http.put<void>(this.path+'/MediosRadiacion/'+ mediosRadiacion.id, mediosRadiacion);
  }

  public actualizarPeriodoEjecucion(periodoEjecucion: PeriodoEjecucion2){
    return this.http.put<void>(this.path+'/PeriodoEjecucion/'+ periodoEjecucion.id, periodoEjecucion);
  }

  //Modulo Presupuesto Contabilidad
  public actualizarJerarquiaCuentas(jerarquiaCuentas: JerarquiaCuentas2){
    return this.http.put<void>(this.path+'/JerarquiaCuentas/'+ jerarquiaCuentas.id, jerarquiaCuentas);
  }

  public actualizarCuentas(cuentas: Cuentas2){
    return this.http.put<void>(this.path+'/Cuenta/'+ cuentas.id, cuentas);
  }

  public actualizarLibroMayor(libroMayor: LibroMayor2){
    return this.http.put<void>(this.path+'/LibroMayor/'+ libroMayor.id, libroMayor);
  }

  public actualizarPresupuestoContable(presupuestoContable: PresupuestoContable2){
    return this.http.put<void>(this.path+'/PresupuestoContable/'+ presupuestoContable.id, presupuestoContable);
  }

  public actualizarMotivoAutorizacionPago(motivoAutorizacionPago: MotivoAutorizacionPago2){
    return this.http.put<void>(this.path+'/MotivoAutorizacionPago/'+ motivoAutorizacionPago.id, motivoAutorizacionPago);
  }

  public actualizarClienteAutorizacionPago(clienteAutorizacionPago: ClienteAutorizacionPago2){
    return this.http.put<void>(this.path+'/ClienteAutorizacionPago/'+ clienteAutorizacionPago.id, clienteAutorizacionPago);
  }

  public actualizarDatosFormularioPago(datosFormularioPago: DatosFormularioPago2){
    return this.http.put<void>(this.path+'/DatosFormularioPago/'+ datosFormularioPago.id, datosFormularioPago);
  }

  public actualizarSolicitudAutorizacionPago(solicitudAutorizacionPago: SolicitudAutorizacionPago2){
    return this.http.put<void>(this.path+'/SolicitudAutorizacionPago/'+ solicitudAutorizacionPago.id, solicitudAutorizacionPago);
  }
}
