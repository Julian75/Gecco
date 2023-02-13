import { CuentasFaltantesPorcentajeComponent } from './cuentas-faltantes-porcentaje/cuentas-faltantes-porcentaje.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LibroMayorService } from 'src/app/servicios/libroMayor.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import Swal from 'sweetalert2';
import { PresupuestoContableService } from 'src/app/servicios/presupuestoContable.service';
import { Cuentas } from 'src/app/modelos/cuentas';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-analisis-detallado-contable',
  templateUrl: './analisis-detallado-contable.component.html',
  styleUrls: ['./analisis-detallado-contable.component.css']
})
export class AnalisisDetalladoContableComponent implements OnInit {
  dtOptions: any = {};

  public listarLibrosMayor: any = [];
  public exportarE: any = [];
  public formAnalisisDetalladoContable!: FormGroup;
  public listaMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

  color = ('primary');
  section:boolean = false;
  displayedColumns = ['cuenta','añoAnterior', 'presupuesto','añoActual', 'diferenciaAñoAnt', 'varAñoAnt', 'diferenciaPresupuesto', 'cumPresupuesto'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private fb: FormBuilder,
    private servicioLibroMayor: LibroMayorService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioCuentas: CuentasService,
    private servicioPresupuestoContable: PresupuestoContableService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formAnalisisDetalladoContable = this.fb.group({
      id: 0,
      fecha: [null,Validators.required],
    });
  }

