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
      const contrasenaNueva = this.formUsuario.controls['contrasenaNueva'].value;
      const confirmarContrasena = this.formUsuario.controls['confirmarContrasena'].value;
      res.forEach(element => {
        if(element.documento == documento){
          if(contrasenaNueva == confirmarContrasena){
            let usuario : Usuario = new Usuario();
            usuario.id = element.id;
            usuario.apellido = element.apellido;
            usuario.correo = element.correo;
            usuario.documento = element.documento;
            usuario.nombre = element.nombre;
            usuario.idEstado = element.idEstado;
            usuario.idRol = element.idRol;
            usuario.idTipoDocumento = element.idTipoDocumento;
            usuario.password = contrasenaNueva
            this.actualizarUsuario(usuario)
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Las contraseñas no son iguales!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      });
    })
  }

  public actualizarUsuario(usuario: Usuario) {
    this.servicioUsuario.actualizar(usuario).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contraseña modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/']);
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
