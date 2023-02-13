import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatrizNecesidadDetalleService } from 'src/app/servicios/matrizNecesidadDetalle.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public formMatriz!: FormGroup;
  public fechaActual: Date = new Date();

  constructor(
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioMatrizDetalle: MatrizNecesidadDetalleService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CalendarioComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formMatriz = this.fb.group({
      id: 0,
      mes: [null,Validators.required],
    });
  }

  fechaSeleccionada: any;
  listaMatricesDetalle: any = [];
  public matrizDetalleFecha(event){
    this.listaMatricesDetalle = []
    var fechaVerificacion = this.fechaActual.getFullYear()+"-"+this.fechaActual.getMonth()+"-01";
    this.fechaSeleccionada = this.formMatriz.controls['mes'].value
    var idUsuarioLogeado = Number(sessionStorage.getItem("id"))
    this.servicioConsultasGenerales.listarAsignacionesProceso(idUsuarioLogeado).subscribe(res=>{
      if(res.length > 0){
        res.forEach(elementAsignacionProceso => {
          this.servicioConsultasGenerales.listarMatrizDetalleProceso(Number(elementAsignacionProceso.idTiposProcesos), this.fechaSeleccionada).subscribe(resMatriz=>{
            resMatriz.forEach(elementMatriz => {
              var obj = {
                matriz: {},
                color: ""
              }
              this.servicioMatrizDetalle.listarPorId(elementMatriz.id).subscribe(resMatriz=>{
                if(resMatriz.fechaEjecutada == ""){
                  obj.matriz = resMatriz
                  obj.color = "azul"
                }else if(String(resMatriz.fecha) == resMatriz.fechaEjecutada){
                  obj.matriz = resMatriz
                  obj.color = "verde"
                }else if(String(resMatriz.fecha) < fechaVerificacion && resMatriz.fechaEjecutada == ""){
                  obj.matriz = resMatriz
                  obj.color = "rojo"
                }else if(String(resMatriz.fecha) < resMatriz.fechaEjecutada){
                  obj.matriz = resMatriz
                  obj.color = "rojo"
                }
                this.listaMatricesDetalle.push(obj)
              })
            });
          })
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No tienen un proceso asignado!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  public cerrarCalendario(){
    this.dialogRef.close();
  }
}
