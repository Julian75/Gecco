import { RouterModule } from '@angular/router';
import { VistaModule } from './vista/vista.module';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './principal Estilos/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './principal Estilos/sidebar/sidebar.component';
import { InicioGeneralComponent } from './principal Estilos/inicio-general/inicio-general.component';
import { LoginComponent } from './formularios/formulariosPrincipales/login/login.component';
import { OlvidoContrasenaComponent } from './formularios/formulariosPrincipales/olvido-contrasena/olvido-contrasena.component';
import {DataTablesModule} from 'angular-datatables';
import { CambiarContrasenaComponent } from './formularios/formulariosPrincipales/cambiar-contrasena/cambiar-contrasena.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    InicioGeneralComponent,
    LoginComponent,
    OlvidoContrasenaComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    DataTablesModule,
    RouterModule,
    VistaModule,
  ],
  exports: [
    DataTablesModule,
    RouterModule,
    SidebarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
