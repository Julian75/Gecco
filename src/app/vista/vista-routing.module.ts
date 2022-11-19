import { AgregarPorcentajePresupuestoContabilidadComponent } from './modulos-presupuesto-contabilidad/porcentaje-presupuesto/agregar-porcentaje-presupuesto-contabilidad/agregar-porcentaje-presupuesto-contabilidad.component';
import { LibroMayorComponent } from './modulos-presupuesto-contabilidad/libro-mayor/libro-mayor.component';
import { LibroMayor } from './../modelos/libroMayor';
import { PeriodoEjecucion } from './../modelos/periodoEjecucion';
import { MatrizNecesidadComponent } from './modulos-matriz-necesidades/matriz-necesidad/matriz-necesidad.component';
import { AgregarArticulosComponent } from './modulos-compra/articulos/agregar-articulos/agregar-articulos.component';
import { ReporteAsesorComponent } from './modulos-turnos/reporte-asesor/reporte-asesor.component';
import { AgregarPresupuestoVentaMensualComponent } from './modulos-turnos/presupuesto-venta-mensual/agregar-presupuesto-venta-mensual/agregar-presupuesto-venta-mensual.component';
import { PresupuestoVentaMensualComponent } from './modulos-turnos/presupuesto-venta-mensual/presupuesto-venta-mensual.component';
import { SolicitudesScComponent } from './modulos-recepcion-datos/solicitudes-sc/solicitudes-sc.component';
import { ClienteScComponent } from './modulos-recepcion-datos/cliente-sc/cliente-sc.component';
import { ModificarClienteScComponent } from './modulos-recepcion-datos/cliente-sc/modificar-cliente-sc/modificar-cliente-sc.component';
import { AgregarClienteScComponent } from './modulos-recepcion-datos/cliente-sc/agregar-cliente-sc/agregar-cliente-sc.component';
import { ListaProcesoComponent } from './modulos-compra/lista-proceso/lista-proceso.component';
import { ComentariosSolicitudComponent } from './modulos-compra/comentarios-solicitud/comentarios-solicitud.component';
import { CategoriasArticuloComponent } from './modulos-compra/articulos/categorias-articulo/categorias-articulo.component';
import { ModificarRolComponent } from './modulos-administracion/rol/modificar-rol/modificar-rol.component';
import { RolComponent } from './modulos-administracion/rol/rol.component';
import { UsuariosComponent } from './modulos-administracion/usuarios/usuarios.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './componentes-principales/sidebar/sidebar.component';
import { InicioGeneralComponent } from './componentes-principales/inicio-general/inicio-general.component';
import { ModuloComponent } from './modulos-administracion/modulo/modulo.component';
import { TipoTurnoComponent } from './modulos-turnos/tipo-turno/tipo-turno.component';
import { TurnosComponent } from './modulos-turnos/turnos/turnos.component';
import { AgregarTurnosComponent } from './modulos-turnos/turnos/agregar-turnos/agregar-turnos.component';
import { ModificarTurnosComponent } from './modulos-turnos/turnos/modificar-turnos/modificar-turnos.component';
import { TipoDocumentoComponent } from './modulos-administracion/tipo-documento/tipo-documento.component';
import { ListaEstadosComponent } from './modulos-administracion/modulo/lista-estados/lista-estados.component';
import { AgregarUsuariosComponent } from './modulos-administracion/usuarios/agregar-usuarios/agregar-usuarios.component';
import { ModificarUsuariosComponent } from './modulos-administracion/usuarios/modificar-usuarios/modificar-usuarios.component';
import { AsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/asignar-turno-vendedor.component';
import { AsignarTurnoComponent } from './modulos-turnos/asignar-turno/asignar-turno.component';
import { AgregarAsignarTurnoComponent } from './modulos-turnos/asignar-turno/agregar-asignar-turno/agregar-asignar-turno.component';
import { AccesosComponent } from './modulos-administracion/accesos/accesos.component';
import { AgregarAsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/agregar-asignar-turno-vendedor/agregar-asignar-turno-vendedor.component';
import { ModificarDatosComponent } from '../formularios/formulariosPrincipales/modificar-datos/modificar-datos.component';
import { NovedadesComponent } from './modulos-turnos/novedades/novedades.component';
import { TipoNovedadesComponent } from './modulos-turnos/novedades/tipo-novedades/tipo-novedades.component';
import { JerarquiaComponent } from './modulos-turnos/jerarquia/jerarquia.component';
import { AgregarJerarquiaComponent } from './modulos-turnos/jerarquia/agregar-jerarquia/agregar-jerarquia.component';
import { MallasComponent } from './modulos-turnos/mallas/mallas.component';
import { OpcionesVisitaComponent } from './modulos-visita/opciones-visita/opciones-visita.component';
import { VisitaDetalleComponent } from './modulos-visita/visita-detalle/visita-detalle.component';
import { AutorizacionGuard } from '../guards/autorizacion.guard';
import { ElementosVisitaComponent } from './modulos-visita/elementos-visita/elementos-visita.component';
import { AgregarElementosVisitaComponent } from './modulos-visita/elementos-visita/agregar-elementos-visita/agregar-elementos-visita.component';
import { ModificarElementosVisitaComponent } from './modulos-visita/elementos-visita/modificar-elementos-visita/modificar-elementos-visita.component';
import { SideMovilComponent } from './componentes-principales/side-movil/side-movil.component';
import { ReportesVisitaDetalleComponent } from './modulos-visita/reportes-visita-detalle/reportes-visita-detalle.component';
import { TablaConfiguracionComponent } from './modulo-configuracion/tabla-configuracion/tabla-configuracion.component';
import { ModificarTablaConfiguracionComponent } from './modulo-configuracion/modificar-tabla-configuracion/modificar-tabla-configuracion.component';
import { AgregarConfiguracionComponent } from './modulo-configuracion/agregar-configuracion/agregar-configuracion.component';
import { MallasCierreComponent } from './modulos-turnos/mallas-cierre/mallas-cierre.component';
import { TablaAprobacionComponent } from './modulos-administracion/tabla-aprobacion/tabla-aprobacion.component';
import { ArticulosComponent } from './modulos-compra/articulos/articulos.component';
import { GenerarSolicitudComponent } from './modulos-compra/generar-solicitud/generar-solicitud.component';
import { ListaSolicitudesComponent } from './modulos-compra/lista-solicitudes/lista-solicitudes.component';
import { ProveedorComponent } from './modulos-compra/proveedor/proveedor.component';
import { AgregarProveedorComponent } from './modulos-compra/proveedor/agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from './modulos-compra/proveedor/modificar-proveedor/modificar-proveedor.component';
import { ListaCotizacionesComponent } from './modulos-compra/lista-cotizaciones/lista-cotizaciones.component';
import { SolicitudesRealizadasComponent } from './modulos-compra/solicitudes-realizadas/solicitudes-realizadas.component';
import { RaspaListoComponent } from './modulos-raspita/raspa-listo/raspa-listo.component';
import { MotivoSolicitudComponent } from './modulos-recepcion-datos/motivo-solicitud/motivo-solicitud.component';
import { AgregarMotivoSolicitudComponent } from './modulos-recepcion-datos/motivo-solicitud/agregar-motivo-solicitud/agregar-motivo-solicitud.component';
import { ModificarMotivoSolicitudComponent } from './modulos-recepcion-datos/motivo-solicitud/modificar-motivo-solicitud/modificar-motivo-solicitud.component';
import { TipoServicioComponent } from './modulos-recepcion-datos/tipo-servicio/tipo-servicio.component';
import { AgregarTipoServicioComponent } from './modulos-recepcion-datos/tipo-servicio/agregar-tipo-servicio/agregar-tipo-servicio.component';
import { ModificarTipoServicioComponent } from './modulos-recepcion-datos/tipo-servicio/modificar-tipo-servicio/modificar-tipo-servicio.component';
import { AgregarSolicitudScComponent } from './modulos-recepcion-datos/solicitudes-sc/agregar-solicitud-sc/agregar-solicitud-sc.component';
import { EscalaSolicitudesComponent } from './modulos-recepcion-datos/escala-solicitudes/escala-solicitudes.component';
import { AgregarEscalaSolicitudesComponent } from './modulos-recepcion-datos/escala-solicitudes/agregar-escala-solicitudes/agregar-escala-solicitudes.component';
import { ModificarEscalaSolicitudesComponent } from './modulos-recepcion-datos/escala-solicitudes/modificar-escala-solicitudes/modificar-escala-solicitudes.component';
import { HistorialSolicitudesComponent } from './modulos-recepcion-datos/historial-solicitudes/historial-solicitudes.component';
import { AsignacionUsuarioPqrComponent } from './modulos-recepcion-datos/asignacion-usuario-pqr/asignacion-usuario-pqr.component';
import { AgregarAsignacionUsuarioPqrComponent } from './modulos-recepcion-datos/asignacion-usuario-pqr/agregar-asignacion-usuario-pqr/agregar-asignacion-usuario-pqr.component';
import { ModificarAsignacionUsuarioPqrComponent } from './modulos-recepcion-datos/asignacion-usuario-pqr/modificar-asignacion-usuario-pqr/modificar-asignacion-usuario-pqr.component';
import { AreaComponent } from './modulos-recepcion-datos/area/area.component';
import { SedesComponent } from './modulos-registro-ingreso/sedes/sedes.component';
import { RegistroIngresoComponent } from './modulos-registro-ingreso/registro-ingreso/registro-ingreso.component';
import { ReporteIngresoComponent } from './modulos-registro-ingreso/reporte-ingreso/reporte-ingreso.component';
import { TipoActivoComponent } from './modulos-inventarios/detalle-articulo/tipo-activo/tipo-activo.component';
import { TipoProcesoComponent } from './modulos-inventarios/tipo-proceso/tipo-proceso.component';
import { DetalleArticuloComponent } from './modulos-inventarios/detalle-articulo/detalle-articulo.component';
import { AsignarProcesoUsuarioComponent } from './modulos-inventarios/asignar-proceso-usuario/asignar-proceso-usuario.component';
import { AsignarArticulosUsuarioComponent } from './modulos-inventarios/asignar-articulos-usuario/asignar-articulos-usuario.component';
import { AsignarPuntoVentaArticuloComponent } from './modulos-inventarios/asignar-punto-venta-articulo/asignar-punto-venta-articulo.component';
import { MisArticulosAsignadosComponent } from './modulos-inventarios/mis-articulos-asignados/mis-articulos-asignados.component';
import { ModificarArticulosComponent } from './modulos-compra/articulos/modificar-articulos/modificar-articulos.component';
import { FirmasComponent } from './modulos-compra/firmas/firmas.component';
import { ReporteInventarioComponent } from './modulos-inventarios/reporte-inventario/reporte-inventario.component';
import { ListaAutorizacionesBajaArticulosComponent } from './modulos-inventarios/lista-autorizaciones-baja-articulos/lista-autorizaciones-baja-articulos.component';
import { ListaConfirmacionesBajaArticulosComponent } from './modulos-inventarios/lista-confirmaciones-baja-articulos/lista-confirmaciones-baja-articulos.component';
import { ListaActasBajasComponent } from './modulos-inventarios/lista-actas-bajas/lista-actas-bajas.component';
import { AgregarArticulosInventarioComponent } from './modulos-inventarios/agregar-articulos-inventario/agregar-articulos-inventario.component';
import { SolicitudArticulosBajaComponent } from './modulos-inventarios/solicitud-articulos-baja/solicitud-articulos-baja.component';
import { OpcionesSolicitudBajasComponent } from './modulos-inventarios/opciones-solicitud-bajas/opciones-solicitud-bajas.component';
import { ListaArticulosInventarioComponent } from './modulos-inventarios/lista-articulos-inventario/lista-articulos-inventario.component';
import { ListaSubprocesoComponent } from './modulos-matriz-necesidades/lista-subproceso/lista-subproceso.component';
import { TipoNecesidadesComponent } from './modulos-matriz-necesidades/tipo-necesidades/tipo-necesidades.component';
import { ListaMatricesNecesidadesComponent } from './modulos-matriz-necesidades/lista-matrices-necesidades/lista-matrices-necesidades.component';
import { ReporteMatrizNecesidadComponent } from './modulos-matriz-necesidades/reporte-matriz-necesidad/reporte-matriz-necesidad.component';
import { ListaRecordatoriosComponent } from './modulos-recordatorio/lista-recordatorios/lista-recordatorios.component';
import { ListaMediosRadiacionComponent } from './modulos-recepcion-datos/lista-medios-radiacion/lista-medios-radiacion.component';
import { ListasPeriodosEjecucionesComponent } from './modulos-matriz-necesidades/listas-periodos-ejecuciones/listas-periodos-ejecuciones.component';
import { ListaActivosBajasContabilidadComponent } from './modulos-inventarios/lista-activos-bajas-contabilidad/lista-activos-bajas-contabilidad.component';
import { JerarquiaCuentasComponent } from './modulos-presupuesto-contabilidad/jerarquia-cuentas/jerarquia-cuentas.component';
import { CuentasComponent } from './modulos-presupuesto-contabilidad/cuentas/cuentas.component';
import { AgregarLibroMayorComponent } from './modulos-presupuesto-contabilidad/libro-mayor/agregar-libro-mayor/agregar-libro-mayor.component';
import { PorcentajePresupuestoComponent } from './modulos-presupuesto-contabilidad/porcentaje-presupuesto/porcentaje-presupuesto.component';
import { AnalisisDetalladoContableComponent } from './modulos-presupuesto-contabilidad/analisis-detallado-contable/analisis-detallado-contable.component';
import { ConsolidadoGraficaComponent } from './modulos-presupuesto-contabilidad/consolidado-grafica/consolidado-grafica.component';
import { ColillaTerceroLoteriaComponent } from './modulos-raspita/colilla-tercero-loteria/colilla-tercero-loteria.component';
import { AuditoriaControlInternoComponent } from './modulos-inventarios/auditoria-control-interno/auditoria-control-interno.component';
import { ReporteAuditoriaActivoComponent } from './modulos-inventarios/auditoria-control-interno/reporte-auditoria-activo/reporte-auditoria-activo.component';
import { SolicitudAutorizacionPremiosComponent } from './modulos-autorizacion-premios/solicitud-autorizacion-premios/solicitud-autorizacion-premios.component';
import { ListaSolicitudesAutorizacionPremiosComponent } from './modulos-autorizacion-premios/lista-solicitudes-autorizacion-premios/lista-solicitudes-autorizacion-premios.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'inicio',
        component: InicioGeneralComponent,
        canActivate: [AutorizacionGuard]

      },
      // Apartado de modulos
      {
        path: 'modulo',
        component: ModuloComponent,
        canActivate: [AutorizacionGuard]
      },
      // #Apartado Rol
      {
        path: 'roles',
        component: RolComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarRol/:id',
        component: ModificarRolComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'visualizarAccessos/:id',
        component: AccesosComponent
      },
      // Apartado de tipo turnos
      {
        path: 'tipoTurnos',
        component: TipoTurnoComponent,
        canActivate: [AutorizacionGuard]
      },
      // Apartado de turnos
      {
        path: 'turnos',
        component: TurnosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarTurno',
        component: AgregarTurnosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarTurno/:id',
        component: ModificarTurnosComponent,
        canActivate: [AutorizacionGuard]
      },
      // Apartado Tipo Documento
      {
        path: 'tipoDocumento',
        component: TipoDocumentoComponent,
        canActivate: [AutorizacionGuard]
      },
      // Apartado visualizar Estados por modulo
      {
        path: 'visualizarEstados/:id',
        component: ListaEstadosComponent,
        canActivate: [AutorizacionGuard]
      },
      // Apartado usuarios
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarUsuario',
        component: AgregarUsuariosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarUsuario/:id',
        component: ModificarUsuariosComponent,
        canActivate: [AutorizacionGuard]
      },
      //Apartado de asignar turno
      {
        path: 'asignarTurno',
        component: AsignarTurnoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarAsignarTurno',
        component: AgregarAsignarTurnoComponent,
        canActivate: [AutorizacionGuard]
      },
      // Apartado de asignar turno Vendedor
      {
        path: 'asignarTurnoVendedor',
        component: AsignarTurnoVendedorComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarTurnoVendedor',
        component: AgregarAsignarTurnoVendedorComponent,
        canActivate: [AutorizacionGuard]
      },
      //Modificar Datos de Usuario
      {
        path: 'modificarDatos',
        component: ModificarDatosComponent,
        canActivate: [AutorizacionGuard]
      },
      // //apartado de novedades
      {
        path: 'novedades',
        component: NovedadesComponent,
        canActivate: [AutorizacionGuard]
      },
      // Apartado de tipo Novedades
      {
        path: 'tipoNovedades',
        component: TipoNovedadesComponent,
        canActivate: [AutorizacionGuard]
      },
      //Jerarquía
      {
        path: 'jerarquia',
        component: JerarquiaComponent,
        canActivate: [AutorizacionGuard]
      },
      // //Mallas
      {
        path: 'mallas',
        component: MallasComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'mallasCierre',
        component: MallasCierreComponent,
        canActivate: [AutorizacionGuard]
      },
      //Apartado de Visita
      {
        path: 'elementosVisita',
        component: ElementosVisitaComponent,
        canActivate: [AutorizacionGuard]
      },
      //Agregar Elemento Visita
      {
        path: 'AgregarElementoVisita',
        component: AgregarElementosVisitaComponent,
        canActivate: [AutorizacionGuard]
      },
      //Modificar Elemento Visita
      {
        path: 'ModificarElementoVisita',
        component: ModificarElementosVisitaComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'opcionesVisita',
        component: OpcionesVisitaComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'visitaDetalle',
        component: VisitaDetalleComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'sidebarMovil',
        component: SideMovilComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'reportesVisitaDetalle',
        component: ReportesVisitaDetalleComponent,
        canActivate: [AutorizacionGuard]
      },
      //Confiracion de cambios
      {
        path: 'configuraciones',
        component: TablaConfiguracionComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarConfiguracion',
        component: AgregarConfiguracionComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarConfiguraciones/:id',
        component: ModificarTablaConfiguracionComponent,
        canActivate: [AutorizacionGuard]
      },
      //Aprobacion
      {
        path: 'aprobacion',
        component: TablaAprobacionComponent,
        canActivate: [AutorizacionGuard]
      },
      // Apartado de compras
      {
        path: 'articulos',
        component: ArticulosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarArticulos',
        component: AgregarArticulosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'solicitud',
        component: ListaSolicitudesComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'categoria',
        component: CategoriasArticuloComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'generarSolicitud',
        component: GenerarSolicitudComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'solicitudesRealizadas',
        component: SolicitudesRealizadasComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'comentariosSolicitud',
        component: ComentariosSolicitudComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'proceso',
        component: ListaProcesoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'firmas',
        component: FirmasComponent,
        canActivate: [AutorizacionGuard]
      },
      // Proveedores
      {
        path: 'proveedores',
        component: ProveedorComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarProveedor',
        component: AgregarProveedorComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarProveedor/:id',
        component: ModificarProveedorComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaCotizaciones',
        component: ListaCotizacionesComponent,
        canActivate: [AutorizacionGuard]
      },
      // Modulo Premios
      {
        path: 'raspalisto',
        component: RaspaListoComponent,
        canActivate: [AutorizacionGuard]
      },
      // Raspita
      {
        path: 'colillaTerceroLoteria',
        component: ColillaTerceroLoteriaComponent,
        canActivate: [AutorizacionGuard]
      },
      // Modulos de recepcion de datos
      //Tipo Solicitud
      {
        path: 'motivoSolicitud',
        component: MotivoSolicitudComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarMotivoSolicitud',
        component: AgregarMotivoSolicitudComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarMotivoSolicitud/:id',
        component: ModificarMotivoSolicitudComponent,
        canActivate: [AutorizacionGuard]
      },
      //Cliente de servicio al cliente
      {
        path: 'clientesSC',
        component: ClienteScComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarClienteSC',
        component: AgregarClienteScComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarClienteSC/:id',
        component: ModificarClienteScComponent,
        canActivate: [AutorizacionGuard]
      },
      //Solicitud
      {
        path: 'solicitudesSC',
        component: SolicitudesScComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarSolicitudesSC',
        component: AgregarSolicitudScComponent,
        canActivate: [AutorizacionGuard]
      },
      //Tipo Servicio
      {
        path: 'tipoServicio',
        component: TipoServicioComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarTipoServicio',
        component: AgregarTipoServicioComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarTipoServicio/:id',
        component: ModificarTipoServicioComponent,
        canActivate: [AutorizacionGuard]
      },
      //Escala Solicitudes
      {
        path: 'escalaSolicitudes',
        component: EscalaSolicitudesComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarEscalaSolicitudes',
        component: AgregarEscalaSolicitudesComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarEscalaSolicitudes/:id',
        component: ModificarEscalaSolicitudesComponent,
        canActivate: [AutorizacionGuard]
      },
      // Venta Mensual
      {
        path: 'presupuestoVentaMensual',
        component: PresupuestoVentaMensualComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarPresupuestoVentaMensual',
        component: AgregarPresupuestoVentaMensualComponent,
        canActivate: [AutorizacionGuard]
      },
      //HIstorial de solicitudes
      {
        path: 'historialSolicitudes',
        component: HistorialSolicitudesComponent,
        canActivate: [AutorizacionGuard]
      },
      //Reporte
      {
        path: 'reporteAsesor',
        component: ReporteAsesorComponent,
        canActivate: [AutorizacionGuard]
      },
      //AsignacionUsuarioPqr
      {
        path: 'asignacionUsuariosPqr',
        component: AsignacionUsuarioPqrComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarUsuariosPqr',
        component: AgregarAsignacionUsuarioPqrComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarUsuariosPqr/:id',
        component: ModificarAsignacionUsuarioPqrComponent,
        canActivate: [AutorizacionGuard]
      },
      //Area
      {
        path: 'areaPQRS',
        component: AreaComponent,
        canActivate: [AutorizacionGuard]
      },
      //Registro Ingreso
      {
        path: 'sedes',
        component: SedesComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'registroIngreso',
        component: RegistroIngresoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'reporteIngreso',
        component: ReporteIngresoComponent,
        canActivate: [AutorizacionGuard]
      },
      //Inventario
      {
        path: 'tipoActivo',
        component: TipoActivoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'tipoProceso',
        component: TipoProcesoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'detalleArticulo',
        component: DetalleArticuloComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'modificarArticulo/:id',
        component: ModificarArticulosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'asignacionProceso',
        component: AsignarProcesoUsuarioComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'asignacionArticulo',
        component: AsignarArticulosUsuarioComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'asignacionPuntoVenta',
        component: AsignarPuntoVentaArticuloComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'misArticulos',
        component: MisArticulosAsignadosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'reporteInventario',
        component: ReporteInventarioComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaAutorizaciones',
        component: ListaAutorizacionesBajaArticulosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaConfirmaciones',
        component: ListaConfirmacionesBajaArticulosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaActasBajas',
        component: ListaActasBajasComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaActivosContabilidad',
        component: ListaActivosBajasContabilidadComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarArticulosInventario',
        component: AgregarArticulosInventarioComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'solicitudBajaArticulos',
        component: SolicitudArticulosBajaComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'opcionArticulosBaja',
        component: OpcionesSolicitudBajasComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaArticuloInventario',
        component: ListaArticulosInventarioComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'auditoriaActivos',
        component: AuditoriaControlInternoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'reporteAuditoriaActivos',
        component: ReporteAuditoriaActivoComponent,
        canActivate: [AutorizacionGuard]
      },
      //Matriz de Necesidades
      {
        path: 'subProceso',
        component: ListaSubprocesoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'tipoNecesidad',
        component: TipoNecesidadesComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'matrizNecesidad',
        component: MatrizNecesidadComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaMatricesNecesidades',
        component: ListaMatricesNecesidadesComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'reporteMatrizNecesidad',
        component: ReporteMatrizNecesidadComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'mediosRadicacion',
        component: ListaMediosRadiacionComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'recordatorio',
        component: ListaRecordatoriosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'periodoEjecucion',
        component: ListasPeriodosEjecucionesComponent,
        canActivate: [AutorizacionGuard]
      },
      //Modulo Presupuesto Contabilida
      {
        path: 'jerarquiaCuentas',
        component: JerarquiaCuentasComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'cuentas',
        component: CuentasComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'libroMayor',
        component: LibroMayorComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'cargarArchivo',
        component: AgregarLibroMayorComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'porcentajePresupuesto',
        component: PorcentajePresupuestoComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'agregarPorcentajePresupuesto',
        component: AgregarPorcentajePresupuestoContabilidadComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'analisisDetalladoContable',
        component: AnalisisDetalladoContableComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'consolidadoContabilidad',
        component: ConsolidadoGraficaComponent,
        canActivate: [AutorizacionGuard]
      },
      //Modulo Autorizacion Premios
      {
        path: 'solicitudAutorizacionPremios',
        component: SolicitudAutorizacionPremiosComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'listaSolicitudesAutorizacionPremios',
        component: ListaSolicitudesAutorizacionPremiosComponent,
        canActivate: [AutorizacionGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VistaRoutingModule {
}
