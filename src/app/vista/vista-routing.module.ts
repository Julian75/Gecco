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

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'inicio',
        component: InicioGeneralComponent
      },
      // Apartado de modulos
      {
        path: 'modulo',
        component: ModuloComponent
      },
      // #Apartado Rol
      {
        path: 'roles',
        component: RolComponent
      },
      {
        path: 'modificarRol/:id',
        component: ModificarRolComponent
      },
      {
        path: 'visualizarAccessos/:id',
        component: AccesosComponent
      },
      // Apartado de tipo turnos
      {
        path: 'tipoTurnos',
        component: TipoTurnoComponent
      },
      // Apartado de turnos
      {
        path: 'turnos',
        component: TurnosComponent
      },
      {
        path: 'agregarTurno',
        component: AgregarTurnosComponent
      },
      {
        path: 'modificarTurno/:id',
        component: ModificarTurnosComponent
      },
      // Apartado Tipo Documento
      {
        path: 'tipoDocumento',
        component: TipoDocumentoComponent
      },
      // Apartado visualizar Estados por modulo
      {
        path: 'visualizarEstados/:id',
        component: ListaEstadosComponent
      },
      // Apartado usuarios
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'agregarUsuario',
        component: AgregarUsuariosComponent
      },
      {
        path: 'modificarUsuario/:id',
        component: ModificarUsuariosComponent
      },
      //Apartado de asignar turno
      {
        path: 'asignarTurno',
        component: AsignarTurnoComponent
      },
      {
        path: 'agregarAsignarTurno',
        component: AgregarAsignarTurnoComponent
      },
      {
        path: 'modificarAsignarTurno/:id',
        component: ModificarAsignarTurnoComponent
      },
      // Apartado de asignar turno Vendedor
      {
        path: 'asignarTurnoVendedor',
        component: AsignarTurnoVendedorComponent
      },
      {
        path: 'agregarTurnoVendedor',
        component: AgregarAsignarTurnoVendedorComponent
      },
      //Modificar Datos de Usuario
      {
        path: 'modificarDatos',
        component: ModificarDatosComponent
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
