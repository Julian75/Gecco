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
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent implements OnInit {
  public formUsuario!: FormGroup;
  public listaEstados: any = [];
  public listaTipoDocumentos: any = [];
  public listaOficinas: any = [];
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
    private servicioOficinas : OficinasService,
    private servicioRoles : RolService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoDocumentos();
    this.listarEstados();
    this.listarRoles();
    this.listarOficinas();
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
      oficina: [null,Validators.required],
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
    });
  }

  public listarTipoDocumentos() {
    this.servicioTipoDocumento.listarTodos().subscribe(res => {
      this.listaTipoDocumentos = res
    });
  }

  public listarRoles() {
    this.servicioRoles.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 7){
          this.listaRoles.push(element);
        }
      });
    });
  }

  public listarOficinas() {
    this.servicioOficinas.listarTodos().subscribe(res => {
      this.listaOficinas = res;
    });
  }

  public guardar() {
    this.listarExiste = []
    let usuario : Usuario = new Usuario();
    if(this.formUsuario.valid){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      const nombre = this.formUsuario.controls['nombre'].value;
      const apellido = this.formUsuario.controls['apellido'].value;
      const nombres = nombre.split(" ");
      const apellidos = apellido.split(" ");
      for (let i = 0; i < nombres.length; i++) {
        nombres[i] = nombres[i].charAt(0).toUpperCase() + nombres[i].substring(1).toLowerCase();
        usuario.nombre = nombres.join(" ");
      }
      for (let i = 0; i < apellidos.length; i++) {
        apellidos[i] = apellidos[i].charAt(0).toUpperCase() + apellidos[i].substring(1).toLowerCase();
        usuario.apellido = apellidos.join(" ");
      }
      usuario.correo = this.formUsuario.controls['correo'].value;
      usuario.ideOficina = Number(this.formUsuario.controls['oficina'].value);
      this.servicioOficinas.listarPorId(usuario.ideOficina).subscribe(resOficina=>{
        resOficina.forEach(elementOficina => {
          usuario.ideSubzona = elementOficina.ideSubzona
          const documento = this.formUsuario.controls['documento'].value;
          const correo = this.formUsuario.controls['correo'].value;
          this.servicioUsuarios.listarTodos().subscribe(res=>{
            for (let i = 0; i < res.length; i++) {
              if(res[i].documento == documento || res[i].correo == correo){
                this.encontrado = true
              }else{
                this.encontrado = false
              }
              this.listarExiste.push(this.encontrado)
            }
            const existe = this.listarExiste.includes(true)
            if(existe == false){
              usuario.documento = this.formUsuario.controls['documento'].value;
              var contrasena = this.formUsuario.controls['documento'].value;
              var Encrypt = CryptoJS.AES.encrypt(JSON.stringify(contrasena), 'secret key 123').toString();
              usuario.password = Encrypt
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
                      this.registrarUsuario(usuario);
                    }
                  })
                })

              })
            }
            if(existe == true){
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ya existe un usuario registrado con ese número de documento y/o correo!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        });

      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos Vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  public registrarUsuario(usuario: Usuario) {
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
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
