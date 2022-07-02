import { Turnos } from 'src/app/modelos/turnos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { EstadoService } from 'src/app/servicios/estado.service';
import { RolService } from 'src/app/servicios/rol.service';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';

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

  constructor(
    private servicioUsuario: UsuarioService,
    private servicioEstado: EstadoService,
    private servicioTipoDocumento: TipoDocumentoService,
    private servicioRoles: RolService,
    private servicioOficinas : OficinasService,
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
      this.listaRoles = res;
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
      })
    })
  }

  public guardar() {
    let usuario : Usuario = new Usuario();
    this.route.paramMap.subscribe((params: ParamMap) => {
      usuario.id = Number(params.get('id'));
      this.servicioUsuario.listarPorId(usuario.id).subscribe(res=>{
        const listaUsuarios = res
        usuario.nombre = listaUsuarios.nombre
        usuario.apellido = listaUsuarios.apellido
        usuario.correo = listaUsuarios.correo
        usuario.documento = listaUsuarios.documento
        usuario.idEstado = listaUsuarios.idEstado
        usuario.idRol = listaUsuarios.idRol
        usuario.password = listaUsuarios.password
        usuario.idTipoDocumento = listaUsuarios.idTipoDocumento
        usuario.ideOficina = listaUsuarios.ideOficina
        usuario.ideSubzona = listaUsuarios.ideSubzona
        this.servicioUsuario.listarTodos().subscribe(res=>{
          const documento = this.formUsuario.controls['documento'].value;
          const nombre = this.formUsuario.controls['nombre'].value;
          const apellido = this.formUsuario.controls['apellido'].value;
          const correo = this.formUsuario.controls['correo'].value;
          const estado = this.formUsuario.controls['estado'].value;
          const rol = this.formUsuario.controls['rol'].value;
          const tipoDocumento = this.formUsuario.controls['tipoDocumento'].value;
          const oficina = this.formUsuario.controls['oficina'].value;
          for (let i = 0; i < res.length; i++) {
            if(res[i].documento == documento && listaUsuarios.nombre == nombre && listaUsuarios.apellido == apellido && listaUsuarios.correo == correo && listaUsuarios.idEstado.id == estado && listaUsuarios.idRol.id == rol && listaUsuarios.idTipoDocumento.id == tipoDocumento && listaUsuarios.ideOficina == oficina ){
              this.encontrado = true
            }else if(nombre=="" || documento==null || apellido=="" || correo=="" || estado==undefined || estado==null || rol==undefined || rol==null || tipoDocumento==null || tipoDocumento==undefined|| oficina==null || oficina==undefined){
              this.encontrado = true
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Algunos campos estan vacios!',
                showConfirmButton: false,
                timer: 1500
              })
              // this.router.navigate(['/usuarios']);
            }else{
              this.encontrado = false
            }
            this.listarExiste.push(this.encontrado)
          }
          const existe = this.listarExiste.includes(true)
          if(existe == false ){
            usuario.documento = this.formUsuario.controls['documento'].value;
            usuario.nombre = this.formUsuario.controls['nombre'].value;
            usuario.apellido = this.formUsuario.controls['apellido'].value;
            usuario.correo = this.formUsuario.controls['correo'].value;
            const idEstado = this.formUsuario.controls['estado'].value;
            this.servicioEstado.listarPorId(idEstado).subscribe(res => {
              this.listaEstados = res;
              usuario.idEstado= this.listaEstados
              const idRol = this.formUsuario.controls['rol'].value;
              this.servicioRoles.listarPorId(idRol).subscribe(res => {
                this.listaRoles = res;
                usuario.idRol= this.listaRoles
                const idTipoDocumento = this.formUsuario.controls['tipoDocumento'].value;
                this.servicioTipoDocumento.listarPorId(idTipoDocumento).subscribe(res => {
                  this.listaTipoDocumentos = res;
                  usuario.idTipoDocumento = this.listaTipoDocumentos
                  const ideOficina = this.formUsuario.controls['oficina'].value;
                  this.servicioOficinas.listarPorId(ideOficina).subscribe(res => {
                    res.forEach(elementOficina => {
                      usuario.ideOficina = elementOficina.ideOficina
                      usuario.ideSubzona = elementOficina.ideSubzona
                      if(usuario.nombre,usuario.apellido,usuario.correo,usuario.documento==null || usuario.nombre,usuario.apellido,usuario.correo=="" || usuario.idEstado,usuario.idRol,usuario.idTipoDocumento, usuario.ideOficina==undefined || usuario.idEstado,usuario.idRol,usuario.idTipoDocumento,usuario.ideOficina==null){
                        Swal.fire({
                          position: 'center',
                          icon: 'error',
                          title: 'El campo esta vacio!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }else{
                        this.actualizarUsuario(usuario);
                      }
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
              title: 'No hubieron cambios o ya existe un usuario con ese número de documento!',
              showConfirmButton: false,
              timer: 2000
            })
            this.router.navigate(['/usuarios']);
          }

        })
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
