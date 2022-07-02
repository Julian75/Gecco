import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContrasenaComponent } from './formularios/formulariosPrincipales/cambiar-contrasena/cambiar-contrasena.component';
import { LoginComponent } from './formularios/formulariosPrincipales/login/login.component';
import { OlvidoContrasenaComponent } from './formularios/formulariosPrincipales/olvido-contrasena/olvido-contrasena.component';
import { VistaComponent } from './vista/vista.component';
import { SidebarComponent } from './vista/componentes-principales/sidebar/sidebar.component';
import { InicioGeneralComponent } from './vista/componentes-principales/inicio-general/inicio-general.component';
import { AuthenticationGuardGuard } from './guards/authentication-guard.guard';
import { ErrorComponent } from './vista/error/error.component';
import { AutorizacionGuard } from './guards/autorizacion.guard';

const routes: Routes = [
  {
    path: 'vista',
    component: SidebarComponent,
    children: [
      {
        path: '',
        component: InicioGeneralComponent,
        canActivate: [AutorizacionGuard]
      },
      {
        path: 'vista',
        component: VistaComponent,
        loadChildren:()=>import('./vista/vista.module').then(mod=>mod.VistaModule)
      }
    ]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthenticationGuardGuard]
  },
  {
    path: 'olvidoContrasena',
    component: OlvidoContrasenaComponent,
    canActivate: [AuthenticationGuardGuard]
  },
  {
    path: 'cambiarContrasena',
    component: CambiarContrasenaComponent,
    canActivate: [AuthenticationGuardGuard]
  },
  // {
  //   path: '**',
  //   component: ErrorComponent,
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
