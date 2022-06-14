import { EstadoService } from 'src/app/servicios/estado.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { RolService } from 'src/app/servicios/rol.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';

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
  // public listarTipoTurno: any = [];
  // public listarExiste: any = [];
  // public encontrado = false;
  // public hora = false;
  // color = ('primary');
  constructor(
    private fb: FormBuilder,
    // private servicioTurnos: TurnosService,
    private servicioEstado : EstadoService,
    private servicioTipoDocumento : TipoDocumentoService,
    private servicioRoles : RolService,
    // private servicioTipoTurno : TipoTurnoService,
    // private router: Router,
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
    usuario.documento = this.formUsuario.controls['documento'].value;
    const idEstado = this.formUsuario.controls['estado'].value;
    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      this.listaEstados = res;
      usuario.idEstado= this.listaEstados


    })
  }
  // if(tipoTurno.descripcion==null || tipoTurno.descripcion=="" || tipoTurno.idEstado==null || tipoTurno.idEstado==undefined){
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'error',
  //     title: 'El campo esta vacio!',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }else{
  //   this.registrarTipoTurno(tipoTurno);
  // }

  //   public registrarTurno(turno: Turnos) {
  //     this.servicioTurnos.registrar(turno).subscribe(res=>{
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Turno Registrado!',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       this.router.navigate(['/turnos']);

  //     }, error => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'Hubo un error al agregar!',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     });
  //  }

}
