import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatrizNecesidadDetalleService } from 'src/app/servicios/matrizNecesidadDetalle.service';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reporte-matriz-necesidad',
  templateUrl: './reporte-matriz-necesidad.component.html',
  styleUrls: ['./reporte-matriz-necesidad.component.css']
})
export class ReporteMatrizNecesidadComponent implements OnInit {
  public formReporteMatrizNecesidad!: FormGroup;
  color = ('primary');
  public listaOpciones = ["Empresa", "Proceso", "Subproceso"]
  listaProcesos: any = [];
  listaSubProcesos: any = [];
  listaExcel: any = []

  constructor(
    private servicioProceso: TipoProcesoService,
    private servicioSubProceso: SubProcesoService,
    private servicioMatrizNecesidadDetalle: MatrizNecesidadDetalleService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarProcesos();
    this.listarSubProcesos();
  }

  private crearFormulario() {
    this.formReporteMatrizNecesidad = this.fb.group({
      id: 0,
      reporte: [null,Validators.required],
      proceso: [null,Validators.required],
      subproceso: [null,Validators.required],
    });
  }

  public listarProcesos() {
    this.servicioProceso.listarTodos().subscribe(resProcesos => {
      this.listaProcesos = resProcesos
    });
  }

  public listarSubProcesos() {
    this.servicioSubProceso.listarTodos().subscribe(resSubProceso => {
      this.listaSubProcesos = resSubProceso
    });
  }

  empresa: boolean = false;
  reporteMatrizNecesidad(seleccion: any){
    console.log(seleccion)
    if(seleccion.value == "Proceso"){
      document.getElementById('procesoDiv')?.setAttribute('style', 'display: block;')
      document.getElementById('subProcesoDiv')?.setAttribute('style', 'display: none;')
      this.empresa = false
      this.crearFormulario();
    }else if(seleccion.value == "Subproceso"){
      document.getElementById('procesoDiv')?.setAttribute('style', 'display: none;')
      document.getElementById('subProcesoDiv')?.setAttribute('style', 'display: block;')
      this.crearFormulario();
      this.empresa = false
    }else if(seleccion.value == "Empresa"){
      document.getElementById('procesoDiv')?.setAttribute('style', 'display: none;')
      document.getElementById('subProcesoDiv')?.setAttribute('style', 'display: none;')
      this.empresa = true
      this.crearFormulario();
    }else{
      document.getElementById('procesoDiv')?.setAttribute('style', 'display: none;')
      document.getElementById('subProcesoDiv')?.setAttribute('style', 'display: none;')
      this.crearFormulario();
      this.empresa = false
    }
  }

