import { PeriodoEjecucion } from './../../../modelos/periodoEjecucion';
import { PeriodoEjecucionService } from './../../../servicios/periodoEjecucion.service';
import { ModificarPeriodoEjecucionComponent } from './modificar-periodo-ejecucion/modificar-periodo-ejecucion.component';
import { AgregarPeriodoEjecucionComponent } from './agregar-periodo-ejecucion/agregar-periodo-ejecucion.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { SubProceso } from 'src/app/modelos/subProceso';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-listas-periodos-ejecuciones',
  templateUrl: './listas-periodos-ejecuciones.component.html',
  styleUrls: ['./listas-periodos-ejecuciones.component.css']
})
export class ListasPeriodosEjecucionesComponent implements OnInit {

  dtOptions: any = {};
  public listarPeriodosEjecucionesCom: any = [];

  displayedColumns = ['id', 'descripcion','cantidadMeses','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serivicioPeriodosEjecuciones: PeriodoEjecucionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.serivicioPeriodosEjecuciones.listarTodos().subscribe(res=>{
      this.listarPeriodosEjecucionesCom = res;
      this.dataSource = new MatTableDataSource(this.listarPeriodosEjecucionesCom);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public agregarPeriodoEjecucion(){
    const dialogRef = this.dialog.open(AgregarPeriodoEjecucionComponent, {
      width: '500px',
    });
  }

  public modificarPeriodoEjecucion(id:number){
    const dialogRef = this.dialog.open(ModificarPeriodoEjecucionComponent, {
      width: '500px',
      data: id
    });

  }


  eliminarPeriodoEjecucion(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serivicioPeriodosEjecuciones.eliminar(id).subscribe(res=>{
          Swal.fire(
            '¡Eliminado!',
            'El periodo de ejecución ha sido eliminado.',
            'success'
          )
          window.location.reload()
        })
      }
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarPeriodosEjecucionesCom);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: PeriodoEjecucion, filter: string) => {
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

  listadoPeriodoEjecu: any = []; //listar todos los datos del servicio periodo ejecucion
  listaPerdEjecu: any = [] //lista que nos sirve para guardar los objetos que se van a mostrar en el excel
  exportToExcel(): void {
    this.listadoPeriodoEjecu = []
    this.serivicioPeriodosEjecuciones.listarTodos().subscribe(resPeriodosEjecucion=>{
      this.listaPerdEjecu = resPeriodosEjecucion
      for (let index = 0; index < this.listaPerdEjecu.length; index++) {
        const element = this.listaPerdEjecu[index];
        var obj = {
          "Id": element.id,
          "Descripcion": element.descripcion,
          "Cantidad en Meses": element.cantidad,
        }
        this.listadoPeriodoEjecu.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listadoPeriodoEjecu);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaPeriodosEjecuciones");
      });
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

}
