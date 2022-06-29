import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModificarUsuariosComponent } from 'src/app/vista/modulos-administracion/usuarios/modificar-usuarios/modificar-usuarios.component';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {
  public formModificarUser!: FormGroup;
  public usuario : any = [];
  constructor(
    private servicioUsuario: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuario();
  }

  private crearFormulario() {
    this.formModificarUser = this.fb.group({
      id: [''],
      documentoUser: [null,Validators.required],
      nombreUser : [null,Validators.required],
      contrasenaUser: [null,Validators.required],
      correoUser : [null,Validators.required],
      apellidoUser : [null,Validators.required],
    });
  }

  public listarUsuario () {
    this.servicioUsuario.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.documento == Number(sessionStorage.getItem('usuario'))) {
          this.usuario = element;
          this.formModificarUser.patchValue({
            id: element.id,
            documentoUser: element.documento,
            nombreUser: element.nombre,
            contrasenaUser: element.password,
            correoUser: element.correo,
            apellidoUser: element.apellido,
          });
        }

      })
    })
  }

  public guardar(){
    let usuario: Usuario = new Usuario();
    const documento = Number(sessionStorage.getItem('usuario'))
    this.servicioUsuario.listarTodos().subscribe(res => {
      res.forEach(element => {
         if(element.documento == documento){
            usuario.id = element.id;
            usuario.documento = element.documento;
            usuario.nombre = element.nombre;
            usuario.apellido = element.apellido;
            usuario.correo = element.correo;
            usuario.password = element.password;
            usuario.idEstado = element.idEstado;
            usuario.idRol = element.idRol;
            usuario.idTipoDocumento = element.idTipoDocumento;
            const nombre = this.formModificarUser.value.nombreUser;
            const password = this.formModificarUser.value.contrasenaUser;
            const correo = this.formModificarUser.value.correoUser;
            const apellido = this.formModificarUser.value.apellidoUser;
            if(nombre != "" && apellido != "" && correo != "" && password != ""){
              Swal.fire({
                title: '¿Está seguro de modificar los datos?',
                text: "¡Si no lo está puede cancelar la acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, modificar!'
              }).then((result) => {
                if (result.value) {
                  usuario.nombre = nombre;
                  usuario.password = password;
                  usuario.correo = correo;
                  usuario.apellido = apellido;
                  this.servicioUsuario.actualizar(usuario).subscribe(res => {
                    Swal.fire(
                      'Modificado!',
                      'Los datos se modificaron correctamente.',
                      'success'
                    )
                    this.router.navigate(['/vista']);
                  })
                }
              }
              )
            }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Debe completar todos los campos!',
                showConfirmButton: false,
                timer: 1500
              })
            }

         }
      });
    })
  }


}
