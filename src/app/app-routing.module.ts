import { UsuariosComponent } from './vista/modulos/usuarios/usuarios.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContrasenaComponent } from './formularios/formulariosPrincipales/cambiar-contrasena/cambiar-contrasena.component';
import { LoginComponent } from './formularios/formulariosPrincipales/login/login.component';
import { OlvidoContrasenaComponent } from './formularios/formulariosPrincipales/olvido-contrasena/olvido-contrasena.component';
import { VistaComponent } from './vista/vista.component';
import { SidebarComponent } from './vista/componentes-principales/sidebar/sidebar.component';
import { InicioGeneralComponent } from './vista/componentes-principales/inicio-general/inicio-general.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: InicioGeneralComponent
      },
      {
        path: 'vista',
        component: VistaComponent,
        loadChildren:()=>import('./vista/vista.module').then(mod=>mod.VistaModule)
      }
    ]
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
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
