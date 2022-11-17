import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario:any =[]
  public nombre:any = []
  public get = sessionStorage.getItem("id")
  constructor(
    private router: Router,
    private servicioUsuario: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.usuarioLogeado();
  }

  public usuarioLogeado(){
    this.servicioUsuario.listarTodos().subscribe(res => {
      const usuario = res.find((usuario:Usuario) => usuario.documento == Number(sessionStorage.getItem("usuario")));
      this.usuario = usuario.idRol.descripcion;
      this.nombre = usuario.nombre + " " + usuario.apellido;
    })
  }
  public salir(){
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('id');
    this.router.navigate(['/']);
  }


}
