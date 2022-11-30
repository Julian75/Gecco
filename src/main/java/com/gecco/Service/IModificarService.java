package com.gecco.Service;

import com.gecco.EntityModifica.Area2;
import com.gecco.EntityModifica.Articulos2;
import com.gecco.EntityModifica.ArticulosBaja2;
import com.gecco.EntityModifica.AsignacionPuntoVentaArticulo2;
import com.gecco.EntityModifica.AsignacionUsuarioPQRS2;
import com.gecco.EntityModifica.AsignacionesArticulos2;
import com.gecco.EntityModifica.AsignacionesProcesos2;
import com.gecco.EntityModifica.AsignarTurno2;
import com.gecco.EntityModifica.AsignarTurnoVendedor2;
import com.gecco.EntityModifica.Categoria2;
import com.gecco.EntityModifica.ClienteAutorizacionPago2;
import com.gecco.EntityModifica.ClienteSC2;
import com.gecco.EntityModifica.Compras2;
import com.gecco.EntityModifica.Configuracion2;
import com.gecco.EntityModifica.Cotizacion2;
import com.gecco.EntityModifica.CotizacionPdf2;
import com.gecco.EntityModifica.Cuenta2;
import com.gecco.EntityModifica.DatosFormularioPago2;
import com.gecco.EntityModifica.DetalleArticulo2;
import com.gecco.EntityModifica.DetalleSolicitud2;
import com.gecco.EntityModifica.ElementosVisita2;
import com.gecco.EntityModifica.EliminacionTurnVen2;
import com.gecco.EntityModifica.EscalaSolicitudes2;
import com.gecco.EntityModifica.GestionProceso2;
import com.gecco.EntityModifica.Historial2;
import com.gecco.EntityModifica.HistorialArticulo2;
import com.gecco.EntityModifica.IngresoPersonalEmpresa2;
import com.gecco.EntityModifica.Inventario2;
import com.gecco.EntityModifica.Jerarquia2;
import com.gecco.EntityModifica.JerarquiaCuentas2;
import com.gecco.EntityModifica.LibroMayor2;
import com.gecco.EntityModifica.MatrizNecesidad2;
import com.gecco.EntityModifica.MatrizNecesidadDetalle2;
import com.gecco.EntityModifica.MediosRadiacion2;
import com.gecco.EntityModifica.Modulo2;
import com.gecco.EntityModifica.MotivoAutorizacionPago2;
import com.gecco.EntityModifica.MotivoSolicitud2;
import com.gecco.EntityModifica.MovimientoComprasInventario2;
import com.gecco.EntityModifica.OpcionArticuloBaja2;
import com.gecco.EntityModifica.OpcionesVisita2;
import com.gecco.EntityModifica.OrdenCompra2;
import com.gecco.EntityModifica.PeriodoEjecucion2;
import com.gecco.EntityModifica.PorcentajePresupuesto2;
import com.gecco.EntityModifica.PresupuestoContable2;
import com.gecco.EntityModifica.Proceso2;
import com.gecco.EntityModifica.Proveedor2;
import com.gecco.EntityModifica.Rol2;
import com.gecco.EntityModifica.Sede2;
import com.gecco.EntityModifica.Solicitud2;
import com.gecco.EntityModifica.SolicitudAutorizacionPago2;
import com.gecco.EntityModifica.SolicitudBajasArticulos2;
import com.gecco.EntityModifica.SolicitudSC2;
import com.gecco.EntityModifica.SubProceso2;
import com.gecco.EntityModifica.TipoActivo2;
import com.gecco.EntityModifica.TipoDocumento2;
import com.gecco.EntityModifica.TipoNecesidad2;
import com.gecco.EntityModifica.TipoNovedades2;
import com.gecco.EntityModifica.TipoServicio2;
import com.gecco.EntityModifica.TipoTurno2;
import com.gecco.EntityModifica.TiposProcesos2;
import com.gecco.EntityModifica.Turnos2;
import com.gecco.EntityModifica.Usuario2;

