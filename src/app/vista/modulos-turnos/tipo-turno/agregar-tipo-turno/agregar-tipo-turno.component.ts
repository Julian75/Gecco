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
      res.forEach(element => {
        if(element.idModulo.id == 1){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
  });}

  validar: boolean = false
  listaValidar: any = []
  public guardar() {
    this.listaValidar = []
    if(this.formTipoTurno.controls['descripcion'].value == null || this.formTipoTurno.controls['estado'].value == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
      this.crearFormulario();
    }else{
      let tipoTurno : TipoTurno = new TipoTurno();
      tipoTurno.descripcion = this.formTipoTurno.controls['descripcion'].value;
      const idEstado = this.formTipoTurno.controls['estado'].value;
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        this.listarEstado = res;
        tipoTurno.idEstado= this.listarEstado
        this.servicioTipoTurno.listarTodos().subscribe(resTipoTurnos=>{
          resTipoTurnos.forEach(element => {
            if(element.descripcion.toLowerCase() == tipoTurno.descripcion.toLowerCase()){
              this.validar = true
            }else{ this.validar = false }
            this.listaValidar.push(this.validar)
          });
          const existe = this.listaValidar.includes(true)
          if(existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Este Tipo Turno ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
            this.crearFormulario();
          }else{
            this.registrarTipoTurno(tipoTurno);
          }
        })
      })
    }

  }

  public registrarTipoTurno(tipoTurno: TipoTurno) {
    this.servicioTipoTurno.registrar(tipoTurno).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Turno Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
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
