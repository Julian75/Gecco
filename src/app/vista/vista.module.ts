import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './componentes-principales/sidebar/sidebar.component';
import { NavbarComponent } from './componentes-principales/navbar/navbar.component';
import { VistaComponent } from './vista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaRoutingModule } from './vista-routing.module';
import { MaterialModule } from '../material/material.module';
import {DataTablesModule} from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { InicioGeneralComponent } from './componentes-principales/inicio-general/inicio-general.component';
import { UsuariosComponent } from './modulos-administracion/usuarios/usuarios.component';
import { ModuloComponent } from './modulos-administracion/modulo/modulo.component';
import { AgregarModuloComponent } from './modulos-administracion/modulo/agregar-modulo/agregar-modulo.component';
import { ModificarModuloComponent } from './modulos-administracion/modulo/modificar-modulo/modificar-modulo.component';
import { RolComponent } from './modulos-administracion/rol/rol.component';
import { AgregarRolComponent } from './modulos-administracion/rol/agregar-rol/agregar-rol.component';
import { ModificarRolComponent } from './modulos-administracion/rol/modificar-rol/modificar-rol.component';
import { TipoTurnoComponent } from './modulos-turnos/tipo-turno/tipo-turno.component';
import { AgregarTipoTurnoComponent } from './modulos-turnos/tipo-turno/agregar-tipo-turno/agregar-tipo-turno.component';
import { ModificarTipoTurnoComponent } from './modulos-turnos/tipo-turno/modificar-tipo-turno/modificar-tipo-turno.component';
import { TurnosComponent } from './modulos-turnos/turnos/turnos.component';
import { AgregarTurnosComponent } from './modulos-turnos/turnos/agregar-turnos/agregar-turnos.component';
import { ModificarTurnosComponent } from './modulos-turnos/turnos/modificar-turnos/modificar-turnos.component';
import { TipoDocumentoComponent } from './modulos-administracion/tipo-documento/tipo-documento.component';
import { AgregarTipoDocumentoComponent } from './modulos-administracion/tipo-documento/agregar-tipo-documento/agregar-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modulos-administracion/tipo-documento/modificar-tipo-documento/modificar-tipo-documento.component';
import { ListaEstadosComponent } from './modulos-administracion/modulo/lista-estados/lista-estados.component';
import { AgregarEstadoComponent } from './modulos-administracion/modulo/lista-estados/agregar-estado/agregar-estado.component';
import { ModificarEstadoComponent } from './modulos-administracion/modulo/lista-estados/modificar-estado/modificar-estado.component';
import { AgregarUsuariosComponent } from './modulos-administracion/usuarios/agregar-usuarios/agregar-usuarios.component';
import { ModificarUsuariosComponent } from './modulos-administracion/usuarios/modificar-usuarios/modificar-usuarios.component';
import { AccesosComponent } from './modulos-administracion/accesos/accesos.component';
import { AgregarAccesosComponent } from './modulos-administracion/accesos/agregar-accesos/agregar-accesos.component';
import { HttpClientModule } from '@angular/common/http';
import { AsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/asignar-turno-vendedor.component';
import { AgregarAsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/agregar-asignar-turno-vendedor/agregar-asignar-turno-vendedor.component';
import { AsignarTurnoComponent } from './modulos-turnos/asignar-turno/asignar-turno.component';
import { AgregarAsignarTurnoComponent } from './modulos-turnos/asignar-turno/agregar-asignar-turno/agregar-asignar-turno.component';
import { NovedadesComponent } from './modulos-turnos/novedades/novedades.component';
import { JerarquiaComponent } from './modulos-turnos/jerarquia/jerarquia.component';
import { TipoNovedadesComponent } from './modulos-turnos/novedades/tipo-novedades/tipo-novedades.component';
import { AgregarJerarquiaComponent } from './modulos-turnos/jerarquia/agregar-jerarquia/agregar-jerarquia.component';
import { AgregarTipoNovedadesComponent } from './modulos-turnos/novedades/tipo-novedades/agregar-tipo-novedades/agregar-tipo-novedades.component';
import { ModificarTipoNovedadesComponent } from './modulos-turnos/novedades/tipo-novedades/modificar-tipo-novedades/modificar-tipo-novedades.component';
import { ModificarJerarquiaComponent } from './modulos-turnos/jerarquia/modificar-jerarquia/modificar-jerarquia.component';
import { MallasComponent } from './modulos-turnos/mallas/mallas.component';
import { AgregarNovedadComponent } from './modulos-turnos/novedades/agregar-novedad/agregar-novedad.component';
import { OpcionesVisitaComponent } from './modulos-visita/opciones-visita/opciones-visita.component';
import { VisitaDetalleComponent } from './modulos-visita/visita-detalle/visita-detalle.component';
import { AgregarOpcionesVisitaComponent } from './modulos-visita/opciones-visita/agregar-opciones-visita/agregar-opciones-visita.component';
import { ModificarOpcionesVisitaComponent } from './modulos-visita/opciones-visita/modificar-opciones-visita/modificar-opciones-visita.component';
import { ModificarNovedadesComponent } from './modulos-turnos/novedades/modificar-novedades/modificar-novedades.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { ElementosVisitaComponent } from './modulos-visita/elementos-visita/elementos-visita.component';
import { AgregarElementosVisitaComponent } from './modulos-visita/elementos-visita/agregar-elementos-visita/agregar-elementos-visita.component';
import { ModificarElementosVisitaComponent } from './modulos-visita/elementos-visita/modificar-elementos-visita/modificar-elementos-visita.component';
import { SideMovilComponent } from './componentes-principales/side-movil/side-movil.component';
import { ReportesVisitaDetalleComponent } from './modulos-visita/reportes-visita-detalle/reportes-visita-detalle.component';
import { TablaConfiguracionComponent } from './modulo-configuracion/tabla-configuracion/tabla-configuracion.component';
import { ModificarTablaConfiguracionComponent } from './modulo-configuracion/modificar-tabla-configuracion/modificar-tabla-configuracion.component';
import { AgregarConfiguracionComponent } from './modulo-configuracion/agregar-configuracion/agregar-configuracion.component';
import { MallasCierreComponent } from './modulos-turnos/mallas-cierre/mallas-cierre.component';
import { SolicitudEliminarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/solicitud-eliminar-turno-vendedor/solicitud-eliminar-turno-vendedor.component';
import { TablaAprobacionComponent } from './modulos-administracion/tabla-aprobacion/tabla-aprobacion.component';
import { ObservacionAprobacionComponent } from './modulos-administracion/tabla-aprobacion/observacion-aprobacion/observacion-aprobacion.component';
import { ArticulosComponent } from './modulos-compra/articulos/articulos.component';
import { AgregarArticulosComponent } from './modulos-compra/articulos/agregar-articulos/agregar-articulos.component';
import { ModificarArticulosComponent } from './modulos-compra/articulos/modificar-articulos/modificar-articulos.component';
import { GenerarSolicitudComponent } from './modulos-compra/generar-solicitud/generar-solicitud.component';
import { ListaSolicitudesComponent } from './modulos-compra/lista-solicitudes/lista-solicitudes.component';
import { PasosComponent } from './modulos-compra/pasos/pasos.component';
import { VisualizarDetalleSolicitudComponent } from './modulos-compra/lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { ProveedorComponent } from './modulos-compra/proveedor/proveedor.component';
import { AgregarProveedorComponent } from './modulos-compra/proveedor/agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from './modulos-compra/proveedor/modificar-proveedor/modificar-proveedor.component';
import { RechazoSolicitudComponent } from './modulos-compra/lista-solicitudes/rechazo-solicitud/rechazo-solicitud.component';
import { GenerarCotizacionComponent } from './modulos-compra/generar-cotizacion/generar-cotizacion.component';
import { AgregarCotizacionComponent } from './modulos-compra/generar-cotizacion/agregar-cotizacion/agregar-cotizacion.component';
import { ListaCotizacionesComponent } from './modulos-compra/lista-cotizaciones/lista-cotizaciones.component';
import { SolicitudesRealizadasComponent } from './modulos-compra/solicitudes-realizadas/solicitudes-realizadas.component';
import { SolicitudesComponent } from './modulos-compra/solicitudes/solicitudes.component';
import { ModificarSolicitudComponent } from './modulos-compra/lista-solicitudes/modificar-solicitud/modificar-solicitud.component';
import { OrdenCompraComponent } from './modulos-compra/orden-compra/orden-compra.component';
import { AprobacionRegistroComponent } from './modulos-compra/aprobacion-registro/aprobacion-registro.component';
import { RechazarRegistroComponent } from './modulos-compra/aprobacion-registro/rechazar-registro/rechazar-registro.component';
import { RaspaListoComponent } from './modulos-raspita/raspa-listo/raspa-listo.component';
import { ModificarOrdenCompraComponent } from './modulos-compra/orden-compra/modificar-orden-compra/modificar-orden-compra.component';
import { VisualizarRegistroComponent } from './modulos-compra/aprobacion-registro/visualizar-registro/visualizar-registro.component';
import { ProcesoComponent } from './modulos-compra/proceso/proceso.component';
import { ListadoObservacionComponent } from './modulos-compra/listado-observacion/listado-observacion.component';
import { CategoriasArticuloComponent } from './modulos-compra/articulos/categorias-articulo/categorias-articulo.component';
import { AgregarCategoriaComponent } from './modulos-compra/articulos/categorias-articulo/agregar-categoria/agregar-categoria.component';
import { ModificarCategoriaComponent } from './modulos-compra/articulos/categorias-articulo/modificar-categoria/modificar-categoria.component';
import { ComentariosSolicitudComponent } from './modulos-compra/comentarios-solicitud/comentarios-solicitud.component';
import { ListaProcesoComponent } from './modulos-compra/lista-proceso/lista-proceso.component';
import { AgregarProcesoComponent } from './modulos-compra/lista-proceso/agregar-proceso/agregar-proceso.component';
import { ModificarProcesoComponent } from './modulos-compra/lista-proceso/modificar-proceso/modificar-proceso.component';
import { AgregarComentarioComponent } from './modulos-compra/comentarios-solicitud/agregar-comentario/agregar-comentario.component';
import { AprobarComentarioComponent } from './modulos-compra/comentarios-solicitud/aprobar-comentario/aprobar-comentario.component';
import { ListadoComentariosComponent } from './modulos-compra/comentarios-solicitud/listado-comentarios/listado-comentarios.component';
import { SolicitudConformeComponent } from './modulos-compra/solicitud-conforme/solicitud-conforme.component';
import { ClienteScComponent } from './modulos-recepcion-datos/cliente-sc/cliente-sc.component';
import { AgregarClienteScComponent } from './modulos-recepcion-datos/cliente-sc/agregar-cliente-sc/agregar-cliente-sc.component';
import { ModificarClienteScComponent } from './modulos-recepcion-datos/cliente-sc/modificar-cliente-sc/modificar-cliente-sc.component';
import { MotivoSolicitudComponent } from './modulos-recepcion-datos/motivo-solicitud/motivo-solicitud.component';
import { AgregarMotivoSolicitudComponent } from './modulos-recepcion-datos/motivo-solicitud/agregar-motivo-solicitud/agregar-motivo-solicitud.component';
import { ModificarMotivoSolicitudComponent } from './modulos-recepcion-datos/motivo-solicitud/modificar-motivo-solicitud/modificar-motivo-solicitud.component';
import { SolicitudesScComponent } from './modulos-recepcion-datos/solicitudes-sc/solicitudes-sc.component';
import { AgregarSolicitudScComponent } from './modulos-recepcion-datos/solicitudes-sc/agregar-solicitud-sc/agregar-solicitud-sc.component';
import { TipoServicioComponent } from './modulos-recepcion-datos/tipo-servicio/tipo-servicio.component';
import { AgregarTipoServicioComponent } from './modulos-recepcion-datos/tipo-servicio/agregar-tipo-servicio/agregar-tipo-servicio.component';
import { ModificarTipoServicioComponent } from './modulos-recepcion-datos/tipo-servicio/modificar-tipo-servicio/modificar-tipo-servicio.component';
import { EscalaSolicitudesComponent } from './modulos-recepcion-datos/escala-solicitudes/escala-solicitudes.component';
import { AgregarEscalaSolicitudesComponent } from './modulos-recepcion-datos/escala-solicitudes/agregar-escala-solicitudes/agregar-escala-solicitudes.component';
import { ModificarEscalaSolicitudesComponent } from './modulos-recepcion-datos/escala-solicitudes/modificar-escala-solicitudes/modificar-escala-solicitudes.component';
import { PresupuestoVentaMensualComponent } from './modulos-turnos/presupuesto-venta-mensual/presupuesto-venta-mensual.component';
import { AgregarPresupuestoVentaMensualComponent } from './modulos-turnos/presupuesto-venta-mensual/agregar-presupuesto-venta-mensual/agregar-presupuesto-venta-mensual.component';
import { HistorialSolicitudesComponent } from './modulos-recepcion-datos/historial-solicitudes/historial-solicitudes.component';
import { ReporteAsesorComponent } from './modulos-turnos/reporte-asesor/reporte-asesor.component';
import { AgregarHistorialSolicitudesComponent } from './modulos-recepcion-datos/historial-solicitudes/agregar-historial-solicitudes/agregar-historial-solicitudes.component';
import { AsignacionUsuarioPqrComponent } from './modulos-recepcion-datos/asignacion-usuario-pqr/asignacion-usuario-pqr.component';
import { AgregarAsignacionUsuarioPqrComponent } from './modulos-recepcion-datos/asignacion-usuario-pqr/agregar-asignacion-usuario-pqr/agregar-asignacion-usuario-pqr.component';
import { ModificarAsignacionUsuarioPqrComponent } from './modulos-recepcion-datos/asignacion-usuario-pqr/modificar-asignacion-usuario-pqr/modificar-asignacion-usuario-pqr.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { PeticionCotizacionComponent } from './modulos-compra/generar-solicitud/peticion-cotizacion/peticion-cotizacion.component';
import { AgregarCotizacionLiderProcesoComponent } from './modulos-compra/generar-solicitud/peticion-cotizacion/agregar-cotizacion-lider-proceso/agregar-cotizacion-lider-proceso.component';
import { ListaCotizacionesLiderProcesoComponent } from './modulos-compra/lista-cotizaciones-lider-proceso/lista-cotizaciones-lider-proceso.component';
import { ModificarHistorialRemisionComponent } from './modulos-recepcion-datos/historial-solicitudes/modificar-historial-remision/modificar-historial-remision.component';
import { RemisionesDecisionComponent } from './modulos-recepcion-datos/remisiones-decision/remisiones-decision.component';
import { ProrrogaComponent } from './modulos-recepcion-datos/prorroga/prorroga.component';
import { ModificarSolicitudScComponent } from './modulos-recepcion-datos/solicitudes-sc/modificar-solicitud-sc/modificar-solicitud-sc.component';
import { AgregarClienteScModalComponent } from './modulos-recepcion-datos/cliente-sc/agregar-cliente-sc-modal/agregar-cliente-sc-modal.component';
import { AreaComponent } from './modulos-recepcion-datos/area/area.component';
import { AgregarAreaComponent } from './modulos-recepcion-datos/area/agregar-area/agregar-area.component';
import { ModificarAreaComponent } from './modulos-recepcion-datos/area/modificar-area/modificar-area.component';
import { DescargasMultiplesComponent } from './modulos-recepcion-datos/descargas-multiples/descargas-multiples.component';
import { SedesComponent } from './modulos-registro-ingreso/sedes/sedes.component';
import { AgregarSedesComponent } from './modulos-registro-ingreso/sedes/agregar-sedes/agregar-sedes.component';
import { ModificarSedesComponent } from './modulos-registro-ingreso/sedes/modificar-sedes/modificar-sedes.component';
import { RegistroIngresoComponent } from './modulos-registro-ingreso/registro-ingreso/registro-ingreso.component';
import { AgregarPersonalComponent } from './modulos-registro-ingreso/agregar-personal/agregar-personal.component';
import { WebcamModule } from 'ngx-webcam';
import { ReporteIngresoComponent } from './modulos-registro-ingreso/reporte-ingreso/reporte-ingreso.component';
import { DetalleArticuloComponent } from './modulos-inventarios/detalle-articulo/detalle-articulo.component';
import { TipoActivoComponent } from './modulos-inventarios/detalle-articulo/tipo-activo/tipo-activo.component';
import { AgregarTipoActivoComponent } from './modulos-inventarios/detalle-articulo/tipo-activo/agregar-tipo-activo/agregar-tipo-activo.component';
import { ModificarTipoActivoComponent } from './modulos-inventarios/detalle-articulo/tipo-activo/modificar-tipo-activo/modificar-tipo-activo.component';
import { TipoProcesoComponent } from './modulos-inventarios/tipo-proceso/tipo-proceso.component';
import { AgregarTipoProcesoComponent } from './modulos-inventarios/tipo-proceso/agregar-tipo-proceso/agregar-tipo-proceso.component';
import { ModificarTipoProcesoComponent } from './modulos-inventarios/tipo-proceso/modificar-tipo-proceso/modificar-tipo-proceso.component';
import { AsignarProcesoUsuarioComponent } from './modulos-inventarios/asignar-proceso-usuario/asignar-proceso-usuario.component';
import { AgregarAsignarProcesoUsuarioComponent } from './modulos-inventarios/asignar-proceso-usuario/agregar-asignar-proceso-usuario/agregar-asignar-proceso-usuario.component';
import { ModificarAsignarProcesoUsuarioComponent } from './modulos-inventarios/asignar-proceso-usuario/modificar-asignar-proceso-usuario/modificar-asignar-proceso-usuario.component';
import { AsignarArticulosUsuarioComponent } from './modulos-inventarios/asignar-articulos-usuario/asignar-articulos-usuario.component';
import { ModificarAsignarArticulosUsuarioComponent } from './modulos-inventarios/asignar-articulos-usuario/modificar-asignar-articulos-usuario/modificar-asignar-articulos-usuario.component';
import { AsignarPuntoVentaArticuloComponent } from './modulos-inventarios/asignar-punto-venta-articulo/asignar-punto-venta-articulo.component';
import { AgregarAsignarPuntoVentaArticuloComponent } from './modulos-inventarios/asignar-punto-venta-articulo/agregar-asignar-punto-venta-articulo/agregar-asignar-punto-venta-articulo.component';
import { SubirArchivoSolicitudComponent } from './modulos-recepcion-datos/subir-archivo-solicitud/subir-archivo-solicitud.component';
import { MisArticulosAsignadosComponent } from './modulos-inventarios/mis-articulos-asignados/mis-articulos-asignados.component';
import { FirmasComponent } from './modulos-compra/firmas/firmas.component';
import { AgregarFirmasComponent } from './modulos-compra/firmas/agregar-firmas/agregar-firmas.component';
import { VisualizarHistorialArticuloComponent } from './modulos-compra/articulos/visualizar-historial-articulo/visualizar-historial-articulo.component';
import { AgregarArticulosModalComponent } from './modulos-compra/articulos/agregar-articulos-modal/agregar-articulos-modal.component';
import { ReporteInventarioComponent } from './modulos-inventarios/reporte-inventario/reporte-inventario.component';
import { ReasignarArticuloComponent } from './modulos-inventarios/mis-articulos-asignados/reasignar-articulo/reasignar-articulo.component';
import { ListaAutorizacionesBajaArticulosComponent } from './modulos-inventarios/lista-autorizaciones-baja-articulos/lista-autorizaciones-baja-articulos.component';
import { ListaConfirmacionesBajaArticulosComponent } from './modulos-inventarios/lista-confirmaciones-baja-articulos/lista-confirmaciones-baja-articulos.component';
import { RechazoSolicitudBajaArticuloComponent } from './modulos-inventarios/lista-autorizaciones-baja-articulos/rechazo-solicitud-baja-articulo/rechazo-solicitud-baja-articulo.component';
import { RechazoSolicitudBajaArticuloLiderProcesoComponent } from './modulos-inventarios/lista-confirmaciones-baja-articulos/rechazo-solicitud-baja-articulo-lider-proceso/rechazo-solicitud-baja-articulo-lider-proceso.component';
import { ListaActasBajasComponent } from './modulos-inventarios/lista-actas-bajas/lista-actas-bajas.component';
import { AgregarArticulosInventarioComponent } from './modulos-inventarios/agregar-articulos-inventario/agregar-articulos-inventario.component';
import { SolicitudArticulosBajaComponent } from './modulos-inventarios/solicitud-articulos-baja/solicitud-articulos-baja.component';
import { OpcionesSolicitudBajasComponent } from './modulos-inventarios/opciones-solicitud-bajas/opciones-solicitud-bajas.component';
import { AgregarOpcionesSolicitudBajasComponent } from './modulos-inventarios/opciones-solicitud-bajas/agregar-opciones-solicitud-bajas/agregar-opciones-solicitud-bajas.component';
import { ModificarOpcionesSolicitudBajasComponent } from './modulos-inventarios/opciones-solicitud-bajas/modificar-opciones-solicitud-bajas/modificar-opciones-solicitud-bajas.component';
import { ListaArticulosInventarioComponent } from './modulos-inventarios/lista-articulos-inventario/lista-articulos-inventario.component';
import { InformacionDetalladaActivosComponent } from './modulos-inventarios/solicitud-articulos-baja/informacion-detallada-activos/informacion-detallada-activos.component';
import { VisualizarActivosBajasSolicitudComponent } from './modulos-inventarios/visualizar-activos-bajas-solicitud/visualizar-activos-bajas-solicitud.component';
import { ListaSubprocesoComponent } from './modulos-matriz-necesidades/lista-subproceso/lista-subproceso.component';
import { AgregarSubprocesoComponent } from './modulos-matriz-necesidades/lista-subproceso/agregar-subproceso/agregar-subproceso.component';
import { ModificarSubprocesoComponent } from './modulos-matriz-necesidades/lista-subproceso/modificar-subproceso/modificar-subproceso.component';
import { TipoNecesidadesComponent } from './modulos-matriz-necesidades/tipo-necesidades/tipo-necesidades.component';
import { AgregarTipoNecesidadesComponent } from './modulos-matriz-necesidades/tipo-necesidades/agregar-tipo-necesidades/agregar-tipo-necesidades.component';
import { ModificarTipoNecesidadesComponent } from './modulos-matriz-necesidades/tipo-necesidades/modificar-tipo-necesidades/modificar-tipo-necesidades.component';
import { MatrizNecesidadComponent } from './modulos-matriz-necesidades/matriz-necesidad/matriz-necesidad.component';
import { MatrizNecesidadDetalleComponent } from './modulos-matriz-necesidades/matriz-necesidad-detalle/matriz-necesidad-detalle.component';
import { ListaMatricesNecesidadesComponent } from './modulos-matriz-necesidades/lista-matrices-necesidades/lista-matrices-necesidades.component';
import { VisualizarDetalleMatrizNecesidadesComponent } from './modulos-matriz-necesidades/lista-matrices-necesidades/visualizar-detalle-matriz-necesidades/visualizar-detalle-matriz-necesidades.component';
import { ChatRemitentesComponent } from './modulos-recepcion-datos/chat-remitentes/chat-remitentes.component';
import { ReporteMatrizNecesidadComponent } from './modulos-matriz-necesidades/reporte-matriz-necesidad/reporte-matriz-necesidad.component';
import { AgregarMediosRadiacionComponent } from './modulos-recepcion-datos/lista-medios-radiacion/agregar-medios-radiacion/agregar-medios-radiacion.component';
import { ModificarMediosRadiacionComponent } from './modulos-recepcion-datos/lista-medios-radiacion/modificar-medios-radiacion/modificar-medios-radiacion.component';
import { ListaMediosRadiacionComponent } from './modulos-recepcion-datos/lista-medios-radiacion/lista-medios-radiacion.component';
import { ListaRecordatoriosComponent } from './modulos-recordatorio/lista-recordatorios/lista-recordatorios.component';
import { AgregarRecordatorioComponent } from './modulos-recordatorio/lista-recordatorios/agregar-recordatorio/agregar-recordatorio.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { RechazoMatrizDetalleComponent } from './modulos-matriz-necesidades/lista-matrices-necesidades/visualizar-detalle-matriz-necesidades/rechazo-matriz-detalle/rechazo-matriz-detalle.component';
import { ChatSolicitudesScComponent } from './modulos-recepcion-datos/historial-solicitudes/chat-solicitudes-sc/chat-solicitudes-sc.component';
import { PeriodoEjecucionMatrizDetalleComponent } from './modulos-matriz-necesidades/matriz-necesidad-detalle/periodo-ejecucion-matriz-detalle/periodo-ejecucion-matriz-detalle.component';
import { ListasPeriodosEjecucionesComponent } from './modulos-matriz-necesidades/listas-periodos-ejecuciones/listas-periodos-ejecuciones.component';
import { AgregarPeriodoEjecucionComponent } from './modulos-matriz-necesidades/listas-periodos-ejecuciones/agregar-periodo-ejecucion/agregar-periodo-ejecucion.component';
import { ModificarPeriodoEjecucionComponent } from './modulos-matriz-necesidades/listas-periodos-ejecuciones/modificar-periodo-ejecucion/modificar-periodo-ejecucion.component';

@NgModule({
  declarations: [
    VistaComponent,
    InicioGeneralComponent,
    NavbarComponent,
    SidebarComponent,
    UsuariosComponent,
    ModuloComponent,
    AgregarModuloComponent,
    ModificarModuloComponent,
    RolComponent,
    AgregarRolComponent,
    ModificarRolComponent,
    TipoTurnoComponent,
    AgregarTipoTurnoComponent,
    ModificarTipoTurnoComponent,
    TurnosComponent,
    AgregarTurnosComponent,
    ModificarTurnosComponent,
    TipoDocumentoComponent,
    AgregarTipoDocumentoComponent,
    ModificarTipoDocumentoComponent,
    ListaEstadosComponent,
    AgregarEstadoComponent,
    ModificarEstadoComponent,
    AgregarUsuariosComponent,
    ModificarUsuariosComponent,
    AccesosComponent,
    AgregarAccesosComponent,
    AsignarTurnoVendedorComponent,
    AgregarAsignarTurnoVendedorComponent,
    AsignarTurnoComponent,
    AgregarAsignarTurnoComponent,
    AccesosComponent,
    AgregarAccesosComponent,
    NovedadesComponent,
    JerarquiaComponent,
    TipoNovedadesComponent,
    AgregarJerarquiaComponent,
    AgregarTipoNovedadesComponent,
    ModificarTipoNovedadesComponent,
    ModificarJerarquiaComponent,
    MallasComponent,
    AgregarNovedadComponent,
    OpcionesVisitaComponent,
    VisitaDetalleComponent,
    AgregarOpcionesVisitaComponent,
    ModificarOpcionesVisitaComponent,
    ModificarNovedadesComponent,
    ErrorComponent,
    ElementosVisitaComponent,
    AgregarElementosVisitaComponent,
    ModificarElementosVisitaComponent,
    SideMovilComponent,
    ReportesVisitaDetalleComponent,
    TablaConfiguracionComponent,
    ModificarTablaConfiguracionComponent,
    AgregarConfiguracionComponent,
    MallasCierreComponent,
    SolicitudEliminarTurnoVendedorComponent,
    TablaAprobacionComponent,
    ObservacionAprobacionComponent,
    ArticulosComponent,
    AgregarArticulosComponent,
    ModificarArticulosComponent,
    GenerarSolicitudComponent,
    ListaSolicitudesComponent,
    PasosComponent,
    VisualizarDetalleSolicitudComponent,
    ProveedorComponent,
    AgregarProveedorComponent,
    ModificarProveedorComponent,
    RechazoSolicitudComponent,
    GenerarCotizacionComponent,
    AgregarCotizacionComponent,
    ListaCotizacionesComponent,
    SolicitudesRealizadasComponent,
    SolicitudesComponent,
    ModificarSolicitudComponent,
    OrdenCompraComponent,
    AprobacionRegistroComponent,
    RechazarRegistroComponent,
    RaspaListoComponent,
    ModificarOrdenCompraComponent,
    VisualizarRegistroComponent,
    ProcesoComponent,
    ListadoObservacionComponent,
    CategoriasArticuloComponent,
    AgregarCategoriaComponent,
    ModificarCategoriaComponent,
    ComentariosSolicitudComponent,
    ListaProcesoComponent,
    AgregarProcesoComponent,
    ModificarProcesoComponent,
    AgregarComentarioComponent,
    AprobarComentarioComponent,
    ListadoComentariosComponent,
    SolicitudConformeComponent,
    ClienteScComponent,
    AgregarClienteScComponent,
    ModificarClienteScComponent,
    AgregarMotivoSolicitudComponent,
    ModificarMotivoSolicitudComponent,
    MotivoSolicitudComponent,
    SolicitudesScComponent,
    AgregarSolicitudScComponent,
    TipoServicioComponent,
    AgregarTipoServicioComponent,
    ModificarTipoServicioComponent,
    EscalaSolicitudesComponent,
    AgregarEscalaSolicitudesComponent,
    ModificarEscalaSolicitudesComponent,
    PresupuestoVentaMensualComponent,
    AgregarPresupuestoVentaMensualComponent,
    HistorialSolicitudesComponent,
    ReporteAsesorComponent,
    AgregarHistorialSolicitudesComponent,
    AsignacionUsuarioPqrComponent,
    AgregarAsignacionUsuarioPqrComponent,
    ModificarAsignacionUsuarioPqrComponent,
    PeticionCotizacionComponent,
    AgregarCotizacionLiderProcesoComponent,
    ListaCotizacionesLiderProcesoComponent,
    ModificarHistorialRemisionComponent,
    RemisionesDecisionComponent,
    ProrrogaComponent,
    ModificarSolicitudScComponent,
    AgregarClienteScModalComponent,
    AreaComponent,
    AgregarAreaComponent,
    ModificarAreaComponent,
    DescargasMultiplesComponent,
    SedesComponent,
    AgregarSedesComponent,
    ModificarSedesComponent,
    RegistroIngresoComponent,
    AgregarPersonalComponent,
    ReporteIngresoComponent,
    DetalleArticuloComponent,
    TipoActivoComponent,
    AgregarTipoActivoComponent,
    ModificarTipoActivoComponent,
    TipoProcesoComponent,
    AgregarTipoProcesoComponent,
    ModificarTipoProcesoComponent,
    AsignarProcesoUsuarioComponent,
    AgregarAsignarProcesoUsuarioComponent,
    ModificarAsignarProcesoUsuarioComponent,
    AsignarArticulosUsuarioComponent,
    ModificarAsignarArticulosUsuarioComponent,
    AsignarPuntoVentaArticuloComponent,
    AgregarAsignarPuntoVentaArticuloComponent,
    SubirArchivoSolicitudComponent,
    MisArticulosAsignadosComponent,
    FirmasComponent,
    AgregarFirmasComponent,
    VisualizarHistorialArticuloComponent,
    AgregarArticulosModalComponent,
    ReporteInventarioComponent,
    ReasignarArticuloComponent,
    ListaAutorizacionesBajaArticulosComponent,
    ListaConfirmacionesBajaArticulosComponent,
    RechazoSolicitudBajaArticuloComponent,
    RechazoSolicitudBajaArticuloLiderProcesoComponent,
    ListaActasBajasComponent,
    AgregarArticulosInventarioComponent,
    SolicitudArticulosBajaComponent,
    OpcionesSolicitudBajasComponent,
    AgregarOpcionesSolicitudBajasComponent,
    VisualizarActivosBajasSolicitudComponent,
    ListaSubprocesoComponent,
    AgregarSubprocesoComponent,
    ModificarSubprocesoComponent,
    ModificarOpcionesSolicitudBajasComponent,
    ListaArticulosInventarioComponent,
    InformacionDetalladaActivosComponent,
    TipoNecesidadesComponent,
    AgregarTipoNecesidadesComponent,
    ModificarTipoNecesidadesComponent,
    MatrizNecesidadComponent,
    MatrizNecesidadDetalleComponent,
    ListaMatricesNecesidadesComponent,
    VisualizarDetalleMatrizNecesidadesComponent,
    ChatRemitentesComponent,
    ReporteMatrizNecesidadComponent,
    AgregarMediosRadiacionComponent,
    ModificarMediosRadiacionComponent,
    ListaMediosRadiacionComponent,
    ListaRecordatoriosComponent,
    AgregarRecordatorioComponent,
    RechazoMatrizDetalleComponent,
    ChatSolicitudesScComponent,
    PeriodoEjecucionMatrizDetalleComponent,
    ListasPeriodosEjecucionesComponent,
    AgregarPeriodoEjecucionComponent,
    ModificarPeriodoEjecucionComponent
  ],
  imports: [
    CommonModule,
    VistaRoutingModule,
    MaterialModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    WebcamModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  exports: [
    DataTablesModule,
    RouterModule,
    HttpClientModule
  ],
})
export class VistaModule { }
