import { EstadoService } from 'src/app/servicios/estado.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { RolService } from 'src/app/servicios/rol.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent implements OnInit {
  public formUsuario!: FormGroup;
  public listaEstados: any = [];
  public listaTipoDocumentos: any = [];
  public listaRoles: any = [];
  public estadosDisponibles: any = [];
  public listarExiste:any =[]
  color = ('primary');
  public encontrado = false;
  public key: string = "contra123"
  public encriptacion: any;
  public desencriptado: any;

  constructor(
    private fb: FormBuilder,
    private servicioUsuarios: UsuarioService,
    private servicioEstado : EstadoService,
    private servicioTipoDocumento : TipoDocumentoService,
    private servicioRoles : RolService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoDocumentos();
    this.listarEstados();
    this.listarRoles();
  }

  private crearFormulario() {
    this.formUsuario = this.fb.group({
      id: 0,
      nombre: [null,Validators.required],
      apellido: [null,Validators.required],
      correo: [null,Validators.required],
      documento: [null,Validators.required],
      estado: [null,Validators.required],
      rol: [null,Validators.required],
      tipoDocumento: [null,Validators.required],
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 5){
          this.estadosDisponibles.push(element)
        }
      });
      this.listaEstados = this.estadosDisponibles
      console.log(this.listaEstados)
    });
  }

  public listarTipoDocumentos() {
    this.servicioTipoDocumento.listarTodos().subscribe(res => {
      this.listaTipoDocumentos = res
    });
  }

  public listarRoles() {
    this.servicioRoles.listarTodos().subscribe(res => {
      this.listaRoles = res;
    });
  }

  public guardar() {
    let usuario : Usuario = new Usuario();
    usuario.nombre = this.formUsuario.controls['nombre'].value;
    usuario.apellido = this.formUsuario.controls['apellido'].value;
    usuario.correo = this.formUsuario.controls['correo'].value;
    const documento = this.formUsuario.controls['documento'].value;
    this.servicioUsuarios.listarTodos().subscribe(res=>{
      for (let i = 0; i < res.length; i++) {
        if(res[i].documento == documento){
          this.encontrado = true
        }else{
          this.encontrado = false
        }
        this.listarExiste.push(this.encontrado)
      }
      const existe = this.listarExiste.includes(true)
      console.log(existe)
      if(existe == false ){
        usuario.documento = this.formUsuario.controls['documento'].value;
        var contrasena = this.formUsuario.controls['documento'].value;
        // let _key = CryptoJS.enc.Utf8.parse(this.key);
        // var get = JSON.stringify(_key)
        // var get2 = JSON.parse(get)
        // let contrasena2 = CryptoJS.AES.encrypt(
        //   JSON.stringify(contrasena), _key, {
        //     keySize: 16,
        //     iv: _key,
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        //   });
        // this.encriptacion = contrasena2.toString();
        // console.log(this.encriptacion)
        // this.desencriptado = CryptoJS.AES.decrypt(
        //   this.encriptacion, _key, {
        //     keySize: 16,
        //     iv: _key,
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        //   }).toString(CryptoJS.enc.Utf8);
        //   console.log(this.desencriptado)
        usuario.password = contrasena;
        const idEstado = this.formUsuario.controls['estado'].value;
        this.servicioEstado.listarPorId(idEstado).subscribe(res => {
          this.listaEstados = res;
          usuario.idEstado= this.listaEstados
          const idTipoDocumento = this.formUsuario.controls['tipoDocumento'].value;
          this.servicioTipoDocumento.listarPorId(idTipoDocumento).subscribe(res => {
            this.listaTipoDocumentos = res;
            usuario.idTipoDocumento= this.listaTipoDocumentos
            const idRol = this.formUsuario.controls['rol'].value;
            this.servicioRoles.listarPorId(idRol).subscribe(res => {
              this.listaRoles = res;
              usuario.idRol= this.listaRoles
              if(usuario.nombre==null || usuario.apellido==null || usuario.correo==null || usuario.documento<=0 || usuario.nombre=="" || usuario.apellido=="" || usuario.correo=="" || usuario.idEstado.id==null || usuario.idRol.id==null || usuario.idTipoDocumento.id==null || usuario.idEstado==undefined || usuario.idRol==undefined || usuario.idTipoDocumento==undefined){
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El campo esta vacio!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                console.log(usuario.documento)
                this.registrarUsuario(usuario);
              }
            })
          })

        })
      }
      if(existe == true){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ya existe un usuario registrado con ese número de documento!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }


    public registrarUsuario(usuario: Usuario) {
      this.servicioUsuarios.registrar(usuario).subscribe(res=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Registrado!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/usuarios']);

      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un error al agregar!',
          showConfirmButton: false,
          timer: 1500
        })
      });
   }

}
