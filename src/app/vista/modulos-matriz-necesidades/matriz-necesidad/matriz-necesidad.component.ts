import { TipoNecesidad } from 'src/app/modelos/tipoNecesidad';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { TipoNecesidadService } from 'src/app/servicios/tipoNecesidad.service';
import Swal from 'sweetalert2';
import { MatrizNecesidad } from 'src/app/modelos/matrizNecesidad';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import {MatDialog} from '@angular/material/dialog';
import { MatrizNecesidadDetalleComponent } from '../matriz-necesidad-detalle/matriz-necesidad-detalle.component';

@Component({
  selector: 'app-matriz-necesidad',
  templateUrl: './matriz-necesidad.component.html',
  styleUrls: ['./matriz-necesidad.component.css']
})
export class MatrizNecesidadComponent implements OnInit {

  public formMatrizNecesidad!: FormGroup;
  color = ('primary');
  public listaSubprocesos: any = [];
  public listaNecesidades: any = [];
  public fechaActual: Date = new Date();

  constructor(
    private servicioSubProceso: SubProcesoService,
    private servicioTipoNecesidades: TipoNecesidadService,
    private servicioMatrizNecesidad: MatrizNecesidadService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarSubProcesos();
    this.listarTipoNecesidades();
    this.crearFormulario();
  }

  public listarSubProcesos() {
    this.servicioSubProceso.listarTodos().subscribe(resSubProceso => {
      this.listaSubprocesos = resSubProceso
    });
  }

  public listarTipoNecesidades() {
    this.servicioTipoNecesidades.listarTodos().subscribe(resTipoNecesidades => {
      this.listaNecesidades = resTipoNecesidades
    });
  }

  private crearFormulario() {
    this.formMatrizNecesidad = this.fb.group({
      id: 0,
      subproceso: [null,Validators.required],
      tipoNecesidad: [null,Validators.required],
      detalle: [null,Validators.required],
      cantidad: [null,Validators.required],
      cantidadEjecucion: [null,Validators.required],
      costoUnitario: [null,Validators.required],
    });
  }

  public guardar(){
    if(this.formMatrizNecesidad.valid){
      let matrizNecesidad : MatrizNecesidad = new MatrizNecesidad()
      this.servicioTipoNecesidades.listarPorId(Number(this.formMatrizNecesidad.controls['tipoNecesidad'].value)).subscribe(resTipoNecesidad=>{
        this.servicioSubProceso.listarPorId(Number(this.formMatrizNecesidad.controls['subproceso'].value)).subscribe(resSubproceso=>{
          matrizNecesidad.idSubProceso = resSubproceso
          matrizNecesidad.idTipoNecesidad = resTipoNecesidad
          matrizNecesidad.fecha = this.fechaActual
          matrizNecesidad.cantidad = this.formMatrizNecesidad.controls['cantidad'].value
          matrizNecesidad.cantidadEjecuciones = this.formMatrizNecesidad.controls['cantidadEjecucion'].value
          matrizNecesidad.costoTotal = 0
          matrizNecesidad.costoUnitario = this.formMatrizNecesidad.controls['costoUnitario'].value
          matrizNecesidad.detalle = this.formMatrizNecesidad.controls['detalle'].value
          matrizNecesidad.costoEstimado = matrizNecesidad.costoUnitario * matrizNecesidad.cantidad
          matrizNecesidad.porcentajeTotal = 0;
          this.registrarMatrizNecesidad(matrizNecesidad)
        })
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

  public registrarMatrizNecesidad(matrizNecesidad: MatrizNecesidad){
    this.servicioMatrizNecesidad.registrar(matrizNecesidad).subscribe(resMatrizNecesidad=>{
      const dialogRef = this.dialog.open(MatrizNecesidadDetalleComponent, {
        width: '900px',
        height: '440px',
        data: resMatrizNecesidad,
        backdropClass: 'static',
        disableClose: true,
      });
    })
  }

}
