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

  color = ('primary');
  section:boolean = false;
  displayedColumns = ['cuenta','añoAnterior', 'presupuesto','añoActual', 'varAñoAnt','cumPresupuesto'];
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
  public guardar() {
    this.listaDetalladoContable = []
    if (this.formAnalisisDetalladoContable.valid) {
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      var fecha = this.formAnalisisDetalladoContable.controls['fecha'].value.split('-')
      var fechaActual = fecha[0]+"-"+fecha[1]+"-01"
      var fechaAnterior = (fecha[0]-1)+"-"+fecha[1]+"-01"
      console.log(fechaActual)
      this.servicioConsultasGenerales.listarLibrosMayorAñoyMes(fechaActual).subscribe(resLibrosMayores=>{
        console.log(resLibrosMayores)
        var i = 0
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
                                      variacionAnoAnterior: Math.round(((resLibroMayorActualId.valor/resLibroMayorAnteriorId.valor)*100)-100),
                                      cumPresupuesto: Math.round(((resLibroMayorAnteriorId.valor/resLibroMayorActualId.valor)*100)-100)
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
                                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                                Swal.fire({
                                  icon: 'error',
                                  title: 'No hay registros para este mes y año',
                                  showConfirmButton: false,
                                  timer: 2500
                                });
                              }
                            })
                          })
                        });
                      }else{
                        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                        Swal.fire({
                          icon: 'error',
                          title: 'No hay registros para este mes y año',
                          showConfirmButton: false,
                          timer: 2500
                        });
                      }
                    })
                  })
                });
              }else{
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  icon: 'error',
                  title: 'No hay registros para este mes y año',
                  showConfirmButton: false,
                  timer: 2500
                });
              }
            })
          })
        });
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

  public exportToExcel() {
    // this.exportarE = [];
    // for (let i = 0; i < this.listarLibrosMayor.length; i++) {
    //   var obj = {
    //     'Código': this.listarLibrosMayor[i].idCuenta.codigo,
    //     'Nombre': this.listarLibrosMayor[i].idCuenta.descripcion,
    //     'Valor': Math.abs(this.listarLibrosMayor[i].valor),
    //     'Mes': new Date(this.listarLibrosMayor[i].fecha.toString().substring(0,4),this.listarLibrosMayor[i].fecha.toString().substring(5,7),0).toLocaleString('default', { month: 'long' }).toUpperCase(),
    //     'Año': this.listarLibrosMayor[i].fecha.toString().substring(0,4)
    //   }
    //   this.exportarE.push(obj);
    // }
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportarE);
    // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, 'LibroMayor');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    // let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // let EXCEL_EXTENSION = '.xlsx';
    // const data: Blob = new Blob([buffer], {
    //   type: EXCEL_TYPE
    // });
    // FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  // dtOptions: any = {};
  // public listarPresupuestosContables: any = [];

  // displayedColumns = ['id', 'añoAnterior','presupuesto', 'ejecutado',];
  // dataSource!:MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // constructor(
  //   private servicioPresupuestoContable: PresupuestoContableService,
  //   // private servicioJerarquiaCuentas: JerarquiaCuentasService,
  //   public dialog: MatDialog
  // ) { }


  // ngOnInit(): void {
  //   this.listarTodos();
  // }

  // public listarTodos () {
  //   this.servicioPresupuestoContable.listarTodos().subscribe(resPresupuestoContable =>{
  //     this.listarPresupuestosContables = resPresupuestoContable;
  //     this.dataSource = new MatTableDataSource( this.listarPresupuestosContables);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }

  // // Filtrado
  // applyFilter(event: Event) {
  //   // const filterValue = (event.target as HTMLInputElement).value;
  //   // if(filterValue == ""){
  //   //   this.dataSource = new MatTableDataSource(this.listarCuentas);
  //   // }else{
  //   //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   //   this.dataSource.filterPredicate = (data: , filter: string) => {
  //   //     const accumulator = (currentTerm, key) => {
  //   //       return this.nestedFilterCheck(currentTerm, data, key);
  //   //     };
  //   //     const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
  //   //     const transformedFilter = filter.trim().toLowerCase();
  //   //     return dataStr.indexOf(transformedFilter) !== -1;
  //   //   }
  //   // }
  // }

  // nestedFilterCheck(search, data, key) {
  //   if (typeof data[key] === 'object') {
  //     for (const k in data[key]) {
  //       if (data[key][k] !== null) {
  //         search = this.nestedFilterCheck(search, data[key], k);
  //       }
  //     }
  //   } else {
  //     search += data[key];
  //   }
  //   return search;
  // }

  // listadoCuentas: any = [];
  // listaCuentasCompletos: any = []
  // exportToExcel(): void {
  //   // this.listaCuentasCompletos = []
  //   // this.servicioCuentas.listarTodos().subscribe(resCuentas=>{
  //   //   this.listadoCuentas = resCuentas
  //   //   for (let index = 0; index < this.listadoCuentas.length; index++) {
  //   //     const element = this.listadoCuentas[index];
  //   //     var obj = {
  //   //       Id: element.id,
  //   //       Descripcion: element.descripcion,
  //   //       Codigo: element.codigo,
  //   //       Jerarquia: element.idJerarquia.descripcion
  //   //     }
  //   //     this.listaCuentasCompletos.push(obj)
  //   //   }
  //   //   import("xlsx").then(xlsx => {
  //   //     const worksheet = xlsx.utils.json_to_sheet(this.listaCuentasCompletos);
  //   //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   //     this.saveAsExcelFile(excelBuffer, "listaCuentas");
  //   //   });
  //   // })
  // }

  // // saveAsExcelFile(buffer: any, fileName: string): void {
  // //   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // //   let EXCEL_EXTENSION = '.xlsx';
  // //   const data: Blob = new Blob([buffer], {
  // //     type: EXCEL_TYPE
  // //   });
  // //   FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  // // }

}