  public guardar(){
    var proceso = this.formReporteMatrizNecesidad.controls["proceso"].value
    var subProceso = this.formReporteMatrizNecesidad.controls["subproceso"].value
    if(proceso != null && subProceso == null){
      this.reporteProceso();
    }else if(proceso == null && subProceso != null){
      this.reporteSubProceso();
    }else if(proceso == null && subProceso == null && this.empresa == true){
      this.reporteEmpresa();
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos vacios o no ha seleccionado ninguna opcion!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  listaMatricesNecesidad:any = [];
  public reporteProceso(){
    this.listaMatricesNecesidad = []
    this.listaExcel = []
    var proceso = this.formReporteMatrizNecesidad.controls["proceso"].value
    console.log(proceso)
    document.getElementById('snipper1')?.setAttribute('style', 'display: block;')
    this.servicioMatrizNecesidadDetalle.listarTodos().subscribe(resMatricesNecesidadesDetalle=>{
      resMatricesNecesidadesDetalle.forEach(elementMatrizNecesidadDetalle => {
        if(elementMatrizNecesidadDetalle.idMatrizNecesidad.idSubProceso.idTipoProceso.id == proceso){
          this.listaMatricesNecesidad.push(elementMatrizNecesidadDetalle)
        }
      });
      if(this.listaMatricesNecesidad.length < 1){
        document.getElementById('snipper1')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron datos con este proceso!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        const formatterPeso = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        })
        for (let index = 0; index < this.listaMatricesNecesidad.length; index++) {
          const element = this.listaMatricesNecesidad[index];
          var obj = {
            "Id Matriz Necesidad": element.idMatrizNecesidad.id,
            "Tipo Necesidad": element.idMatrizNecesidad.idTipoNecesidad.descripcion,
            Descripcion: element.descripcion,
            "Mes Ejecutar": element.fecha,
            "Cantidad Ejecuciones Objetivo": element.cantidadEjecuciones,
            "Cantidad Ejecuciones Cumplidas": element.cantidadEjecucionesCumplidas,
            "Cantidad Objetos Comprar Estimado": element.cantidadEstimada,
            "Cantidad Objetos Comprado": element.cantidadComprada,
            "Costo por Ejecucion Estimado": formatterPeso.format(element.idMatrizNecesidad.costoUnitario),
            "Costo Ejecución Comprado": formatterPeso.format(element.costoEjecucionComprada),
            "Cumplimiento Porcentaje Ejecucion": element.porcentaje+"%",
            "Costo Total Estimado": formatterPeso.format(element.idMatrizNecesidad.costoEstimado),
            "Costo Total": formatterPeso.format(element.idMatrizNecesidad.costoTotal),
            Detalle: element.idMatrizNecesidad.detalle,
            Proceso: element.idMatrizNecesidad.idSubProceso.idTipoProceso.descripcion,
          }
          this.listaExcel.push(obj)
        }
        document.getElementById('snipper1')?.setAttribute('style', 'display: none;')
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.listaExcel);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ReporteMatrizNecesidadProceso");
        });
      }
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public reporteSubProceso(){
    this.listaMatricesNecesidad = []
    this.listaExcel = []
    var subproceso = this.formReporteMatrizNecesidad.controls["subproceso"].value
    console.log(subproceso)
    document.getElementById('snipper1')?.setAttribute('style', 'display: block;')
    this.servicioMatrizNecesidadDetalle.listarTodos().subscribe(resMatricesNecesidadesDetalle=>{
      resMatricesNecesidadesDetalle.forEach(elementMatrizNecesidadDetalle => {
        if(elementMatrizNecesidadDetalle.idMatrizNecesidad.idSubProceso.id == subproceso){
          this.listaMatricesNecesidad.push(elementMatrizNecesidadDetalle)
        }
      });
      if(this.listaMatricesNecesidad.length < 1){
        document.getElementById('snipper1')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron datos con este subproceso!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        const formatterPeso = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        })
        for (let index = 0; index < this.listaMatricesNecesidad.length; index++) {
          const element = this.listaMatricesNecesidad[index];
          var obj = {
            "Id Matriz Necesidad": element.idMatrizNecesidad.id,
            "Tipo Necesidad": element.idMatrizNecesidad.idTipoNecesidad.descripcion,
            Descripcion: element.descripcion,
            "Mes Ejecutar": element.fecha,
            "Cantidad Ejecuciones Objetivo": element.cantidadEjecuciones,
            "Cantidad Ejecuciones Cumplidas": element.cantidadEjecucionesCumplidas,
            "Cantidad Objetos Comprar Estimado": element.cantidadEstimada,
            "Cantidad Objetos Comprado": element.cantidadComprada,
            "Costo por Ejecucion Estimado": formatterPeso.format(element.idMatrizNecesidad.costoUnitario),
            "Costo Ejecución Comprado": formatterPeso.format(element.costoEjecucionComprada),
            "Cumplimiento Porcentaje Ejecucion": element.porcentaje+"%",
            "Costo Total Estimado": formatterPeso.format(element.idMatrizNecesidad.costoEstimado),
            "Costo Total": formatterPeso.format(element.idMatrizNecesidad.costoTotal),
            Detalle: element.idMatrizNecesidad.detalle,
            SubProceso: element.idMatrizNecesidad.idSubProceso.descripcion,
          }
          this.listaExcel.push(obj)
        }
        document.getElementById('snipper1')?.setAttribute('style', 'display: none;')
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.listaExcel);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ReporteMatrizNecesidadSubProceso");
        });
      }
    })
  }

  public reporteEmpresa(){
    this.listaMatricesNecesidad = []
    this.listaExcel = []
    document.getElementById('snipper1')?.setAttribute('style', 'display: block;')
    this.servicioMatrizNecesidadDetalle.listarTodos().subscribe(resMatricesNecesidadesDetalle=>{
      resMatricesNecesidadesDetalle.forEach(elementMatrizNecesidadDetalle => {
        this.listaMatricesNecesidad.push(elementMatrizNecesidadDetalle)
      });
      if(this.listaMatricesNecesidad.length < 1){
        document.getElementById('snipper1')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron datos!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        const formatterPeso = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        })
        for (let index = 0; index < this.listaMatricesNecesidad.length; index++) {
          const element = this.listaMatricesNecesidad[index];
          var obj = {
            "Id Matriz Necesidad": element.idMatrizNecesidad.id,
            "Tipo Necesidad": element.idMatrizNecesidad.idTipoNecesidad.descripcion,
            Descripcion: element.descripcion,
            "Mes Ejecutar": element.fecha,
            "Cantidad Ejecuciones Objetivo": element.cantidadEjecuciones,
            "Cantidad Ejecuciones Cumplidas": element.cantidadEjecucionesCumplidas,
            "Cantidad Objetos Comprar Estimado": element.cantidadEstimada,
            "Cantidad Objetos Comprado": element.cantidadComprada,
            "Costo por Ejecucion Estimado": formatterPeso.format(element.idMatrizNecesidad.costoUnitario),
            "Costo Ejecución Comprado": formatterPeso.format(element.costoEjecucionComprada),
            "Cumplimiento Porcentaje Ejecucion": element.porcentaje+"%",
            "Costo Total Estimado": formatterPeso.format(element.idMatrizNecesidad.costoEstimado),
            "Costo Total": formatterPeso.format(element.idMatrizNecesidad.costoTotal),
            Detalle: element.idMatrizNecesidad.detalle,
          }
          this.listaExcel.push(obj)
        }
        document.getElementById('snipper1')?.setAttribute('style', 'display: none;')
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.listaExcel);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ReporteMatrizNecesidadEmpresa");
        });
      }
    })
  }

}