import { TipoTurno } from './../../../../modelos/tipoTurno';
import { EstadoService } from './../../../../servicios/estado.service';
import { TipoTurnoService } from './../../../../servicios/tipoTurno.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-turno',
  templateUrl: './agregar-tipo-turno.component.html',
  styleUrls: ['./agregar-tipo-turno.component.css']
})
export class AgregarTipoTurnoComponent implements OnInit {
  public formTipoTurno!: FormGroup;
  public listarEstado: any = [];
  public estadosDisponibles: any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarTipoTurnoComponent>,
    private servicioTipoTurno: TipoTurnoService,
    private servicioEstado : EstadoService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
  }
  private crearFormulario() {
    this.formTipoTurno = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      estado: [null,Validators.required],
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      // this.listarEstado = res;
      res.forEach(element => {
        if(element.idModulo.id == 1){
          this.estadosDisponibles.push(element)
          console.log(this.estadosDisponibles)
        }
      });
      this.listarEstado = this.estadosDisponibles
  });}

  public guardar() {
    let tipoTurno : TipoTurno = new TipoTurno();
    tipoTurno.descripcion=this.formTipoTurno.controls['descripcion'].value;
    const idEstado = this.formTipoTurno.controls['estado'].value;
    console.log(idEstado)
    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      this.listarEstado = res;
      tipoTurno.idEstado= this.listarEstado
      if(tipoTurno.descripcion==null || tipoTurno.descripcion=="" || tipoTurno.idEstado==null || tipoTurno.idEstado==undefined){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.registrarTipoTurno(tipoTurno);
      }
    })

  }

  public registrarTipoTurno(tipoTurno: TipoTurno) {
    this.servicioTipoTurno.registrar(tipoTurno).subscribe(res=>{
      console.log(tipoTurno)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Turno Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();

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
