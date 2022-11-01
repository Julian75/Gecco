import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { PorcentajePresupuestoService } from 'src/app/servicios/porcentajePresupuesto.service';
import { PorcentajePresupuesto } from 'src/app/modelos/porcentajePresupuesto';

@Component({
  selector: 'app-porcentaje-presupuesto',
  templateUrl: './porcentaje-presupuesto.component.html',
  styleUrls: ['./porcentaje-presupuesto.component.css']
})
export class PorcentajePresupuestoComponent implements OnInit {
  dtOptions: any = {};
  public listarPorcentajes: any = [];

  displayedColumns = ['id', 'fecha', 'cuenta', 'porcentaje'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioPorcentaje: PorcentajePresupuestoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioPorcentaje.listarTodos().subscribe( res =>{
      this.listarPorcentajes = res;
      this.dataSource = new MatTableDataSource(this.listarPorcentajes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarPorcentajes);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: PorcentajePresupuesto, filter: string) => {
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

  listadoPorcentajes: any = [];
  listaPorcentajeCompletos: any = []
  exportToExcel(): void {
    this.listaPorcentajeCompletos = []
    this.servicioPorcentaje.listarTodos().subscribe(resPorcentaje=>{
      this.listadoPorcentajes = resPorcentaje
      for (let index = 0; index < this.listadoPorcentajes.length; index++) {
        const element = this.listadoPorcentajes[index];
        var obj = {
          "Id": element.id,
          "Fecha": element.fecha
        }
        this.listaPorcentajeCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaPorcentajeCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaPorcentajes");
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
