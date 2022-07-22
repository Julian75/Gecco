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
import { ModificarAccesosComponent } from './modulos-administracion/accesos/modificar-accesos/modificar-accesos.component';
import { HttpClientModule } from '@angular/common/http';
import { AsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/asignar-turno-vendedor.component';
import { AgregarAsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/agregar-asignar-turno-vendedor/agregar-asignar-turno-vendedor.component';
import { ModificarAsignarTurnoVendedorComponent } from './modulos-turnos/asignar-turno-vendedor/modificar-asignar-turno-vendedor/modificar-asignar-turno-vendedor.component';
import { AsignarTurnoComponent } from './modulos-turnos/asignar-turno/asignar-turno.component';
import { AgregarAsignarTurnoComponent } from './modulos-turnos/asignar-turno/agregar-asignar-turno/agregar-asignar-turno.component';
import { ModificarAsignarTurnoComponent } from './modulos-turnos/asignar-turno/modificar-asignar-turno/modificar-asignar-turno.component';
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
import { RechazoCotizacionComponent } from './modulos-compra/lista-cotizaciones/rechazo-cotizacion/rechazo-cotizacion.component';

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
    ModificarAccesosComponent,
    AsignarTurnoVendedorComponent,
    AgregarAsignarTurnoVendedorComponent,
    ModificarAsignarTurnoVendedorComponent,
    AsignarTurnoComponent,
    AgregarAsignarTurnoComponent,
    ModificarAsignarTurnoComponent,
    AccesosComponent,
    ModificarAccesosComponent,
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
    RechazoCotizacionComponent,
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
    BrowserAnimationsModule
  ],
  exports: [
    DataTablesModule,
    RouterModule,
    HttpClientModule
  ],
})
export class VistaModule { }
