import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarConfiguracionComponent } from '../agregar-configuracion/agregar-configuracion.component';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { ModificarTablaConfiguracionComponent } from '../modificar-tabla-configuracion/modificar-tabla-configuracion.component';
import { Configuracion } from 'src/app/modelos/configuracion';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tabla-configuracion',
  templateUrl: './tabla-configuracion.component.html',
  styleUrls: ['./tabla-configuracion.component.css']
})
export class TablaConfiguracionComponent implements OnInit {
  dtOptions: any = {};
  public listaConfiguracion: any = [];

  displayedColumns = ['id', 'descripcion', 'nombre', 'valor', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioConfiguracion: ConfiguracionService,
  ) { }

  ngOnInit(): void {
    this.listarTodo();
  }

  public listarTodo(){
    this.servicioConfiguracion.listarTodos().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarConfiguracionComponent, {
      width: '500px',
    });
  }

  abrirModalModificar(id:number): void {
    const dialogRef = this.dialog.open(ModificarTablaConfiguracionComponent, {
      width: '500px',
      data: id
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaConfiguracion);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Configuracion, filter: string) => {
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

  listadoConfiguracion: any = [];
  listaConfiguracionCompletos: any = []
  exportToExcel(): void {
    this.listaConfiguracionCompletos = []
    this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
      this.listadoConfiguracion = resConfiguracion
      for (let index = 0; index < this.listadoConfiguracion.length; index++) {
        const element = this.listadoConfiguracion[index];
        var obj = {
          "Id": element.id,
          "Nombre de la Variable": element.nombre,
          "Valor de la Variable": element.valor,
          Descripcion: element.descripcion
        }
        this.listaConfiguracionCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaConfiguracionCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaConfiguraciones");
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