  // exportar:boolean = false;
  listaDetalladoContable = []
  listaCuentasFaltaPorcentaje = []
  public guardar() {
    this.listaDetalladoContable = []
    this.listaCuentasFaltaPorcentaje = []
    this.section = false
    if (this.formAnalisisDetalladoContable.valid) {
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      var fecha = this.formAnalisisDetalladoContable.controls['fecha'].value.split('-')
      var fechaActual = fecha[0]+"-"+fecha[1]+"-01"
      var fechaAnterior = (fecha[0]-1)+"-"+fecha[1]+"-01"
      console.log(fechaActual)
      this.servicioConsultasGenerales.listarLibrosMayorAñoyMes(fechaActual).subscribe(resLibrosMayores=>{
        console.log(resLibrosMayores)
        var i = 0
        if(resLibrosMayores.length > 0){
          resLibrosMayores.forEach(elementLibrosMayor => {
            i++
            this.servicioLibroMayor.listarPorId(elementLibrosMayor.id).subscribe(resLibrosMayorId=>{
              this.servicioConsultasGenerales.listarLibrosMayor(elementLibrosMayor.idCuenta, fechaAnterior).subscribe(resLibroMayorAnterior=>{
                if(resLibroMayorAnterior.length>0){
                  resLibroMayorAnterior.forEach(elementLibroMayorAnterior => {
                    this.servicioLibroMayor.listarPorId(elementLibroMayorAnterior.id).subscribe(resLibroMayorAnteriorId=>{
                      this.servicioConsultasGenerales.listarLibrosMayor(elementLibrosMayor.idCuenta, fechaActual).subscribe(resLibroMayorActual=>{
                        if(resLibroMayorActual.length>0){
                          resLibroMayorActual.forEach(elementLibroMayorActual => {
                            this.servicioLibroMayor.listarPorId(elementLibroMayorActual.id).subscribe(resLibroMayorActualId=>{
                              this.servicioConsultasGenerales.listarPresupuestoContableFecha(elementLibrosMayor.idCuenta, fechaActual).subscribe(resPresupuestoContable=>{
                                if(resPresupuestoContable.length>0){
                                  resPresupuestoContable.forEach(elementPresupuestoContable => {
                                    this.servicioPresupuestoContable.listarPorId(elementPresupuestoContable.id).subscribe(resPresupuestoContableId=>{
                                      var obj = {
                                        libroMayorActual: resLibroMayorActualId,
                                        libroMayorAnterior: resLibroMayorAnteriorId,
                                        presupuestoContable: resPresupuestoContableId,
                                        variacionAnoAnterior: (((resLibroMayorActualId.valor/resLibroMayorAnteriorId.valor)*100)-100).toFixed(2),
                                        colorVarAnoAnt: 'rojo',
                                        cumPresupuesto: (((resLibroMayorActualId.valor/resPresupuestoContableId.presupuesto)*100)-100).toFixed(2),
                                        colorCumPresu: 'rojo'
                                      }
                                      if(Number(obj.variacionAnoAnterior)>0){
                                        obj.colorVarAnoAnt = 'verde'
                                      }
                                      if(Number(obj.cumPresupuesto) > 0){
                                        obj.colorCumPresu = 'verde'
                                      }
                                      this.listaDetalladoContable.push(obj)
                                      if(i == resLibrosMayores.length){
                                        this.listaDetalladoContable.sort((a, b) => Number(a.libroMayorAnterior.idCuenta.codigo) - Number(b.libroMayorAnterior.idCuenta.codigo))
                                        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                                        console.log(this.listaDetalladoContable)
                                        this.section = true
                                        this.dataSource = new MatTableDataSource( this.listaDetalladoContable);
                                        this.dataSource.paginator = this.paginator;
                                        this.dataSource.sort = this.sort;

                                      }
                                    })
                                  });
                                }else{
                                  this.listaCuentasFaltaPorcentaje.push(resLibrosMayorId.idCuenta)
                                  if(i == resLibrosMayores.length){
                                    this.listaDetalladoContable.sort((a, b) => Number(a.libroMayorAnterior.idCuenta.codigo) - Number(b.libroMayorAnterior.idCuenta.codigo))
                                    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                                    console.log(this.listaDetalladoContable)
                                    this.section = true
                                    this.dataSource = new MatTableDataSource( this.listaDetalladoContable);
                                    this.dataSource.paginator = this.paginator;
                                    this.dataSource.sort = this.sort;
                                  }
                                }
                              })
                            })
                          });
                        }
                        // else{
                        //   document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                        //   for (let index = 0; index < this.listaMeses.length; index++) {
                        //     if((index+1) == Number(fecha[1])){
                        //       Swal.fire({
                        //         icon: 'error',
                        //         title: 'Falta el valor del libro mayor del mes '+this.listaMeses[index]+' del año '+Number(fecha[0]),
                        //         showConfirmButton: false,
                        //         timer: 2500
                        //       });
                        //     }
                        //   }
                        // }
                      })
                    })
                  });
                }
                // else{
                //   document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                //   for (let index = 0; index < this.listaMeses.length; index++) {
                //     if((index+1) == Number(fecha[1])){
                //       Swal.fire({
                //         icon: 'error',
                //         title: 'Falta el valor del codigo de la cuenta '+resLibrosMayorId.idCuenta.codigo+' del mes '+this.listaMeses[index]+' del año '+Number(fecha[0]-1),
                //         showConfirmButton: false,
                //         timer: 2500
                //       });
                //     }
                //   }
                // }
              })
            })
          });
        }else{
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          for (let index = 0; index < this.listaMeses.length; index++) {
            if((index+1) == Number(fecha[1])){
              Swal.fire({
                icon: 'error',
                title: 'No hay ninguna libro mayor con el mes de '+this.listaMeses[index]+' del año '+Number(fecha[0]),
                showConfirmButton: false,
                timer: 2500
              });
            }
          }
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Debe seleccionar mes y año!',
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaDetalladoContable);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Cuentas, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  añoAnterior: any;
  añoActual: any;
  public exportToExcel() {
    this.exportarE = [];
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    for (let i = 0; i < this.listaDetalladoContable.length; i++) {
      var fechaAnterior = new Date(this.listaDetalladoContable[i].libroMayorAnterior.fecha)
      this.añoAnterior = Number(fechaAnterior.getFullYear())+1
      var fechaActual = new Date(this.listaDetalladoContable[i].libroMayorActual.fecha)
      this.añoActual = Number(fechaActual.getFullYear())+1
      var obj = {
        'Codigo Cuenta': this.listaDetalladoContable[i].libroMayorAnterior.idCuenta.codigo,
        'Cuenta': this.listaDetalladoContable[i].libroMayorAnterior.idCuenta.descripcion,
        'Año Anterior': formatterPeso.format(this.listaDetalladoContable[i].libroMayorAnterior.valor),
        'Presupuesto': formatterPeso.format(this.listaDetalladoContable[i].presupuestoContable.presupuesto),
        'Año Actual': formatterPeso.format(this.listaDetalladoContable[i].libroMayorActual.valor),
        'Variación Año Anterior': this.listaDetalladoContable[i].variacionAnoAnterior+"%",
        'Cumplimiento Presupuesto': this.listaDetalladoContable[i].cumPresupuesto+"%",
      }
      this.exportarE.push(obj);

    }
    console.log(this.exportarE, this.añoAnterior, this.añoActual)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportarE);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'AnalisisDetalladoContable'+this.añoAnterior+"-"+this.añoActual);
  }

  public cuentasFaltantesPorce(){
    const dialogRef = this.dialog.open(CuentasFaltantesPorcentajeComponent, {
      width: '400px',
      height: '440px',
      data: this.listaCuentasFaltaPorcentaje
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
