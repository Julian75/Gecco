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
import { ModificarAsignarTurnoComponent } from './modulos-turnos/asignar-turno/modificar-asignar-turno/modificar-asignar-turno.component';
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
        component: AccesosComponent,
        canActivate: [AutorizacionGuard]
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
      {
        path: 'modificarAsignarTurno/:id',
        component: ModificarAsignarTurnoComponent,
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
      // //Modificar Jerarquía
      {
        path: 'mallas',
        component: MallasComponent,
        canActivate: [AutorizacionGuard]
      },
      //Apartado de Visita
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class VistaRoutingModule {
}
