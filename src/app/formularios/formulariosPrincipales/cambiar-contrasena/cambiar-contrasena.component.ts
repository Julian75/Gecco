import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  public formUsuario!: FormGroup;
  public listarUsuarios: any = [];

  constructor(
    private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formUsuario= this.fb.group({
      id: 0,
      documento: [null,Validators.required],
      contrasenaNueva: [null,Validators.required],
      confirmarContrasena: [null,Validators.required],
    });
  }

  public enviar() {
    this.servicioUsuario.listarTodos().subscribe( res => {
      const documento = Number(this.formUsuario.controls['documento'].value);
      const contrasenaNueva = this.formUsuario.controls['documento'].value;
      const confirmarContrasena = this.formUsuario.controls['documento'].value;
      for (let i = 0; i < res.length; i++) {
        if (res[i].documento == documento) {
          this.listarUsuarios.push(res[i]);

        }
      }
      let usuario : Usuario = new Usuario();
      usuario.id = this.listarUsuarios.id
      this.servicioUsuario.listarPorId(usuario.id).subscribe(res=>{
        if (contrasenaNueva == confirmarContrasena) {
          usuario.apellido = res.apellido;
          usuario.correo = res.correo;
          usuario.documento = res.documento;
          usuario.nombre = res.nombre;
          usuario.idEstado = res.idEstado;
          usuario.idRol = res.idRol;
          usuario.idTipoDocumento = res.idTipoDocumento;
          usuario.password = contrasenaNueva
          this.actualizarUsuario(usuario)
        }
      })


    })
  }

  public actualizarUsuario(usuario: Usuario) {
    this.servicioUsuario.actualizar(usuario).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/usuarios']);
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }
}
