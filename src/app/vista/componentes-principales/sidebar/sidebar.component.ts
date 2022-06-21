import { AccesoService } from 'src/app/servicios/Acceso.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  panelOpenState = false;
  public idRol: any = [];
  public listaAcceso: any = [];
  public acceso: any;

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioAcceso: AccesoService,
  ) { }

  ngOnInit(): void {
    this.listarAccesos()
  }

  public listarAccesos () {
    this.servicioUsuario.listarTodos().subscribe( res =>{
      res.forEach(element => {
        if (element.documento == Number(sessionStorage.getItem('usuario'))) {
          this.idRol = element.idRol.id
          console.log(this.idRol)
          this.servicioAcceso.listarTodos().subscribe( res =>{
            res.forEach(element => {
              if (element.idRol = this.idRol) {
                this.listaAcceso.push(element.idModulo.descripcion)
                console.log(this.listaAcceso)
                for (let i = 0; i < this.listaAcceso.length; i++) {
                  if (this.listaAcceso[i] = 'Usuario') {
                    document.getElementById('Usuario')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Tipo Documento') {
                    document.getElementById('Tipo Documento')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Rol') {
                    document.getElementById('Rol')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Modulos') {
                    document.getElementById('Modulos')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Asignacion Turno') {
                    document.getElementById('Asignacion Turno')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Novedad') {
                    document.getElementById('Novedad')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Tipo Turno') {
                    document.getElementById('Tipo Turno')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Turnos') {
                    document.getElementById('Turnos')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Asignar Turno Vendedor') {
                    document.getElementById('Asignar Turno Vendedor')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Jerarquia') {
                    document.getElementById('Jerarquia')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Tipo Novedades') {
                    document.getElementById('Tipo Novedades')?.setAttribute('style', 'display: block;')
                  }
                }
              }
            });
          })
        }
      });
    })
  }

}
