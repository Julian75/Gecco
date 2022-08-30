import { Turnos } from 'src/app/modelos/turnos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { Usuario2 } from 'src/app/modelos/usuario2';
import { EstadoService } from 'src/app/servicios/estado.service';
import { RolService } from 'src/app/servicios/rol.service';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import * as CryptoJS from 'crypto-js';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-modificar-usuarios',
  templateUrl: './modificar-usuarios.component.html',
  styleUrls: ['./modificar-usuarios.component.css']
})
export class ModificarUsuariosComponent implements OnInit {

  public formUsuario!: FormGroup;
  public idUsuario : any;
  public listarUsuario : any = [];

  // Lista de relaciones foraneas
  public estadosDisponibles : any = [];
  public listaEstados: any = [];
  public listaTipoDocumentos: any = [];
  public listaRoles: any = [];
  public listaOficinas: any = [];

  public encontrado = false;
  public listarExiste: any = [];
  public contrasenaDesencru:any;

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
    private servicioTipoDocumento: TipoDocumentoService,
    private servicioRoles: RolService,
    private servicioOficinas: OficinasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaporidUsuario();
    this.listarEstados();
    this.listarTipoDocumentos();
    this.listarRoles();
    this.listarOficinas();
  }

  private crearFormulario() {
    this.formUsuario = this.fb.group({
      id: [''],
      nombre: [null,Validators.required],
      apellido: [null,Validators.required],
      correo: [null,Validators.required],
      documento: [null,Validators.required],
      estado: [null,Validators.required],
      rol: [null,Validators.required],
      tipoDocumento: [null,Validators.required],
      oficina: [null,Validators.required],
      contrasena: [null,Validators.required],
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

  public listaporidUsuario() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idUsuario = params.get('id');
      this.servicioUsuario.listarPorId(this.idUsuario).subscribe(res => {
        this.listarUsuario = res;
        this.formUsuario.controls['id'].setValue(this.listarUsuario.id);
        this.formUsuario.controls['nombre'].setValue(this.listarUsuario.nombre);
        this.formUsuario.controls['apellido'].setValue(this.listarUsuario.apellido);
        this.formUsuario.controls['correo'].setValue(this.listarUsuario.correo);
        this.formUsuario.controls['documento'].setValue(this.listarUsuario.documento);
        this.formUsuario.controls['estado'].setValue(this.listarUsuario.idEstado.id);
        this.formUsuario.controls['rol'].setValue(this.listarUsuario.idRol.id);
        this.formUsuario.controls['tipoDocumento'].setValue(this.listarUsuario.idTipoDocumento.id);
        this.formUsuario.controls['oficina'].setValue(this.listarUsuario.ideOficina);
        const contrasena = this.listarUsuario.password.toString()
        var bytes  = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
        var decryptedData = JSON.stringify(bytes.toString(CryptoJS.enc.Utf8));
        this.contrasenaDesencru = decryptedData.slice(1, -1)
        this.formUsuario.controls['contrasena'].setValue(this.contrasenaDesencru);

      })
    })
  }

  public guardar() {
    let usuario : Usuario2 = new Usuario2();
    this.route.paramMap.subscribe((params: ParamMap) => {
      usuario.id = Number(params.get('id'));
      this.servicioUsuario.listarPorId(usuario.id).subscribe(res=>{
        const listaUsuarios = res
        usuario.nombre = res.nombre
        usuario.apellido = res.apellido
        usuario.correo = res.correo
        usuario.documento = res.documento
        usuario.idEstado = res.idEstado.id
        usuario.idRol = res.idRol.id
        const contrasena = String(res.password)
        var bytes  = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
        var decryptedData = JSON.stringify(bytes.toString(CryptoJS.enc.Utf8));
        this.contrasenaDesencru = decryptedData.slice(1, -1)
        usuario.password = this.contrasenaDesencru
        usuario.idTipoDocumento = res.idTipoDocumento.id
        usuario.ideOficina = res.ideOficina
        usuario.ideSubzona = res.ideSubzona
        this.servicioUsuario.listarTodos().subscribe(res=>{
          const documento = this.formUsuario.controls['documento'].value;
          const correo = this.formUsuario.controls['correo'].value;
          const nombre = this.formUsuario.controls['nombre'].value;
          const apellido = this.formUsuario.controls['apellido'].value;
          const estado = this.formUsuario.controls['estado'].value;
          const rol = this.formUsuario.controls['rol'].value;
          const tipoDocumento = this.formUsuario.controls['tipoDocumento'].value;
          const oficina = this.formUsuario.controls['oficina'].value;
          const contrasenita = this.formUsuario.controls['contrasena'].value;
          if(this.formUsuario.valid){
            if(usuario.nombre == nombre && usuario.documento == documento && usuario.correo == correo && usuario.apellido == apellido && usuario.idEstado == estado && usuario.idRol == rol && usuario.idTipoDocumento == tipoDocumento && usuario.ideOficina == oficina && usuario.password == contrasenita){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'No hubieron cambios!',
                showConfirmButton: false,
                timer: 2000
              })
              this.router.navigate(['/usuarios']);
            }else{
              for (let i = 0; i < res.length; i++) {
                if(res[i].id != usuario.id && res[i].documento == documento ){
                  this.encontrado = true
                }else if(res[i].id != usuario.id && res[i].correo == correo){
                  this.encontrado = true
                }else{
                  this.encontrado = false
                }
                this.listarExiste.push(this.encontrado)
              }
              const existe = this.listarExiste.includes(true)
              if(existe == false){
                usuario.documento = this.formUsuario.controls['documento'].value;
                usuario.nombre = this.formUsuario.controls['nombre'].value;
                usuario.apellido = this.formUsuario.controls['apellido'].value;
                usuario.correo = this.formUsuario.controls['correo'].value;
                var contrasena = this.formUsuario.controls['contrasena'].value;
                var Encrypt = CryptoJS.AES.encrypt(contrasena, 'secret key 123');
                usuario.password = String(Encrypt)
                const idEstado = this.formUsuario.controls['estado'].value;
                this.servicioEstado.listarPorId(idEstado).subscribe(res => {
                  this.listaEstados = res;
                  usuario.idEstado= res.id
                  const idRol = this.formUsuario.controls['rol'].value;
                  this.servicioRoles.listarPorId(idRol).subscribe(res => {
                    this.listaRoles = res;
                    usuario.idRol= res.id
                    const idTipoDocumento = this.formUsuario.controls['tipoDocumento'].value;
                    this.servicioTipoDocumento.listarPorId(idTipoDocumento).subscribe(res => {
                      this.listaTipoDocumentos = res;
                      usuario.idTipoDocumento = res.id
                      const ideOficina = this.formUsuario.controls['oficina'].value;
                      this.servicioOficinas.listarPorId(ideOficina).subscribe(res => {
                        res.forEach(elementOficina => {
                          usuario.ideOficina = elementOficina.ideOficina
                          usuario.ideSubzona = elementOficina.ideSubzona
                          this.actualizarUsuario(usuario);
                        });
                      })
                    })
                  })
                })
              }
              if(existe == true){
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Ya existe un usuario con ese número de documento y/o correo!',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.router.navigate(['/usuarios']);
              }
            }
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Campos Vacios',
              showConfirmButton: false,
              timer: 2000
            })
          }

        })
      })
    })
  }

  public actualizarUsuario(usuario: Usuario2) {
    this.servicioModificar.actualizarUsuario(usuario).subscribe(res => {
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
        title: 'Error al modificar Usuario!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/usuarios']);
    });
 }

}
