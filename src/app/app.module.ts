import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaComponent } from './vista/vista.component';
import { DirectorComponent } from './vista/director/director.component';
import { LiderComercialComponent } from './vista/lider-comercial/lider-comercial.component';
import { TalentoHumanoComponent } from './vista/talento-humano/talento-humano.component';
import { NavbarComponent } from './principal Estilos/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './principal Estilos/sidebar/sidebar.component';
import { InicioGeneralComponent } from './principal Estilos/inicio-general/inicio-general.component';
import { LoginComponent } from './formularios/formulariosPrincipales/login/login.component';
import { OlvidoContrasenaComponent } from './formularios/formulariosPrincipales/olvido-contrasena/olvido-contrasena.component';
import { CambiarContrasenaComponent } from './formularios/formulariosPrincipales/cambiar-contrasena/cambiar-contrasena.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaComponent,
    DirectorComponent,
    LiderComercialComponent,
    TalentoHumanoComponent,
    NavbarComponent,
    SidebarComponent,
    InicioGeneralComponent,
    LoginComponent,
    OlvidoContrasenaComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
