import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from 'src/app/servicios/estado.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';

@Component({
  selector: 'app-agregar-asignar-turno',
  templateUrl: './agregar-asignar-turno.component.html',
  styleUrls: ['./agregar-asignar-turno.component.css']
})
export class AgregarAsignarTurnoComponent implements OnInit {

  public formAsignarTurno!: FormGroup;
  public listarEstado: any = [];
  public listaOficinas: any = [];
  public estadosDisponibles: any = [];
  // color = ('primary');
  constructor(
    private fb: FormBuilder,
    // public dialogRef: MatDialogRef<AgregarTipoTurnoComponent>,
    // private servicioTipoTurno: TipoTurnoService,
    private servicioEstado : EstadoService,
    private servicioOficina : OficinasService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
    this.listarOficinas();
  }
  private crearFormulario() {
    this.formAsignarTurno = this.fb.group({
      id: 0,
      estado: [null,Validators.required],
      sitioVenta: [null,Validators.required],
      turno: [null,Validators.required],
      oficina: [null,Validators.required],
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 6){
          this.estadosDisponibles.push(element)
          console.log(this.estadosDisponibles)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
      console.log(res)
  });}

  // public guardar() {
  //   let tipoTurno : TipoTurno = new TipoTurno();
  //   tipoTurno.descripcion=this.formTipoTurno.controls['descripcion'].value;
  //   const idEstado = this.formTipoTurno.controls['estado'].value;
  //   console.log(idEstado)
  //   this.servicioEstado.listarPorId(idEstado).subscribe(res => {
  //     this.listarEstado = res;
  //     tipoTurno.idEstado= this.listarEstado
  //     if(tipoTurno.descripcion==null || tipoTurno.descripcion=="" || tipoTurno.idEstado==null || tipoTurno.idEstado==undefined){
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'El campo esta vacio!',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }else{
  //       this.registrarTipoTurno(tipoTurno);
  //     }
  //   })

  // }

  // public registrarTipoTurno(tipoTurno: TipoTurno) {
  //   this.servicioTipoTurno.registrar(tipoTurno).subscribe(res=>{
  //     console.log(tipoTurno)
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Tipo Turno Registrado!',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     this.dialogRef.close();

  //   }, error => {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Hubo un error al agregar!',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   });
  // }


}
