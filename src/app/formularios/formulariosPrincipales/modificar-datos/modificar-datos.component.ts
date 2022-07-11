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
  public formUsuario!: FormGroup;
  public listarUsuario : any = [];
  constructor(
    private servicioUsuario: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.crearFormulario();
    // this.listaporidUsuario();
    // this.listarEstados();
    // this.listarTipoDocumentos();
    // this.listarRoles();
    // this.listarOficinas();
  }

  // private crearFormulario() {
  //   this.formUsuario = this.fb.group({
  //     id: [''],
  //     documentoUser: [null,Validators.required],
  //     nombreUser : [null,Validators.required],
  //     contrasenaUser: [null,Validators.required],
  //     correoUser : [null,Validators.required],
  //     apellidoUser : [null,Validators.required],
  //   });
  // }

  // private crearFormulario() {
  //   this.formUsuario = this.fb.group({
  //     id: [''],
  //     nombre: [null,Validators.required],
  //     apellido: [null,Validators.required],
  //     correo: [null,Validators.required],
  //     documento: [null,Validators.required],
  //     estado: [null,Validators.required],
  //     rol: [null,Validators.required],
  //     tipoDocumento: [null,Validators.required],
  //     oficina: [null,Validators.required],
  //     contrasena: [null,Validators.required],
  //   });
  // }

  // public listarEstados() {
  //   this.servicioEstado.listarTodos().subscribe(res => {
  //     res.forEach(element => {
  //       if(element.idModulo.id == 5){
  //         this.estadosDisponibles.push(element)
  //       }
  //     });
  //     this.listaEstados = this.estadosDisponibles
  //   });
  // }

  // public listarTipoDocumentos() {
  //   this.servicioTipoDocumento.listarTodos().subscribe(res => {
  //     this.listaTipoDocumentos = res
  //   });
  // }

  // public listarRoles() {
  //   this.servicioRoles.listarTodos().subscribe(res => {
  //     this.listaRoles = res;
  //   });
  // }

  // public listarOficinas() {
  //   this.servicioOficinas.listarTodos().subscribe(res => {
  //     this.listaOficinas = res;
  //   });
  // }

  // public listaUsuario () {
  //     this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(res => {
  //       this.listarUsuario = res;
  //       this.formUsuario.controls['id'].setValue(this.listarUsuario.id);
  //       this.formUsuario.controls['nombre'].setValue(this.listarUsuario.nombre);
  //       this.formUsuario.controls['apellido'].setValue(this.listarUsuario.apellido);
  //       this.formUsuario.controls['correo'].setValue(this.listarUsuario.correo);
  //       this.formUsuario.controls['documento'].setValue(this.listarUsuario.documento);
  //       this.formUsuario.controls['estado'].setValue(this.listarUsuario.idEstado.id);
  //       this.formUsuario.controls['rol'].setValue(this.listarUsuario.idRol.id);
  //       this.formUsuario.controls['tipoDocumento'].setValue(this.listarUsuario.idTipoDocumento.id);
  //       this.formUsuario.controls['oficina'].setValue(this.listarUsuario.ideOficina);
  //       const contrasena = this.listarUsuario.password.toString()
  //       console.log(contrasena)
  //       var bytes  = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
  //       console.log(bytes)
  //       var decryptedData = JSON.stringify(bytes.toString(CryptoJS.enc.Utf8));
  //       console.log(decryptedData)
  //       this.contrasenaDesencru = decryptedData.slice(1, -1)
  //       console.log(this.contrasenaDesencru)
  //       this.formUsuario.controls['contrasena'].setValue(this.contrasenaDesencru);

  //     })
  // }

  // public guardar(){
  //   let usuario: Usuario = new Usuario();
  //   const documento = Number(sessionStorage.getItem('usuario'))
  //   this.servicioUsuario.listarTodos().subscribe(res => {
  //     res.forEach(element => {
  //        if(element.documento == documento){
  //           usuario.id = element.id;
  //           usuario.documento = element.documento;
  //           usuario.nombre = element.nombre;
  //           usuario.apellido = element.apellido;
  //           usuario.correo = element.correo;
  //           usuario.password = element.password;
  //           usuario.idEstado = element.idEstado;
  //           usuario.idRol = element.idRol;
  //           usuario.idTipoDocumento = element.idTipoDocumento;
  //           const nombre = this.formModificarUser.value.nombreUser;
  //           const password = this.formModificarUser.value.contrasenaUser;
  //           const correo = this.formModificarUser.value.correoUser;
  //           const apellido = this.formModificarUser.value.apellidoUser;
  //           if(nombre != "" && apellido != "" && correo != "" && password != ""){
  //             Swal.fire({
  //               title: '¿Está seguro de modificar los datos?',
  //               text: "¡Si no lo está puede cancelar la acción!",
  //               icon: 'warning',
  //               showCancelButton: true,
  //               confirmButtonColor: '#3085d6',
  //               cancelButtonColor: '#d33',
  //               confirmButtonText: 'Si, modificar!'
  //             }).then((result) => {
  //               if (result.value) {
  //                 usuario.nombre = nombre;
  //                 usuario.password = password;
  //                 usuario.correo = correo;
  //                 usuario.apellido = apellido;
  //                 this.servicioUsuario.actualizar(usuario).subscribe(res => {
  //                   Swal.fire(
  //                     'Modificado!',
  //                     'Los datos se modificaron correctamente.',
  //                     'success'
  //                   )
  //                   this.router.navigate(['/vista']);
  //                 })
  //               }
  //             }
  //             )
  //           }else{
  //             Swal.fire({
  //               position: 'center',
  //               icon: 'error',
  //               title: 'Debe completar todos los campos!',
  //               showConfirmButton: false,
  //               timer: 1500
  //             })
  //           }

  //        }
  //     });
  //   })
  // }


}
