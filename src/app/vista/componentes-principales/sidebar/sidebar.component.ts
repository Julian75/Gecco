import { ModuloService } from 'src/app/servicios/modulo.service';
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
  public listaModulos: any = [];
  public acceso: any;

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioAcceso: AccesoService,
    private servicioModulo: ModuloService,
  ) { }

  ngOnInit(): void {
    this.listarAccesos()
    this.listarModulos()
  }

  public listarAccesos () {
    document.getElementById('Tipo Documento')?.setAttribute('style', 'display: none;')
    document.getElementById('Usuario')?.setAttribute('style', 'display: none;')
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
                for (let i = 0; i < this.listaModulos.length; i++) {
                  if (this.listaAcceso[i] = 'Usuario') {
                    document.getElementById('Usuario')?.setAttribute('style', 'display: block;')
                  }
                  if (this.listaAcceso[i] = 'Tipo Documento') {
                    document.getElementById('Tipo Documento')?.setAttribute('style', 'display: block;')
                  }
                }
              }
            });
          })
        }
      });
    })
  }

  public listarModulos () {
    this.servicioModulo.listarTodos().subscribe( res =>{
      res.forEach(element => {
        this.listaModulos.push(element.descripcion);
      });
      console.log(this.listaModulos)
    })
  }

}
