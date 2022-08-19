import { TipoTurno } from './../../../../modelos/tipoTurno';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoService } from './../../../../servicios/estado.service';
import { TipoTurnoService } from 'src/app/servicios/tipoTurno.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { TipoTurno2 } from 'src/app/modelos/modelos2/tipoTurno2';

@Component({
  selector: 'app-modificar-tipo-turno',
  templateUrl: './modificar-tipo-turno.component.html',
  styleUrls: ['./modificar-tipo-turno.component.css']
})
export class ModificarTipoTurnoComponent implements OnInit {
  public formTipoTurno!: FormGroup;
  public idTipoTurno : any;
  public listarTipoTurno : any = [];
  public listarEstado : any = [];
  public estadosDisponibles : any = [];
  public listaEstados: any = [];
  color = ('primary');
  constructor(
    private serviciotipoTurno: TipoTurnoService,
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarTipoTurnoComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidTipoTurno();
    this.listaEstado();
  }

  private crearFormulario() {
    this.formTipoTurno = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      estado: [null,Validators.required],
    });
  }

  public listaEstado() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 1){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  ;}

  public listarporidTipoTurno() {
    this.idTipoTurno = this.data;
    this.serviciotipoTurno.listarPorId(this.idTipoTurno).subscribe(res => {
      this.listarTipoTurno = res;
      this.formTipoTurno.controls['id'].setValue(this.listarTipoTurno.id);
      this.formTipoTurno.controls['descripcion'].setValue(this.listarTipoTurno.descripcion);
      this.formTipoTurno.controls['estado'].setValue(this.listarTipoTurno.idEstado.id);
    })
  }

  public guardar() {
    let tipoTurno : TipoTurno2 = new TipoTurno2();
    tipoTurno.id=Number(this.data);
    tipoTurno.descripcion=this.formTipoTurno.controls['descripcion'].value;
    const idEstado = this.formTipoTurno.controls['estado'].value;
    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      this.listarEstado = res.id;
      tipoTurno.idEstado= this.listarEstado

      if(tipoTurno.descripcion==null || tipoTurno.descripcion=="" || tipoTurno.idEstado==null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.actualizarRol(tipoTurno);
      }
    })
  }

  public actualizarRol(tipoTurno: TipoTurno2) {
    this.servicioModificar.actualizarTipoTurno(tipoTurno).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Turno modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
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
