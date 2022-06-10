import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContrasenaComponent } from './formularios/formulariosPrincipales/cambiar-contrasena/cambiar-contrasena.component';
import { LoginComponent } from './formularios/formulariosPrincipales/login/login.component';
import { OlvidoContrasenaComponent } from './formularios/formulariosPrincipales/olvido-contrasena/olvido-contrasena.component';
import { InicioGeneralComponent } from './principal Estilos/inicio-general/inicio-general.component';
import { SidebarComponent } from './principal Estilos/sidebar/sidebar.component';
import { UsuariosComponent } from './vista/director/componentes/usuarios/usuarios.component';
import { VistaComponent } from './vista/vista.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: UsuariosComponent
      }
    ]
  },
  {
    path: 'vista',
    component: VistaComponent,
    loadChildren:()=>import('./vista/vista.module').then(mod=>mod.VistaModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'olvidoContrasena',
    component: OlvidoContrasenaComponent
  },
  {
    path: 'cambiarContrasena',
    component: CambiarContrasenaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
