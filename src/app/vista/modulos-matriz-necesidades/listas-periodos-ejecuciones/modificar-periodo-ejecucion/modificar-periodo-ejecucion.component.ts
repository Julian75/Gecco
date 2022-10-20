import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { PeriodoEjecucionService } from 'src/app/servicios/periodoEjecucion.service';

@Component({
  selector: 'app-modificar-periodo-ejecucion',
  templateUrl: './modificar-periodo-ejecucion.component.html',
  styleUrls: ['./modificar-periodo-ejecucion.component.css']
})
export class ModificarPeriodoEjecucionComponent implements OnInit {
  public formPeriodoEjecucion!: FormGroup;
  public listaProceso: any = [];
  public validar:any = [];
  public validarTodo: any = [];
  color = ('primary');

  constructor(
    private serviceModificar: ModificarService,
    private servicePeriodoEjecucion: PeriodoEjecucionService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarPorPeriodoEjecucion();
  }

  private crearFormulario() {
    this.formPeriodoEjecucion = this.formBuilder.group({
      id: [this.data],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  public listarPorPeriodoEjecucion(){
    this.servicePeriodoEjecucion.listarPorId(Number(this.data)).subscribe( periodoEjecucion => {
      this.formPeriodoEjecucion.patchValue({
        descripcion: periodoEjecucion.descripcion,
        cantidad: periodoEjecucion.cantidad,
      });
    })
  }

  validar2: any = [];
  public guardar(){
    this.validar = []
    this.validarTodo = []
    this.validar2 = []
    if(this.formPeriodoEjecucion.valid){
      this.servicePeriodoEjecucion.listarPorId(Number(this.data)).subscribe( periodoEjecucion => {
        this.validar = periodoEjecucion;
        this.servicePeriodoEjecucion.listarTodos().subscribe( periodoEjecu => {
          this.validarTodo = periodoEjecu;
          this.validar2 = this.validarTodo.filter((item:any) => item.descripcion === this.formPeriodoEjecucion.value.descripcion && item.cantidad === this.formPeriodoEjecucion.value.cantidad);
          console.log(this.validar2);
          if(this.validar.descripcion === this.formPeriodoEjecucion.value.descripcion && this.validar.cantidad === this.formPeriodoEjecucion.value.cantidad){
            Swal.fire({
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            })
            window.location.reload();
          }else if(this.validar2.length > 0){
            Swal.fire({
              icon: 'error',
              title: 'El periodo ejecion ya existe!',
              showConfirmButton: false,
              timer: 2000
            })
          }else{
            const idTipoProceso = this.formPeriodoEjecucion.value.id;
            this.formPeriodoEjecucion.value.idTipoProceso = idTipoProceso;
            this.serviceModificar.actualizarPeriodoEjecucion(this.formPeriodoEjecucion.value).subscribe( data => {
              Swal.fire({
                icon: 'success',
                title: 'Periodo Ejecucion modificado!',
                showConfirmButton: false,
                timer: 1500
              })
              window.location.reload();
            })
          }
        })
      })
    }
  }

}