public interface IModificarService {

//	Asignar Turno Vendedor
	int modificarAsignarTurnoVendedor(AsignarTurnoVendedor2 turnoVendedor);
	AsignarTurnoVendedor2 findByIdVendedor(Long id);
	
//	Eliminacion Asignar Turno Vendedor
	int modificarEliminacion(EliminacionTurnVen2 eliminacion);
	EliminacionTurnVen2 findByIdEliminacion(Long id);
	
//	Usuarios
	int modificarUsuario(Usuario2 usuario);
	Usuario2 findByIdUsuario(Long id);
	
//	Articulos
	int modificarArticulos(Articulos2 articulos);
	Articulos2 findByIdArticulos(Long id);
	
//	Categorias
	int modificarCategorias(Categoria2 categoria);
	Categoria2 findByIdCategorias(Long id);
	
//	Cotizacion
	int modificarCotizacion(Cotizacion2 cotizacion);
	Cotizacion2 findByIdCotizacion(Long id);
	
//	CotizacionPdf
	int modificarCotizacionPdf(CotizacionPdf2 cotizacionPdf);
	CotizacionPdf2 findByIdCotizacionPdf(Long id);
	
//	DetalleSolicitud
	int modificarDetalleSolicitud(DetalleSolicitud2 detalle);
	DetalleSolicitud2 findByIdDetalleSolicitud(Long id);
	
//	Solicitud
	int modificarSolicitud(Solicitud2 solicitud);
	Solicitud2 findByIdSolicitud(Long id);
	
//	Proveedor
	int modificarProveedor(Proveedor2 proveedor);
	Proveedor2 findByIdProveedor(Long id);
	
//	Gestion Proceso
	int modificarGestionProceso(GestionProceso2 gestionProceso);
	GestionProceso2 findByIdGestionProceso(Long id);
	
//	Orden Compra
	int modificarOrdenCompra(OrdenCompra2 ordenCompra);
	OrdenCompra2 findByIdOrdenCompra(Long id);
	
//	Proceso
	int modificarProceso(Proceso2 proceso);
	Proceso2 findByIdProceso(Long id);
	
//	AsignarTurno
	int modificarAsignarTurno(AsignarTurno2 idAsignarTurno);
	AsignarTurno2 findByIdAsignarTurno(Long idAsignarTurno);
	
//	Historial
	int modificarHistorialSC(Historial2 idHistorial);
	Historial2 findByIdHistorialSC(Long idHistorial);
	
//	Solicitud SC
	int modificarSolicitudSC(SolicitudSC2 idSolicitudSC);
	SolicitudSC2 findByIdSolicitudSC(Long idSolicitudSC);

//Tipo Documento
	int modificarTipoDocumento(TipoDocumento2 idTipoDocumento);
	TipoDocumento2 findByIdTipoDocumento(Long idTipoDocumento);
	
//  Rol
	int modificarRol(Rol2 idRol);
	Rol2 findByIdRol(Long idRol);
	
//  Modulo
	int modificarModulo(Modulo2 idModulo);
	Modulo2 findByIdModulo(Long idModulo);
	
//  Jerarquia
	int modificarJerarquia(Jerarquia2 idJerarquia);
	Jerarquia2 findByIdJerarquia(Long idJerarquia);
	
//  Configuracion
	int modificarConfiguracion(Configuracion2 idConfiguracion);
	Configuracion2 findByIdConfiguracion(Long idConfiguracion);
	
//  Tipo Turno
	int modificarTipoTurno(TipoTurno2 idTipoTurno);
	TipoTurno2 findByIdTipoTurno(Long idTipoTurno);
	
//  Tipo Novedades
	int modificarTipoNovedad(TipoNovedades2 idTipoNovedades);
	TipoNovedades2 findByIdTipoNovedad(Long idTipoNovedades);
	
//  Turnos
	int modificarTurnos(Turnos2 idTurnos);
	Turnos2 findByIdTurnos(Long idTurnos);
	
//  Elementos Visita
	int modificarElementosVisita(ElementosVisita2 idElementosVisita);
	ElementosVisita2 findByIdElementosVisita(Long idElementosVisita);
	
//  Opciones Visita
	int modificarOpcionesVisita(OpcionesVisita2 idOpcionesVisita);
	OpcionesVisita2 findByIdOpcionesVisita(Long idOpcionesVisita);
	
//  Tipo Servicio
	int modificarTipoServicios(TipoServicio2 idTipoServicio);
	TipoServicio2 findByIdTipoServicios(Long idTipoServicio);
	
//  Escala Solicitud
	int modificarEscalaSolicitud(EscalaSolicitudes2 idEscalaSolicitud);
	EscalaSolicitudes2 findByIdEscalaSolicitud(Long idEscalaSolicitud);
	
//  Motivo Solicitud
	int modificarMotivoSolicitud(MotivoSolicitud2 idMotivoSolicitud);
	MotivoSolicitud2 findByIdMotivoSolicitud(Long idMotivoSolicitud);
	
//  ClienteSC
	int modificarClienteSC(ClienteSC2 idClienteSC);
	ClienteSC2 findByIdClienteSC(Long idClienteSC);
	
//  AsignacionUsuariosPQRS
	int modificarAsignacionUsuarioPQRS(AsignacionUsuarioPQRS2 idAsignacionUsuariosPQRS);
	AsignacionUsuarioPQRS2 findByIdAsignacionUsuarioPQRS(Long idAsignacionUsuariosPQRS);
	
//  Area
	int modificarArea(Area2 area);
	Area2 findByIdArea(Long id);
	
//  IngresoPersonalEmpresa
	int modificarIngresoPersonalEmpresa(IngresoPersonalEmpresa2 area);
	IngresoPersonalEmpresa2 findByIdIngresoPersonalEmpresa(Long id);
	
//  Sede2
	int modificarSede(Sede2 sede);
	Sede2 findByIdSede(Long id);
	
//  TipoActivo
	int modificarTipoActivo(TipoActivo2 area);
	TipoActivo2 findByIdTipoActivo(Long id);

//  TiposProceos
	int modificarTiposProcesos(TiposProcesos2 area);
	TiposProcesos2 findByIdTiposProcesos(Long id);

//  DetalleArticulo
	int modificarDetalleArticulo(DetalleArticulo2 area);
	DetalleArticulo2 findByIdDetalleArticulo(Long id);
	
//  HistorialArticulo
	int modificarHistorialArticulo(HistorialArticulo2 area);
	HistorialArticulo2 findByIdHistorialArticulo(Long id);

//  AsignacionesProcesos
	int modificarAsignacionesProcesos(AsignacionesProcesos2 area);
	AsignacionesProcesos2 findByIdAsignacionesProcesos(Long id);

//  AsignacionesArticulos
	int modificarAsignacionesArticulos(AsignacionesArticulos2 area);
	AsignacionesArticulos2 findByIdAsignacionesArticulos(Long id);

//  AsignacionPuntoVentaArticulo
	int modificarAsignacionPuntoVentaArticulo(AsignacionPuntoVentaArticulo2 area);
	AsignacionPuntoVentaArticulo2 findByIdAsignacionPuntoVentaArticulo(Long id);
	
//  Articulo Baja
	int modificarArticulosBaja(ArticulosBaja2 articulosBaja2);
	ArticulosBaja2 findByIdArticulosBaja(Long id);
	
//  SolicitudBajasArticulos
	int modificarSolicitudBajasArticulos(SolicitudBajasArticulos2 solicitudBajasArticulos);
	SolicitudBajasArticulos2 findByIdSolicitudBajasArticulos(Long id);
	
//  Compras
	int modificarCompras(Compras2 compras);
	Compras2 findByIdCompras(Long id);
	
//  Inventario
	int modificarInventario(Inventario2 compras);
	Inventario2 findByIdInventario(Long id);
	
//  MovimientoComprasInventario
	int modificarMovimientoComprasInventario(MovimientoComprasInventario2 movimientoComprasInventario);
	MovimientoComprasInventario2 findByIdMovimientoComprasInventario(Long id);
	
//  Tipo Necesidad
	int modificarTipoNecesidad(TipoNecesidad2 tipoNecesidad);
	TipoNecesidad2 findByIdTipoNecesidad(Long id);
	
//  SubProceso
	int modificarSubProceso(SubProceso2 subProceso);
	SubProceso2 findByIdSubProceso(Long id);
	
//  Matriz Necesidad
	int modificarMatrizNecesidad(MatrizNecesidad2 matrizNecesidad);
	MatrizNecesidad2 findByIdMatrizNecesidad(Long id);
	
//  MatrizNecesidadDetalle
	int modificarMatrizNecesidadDetalle(MatrizNecesidadDetalle2 matrizNecesidadDetalle);
	MatrizNecesidadDetalle2 findByIdMatrizNecesidadDetalle(Long id);
	
//  Medios Radicación
	int modificarMediosRadiacion(MediosRadiacion2 mediosRadiacion);
	MediosRadiacion2 findByIdMediosRadiacion(Long id);
	
//  Periodo Ejecucion
	int modificarPeriodoEjecucion(PeriodoEjecucion2 periodoEjecucion);
	PeriodoEjecucion2 findByIdPeriodoEjecucion(Long id);
	
//  Opcion Articulo Baja
	int modificarOpcionArticuloBaja(OpcionArticuloBaja2 opcionArticuloBaja);
	OpcionArticuloBaja2 findByIdOpcionArticuloBaja(Long id);
	
//  Jerarquia Cuentas
	int modificarJerarquiaCuentas(JerarquiaCuentas2 jerarquiaCuentas);
	JerarquiaCuentas2 findByIdJerarquiaCuentas(Long id);
	
//   Cuenta
	int modificarCuenta(Cuenta2 cuenta);
	Cuenta2 findByIdCuenta(Long id);

//  Libro Mayor
	int modificarLibroMayor(LibroMayor2 libroMayor);
	LibroMayor2 findByIdLibroMayor(Long id);
	
//  Porcentaje Presupuesto
	int modificarPorcentajePresupuesto(PorcentajePresupuesto2 porcentajePresupuesto);
	PorcentajePresupuesto2 findByIdPorcentajePresupuesto(Long id);
	
//  Presupuesto Contable
	int modificarPresupuestoContable(PresupuestoContable2 presupuestoContable);
	PresupuestoContable2 findByIdPresupuestoContable(Long id);
	
//  Motivo Autorizacion Pago
	int modificarMotivoAutorizacionPago(MotivoAutorizacionPago2 motivoAutorizacionPago);
	MotivoAutorizacionPago2 findByIdMotivoAutorizacionPago(Long id);
	
//  Cliente Autorizacion Pago
	int modificarClienteAutorizacionPago(ClienteAutorizacionPago2 clienteAutorizacionPago);
	ClienteAutorizacionPago2 findByIdClienteAutorizacionPago(Long id);
	
//  Datos Formulario Pago
	int modificarDatosFormularioPago(DatosFormularioPago2 datosFormularioPago);
	DatosFormularioPago2 findByIdDatosFormularioPago(Long id);
	
//  Solicitud Autorizacion Pago
	int modificarSolicitudAutorizacionPago(SolicitudAutorizacionPago2 solicitudAutorizacionPago);
	SolicitudAutorizacionPago2 findByIdSolicitudAutorizacionPago(Long id);
}