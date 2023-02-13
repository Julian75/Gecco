import { DetalleArticuloService } from './../../../../servicios/detalleArticulo.service';
import { ArticuloService } from './../../../../servicios/articulo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HistorialArticuloService } from 'src/app/servicios/historialArticulo.service';
import * as XLSX from 'xlsx';
import { HistorialArticulos } from 'src/app/modelos/historialArticulos';
import * as FileSaver from 'file-saver';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';

@Component({
  selector: 'app-visualizar-historial-articulo',
  templateUrl: './visualizar-historial-articulo.component.html',
  styleUrls: ['./visualizar-historial-articulo.component.css']
})
export class VisualizarHistorialArticuloComponent implements OnInit {
  dtOptions: any = {};
  public listarHistorialArticulo: any = [];
  public articulo: any;

  displayedColumns = ['id', 'fecha', 'observacion', 'usuario'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<VisualizarHistorialArticuloComponent>,
    private servicioHistorialArticulo: HistorialArticuloService,
    private servicioDetalleArticulo: DetalleArticuloService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioArticulo: ArticuloService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  idDetalleArticulo: any;
  public listarTodos () {
    this.listarHistorialArticulo = [];
    this.idDetalleArticulo = this.data
    this.servicioDetalleArticulo.listarPorId(this.idDetalleArticulo).subscribe(resDetalleArticulo=>{
      this.articulo = resDetalleArticulo.idArticulo.descripcion
        this.servicioConsultasGenerales.listarHistorialActivo(resDetalleArticulo.id).subscribe(resHistorialesActivos=>{
          for (let index = 0; index < resHistorialesActivos.length; index++) {
            const element = resHistorialesActivos[index];
            this.servicioHistorialArticulo.listarPorId(element.id).subscribe(resHistorialActivoId=>{
              this.listarHistorialArticulo.push(resHistorialActivoId)
              if((index+1) == resHistorialesActivos.length){
                this.dataSource = new MatTableDataSource(this.listarHistorialArticulo);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            })
          }
        })
    })
    document.getElementById('botonVolver').addEventListener('click', () => {
      this.dialogRef.close();
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarHistorialArticulo);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: HistorialArticulos, filter: string) => {
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

  listActivosInventario: any = [];
  exportToExcel(): void {
    this.listActivosInventario = []
    for (let index = 0; index < this.listarHistorialArticulo.length; index++) {
      const element = this.listarHistorialArticulo[index];
      var obj = {
        "Id": element.id,
        "Activo": element.idDetalleArticulo.idArticulo.descripcion,
        "Fecha Historial": element.fecha,
        "Codigo Unico": element.idDetalleArticulo.codigoUnico,
        "Codigo Contable": element.idDetalleArticulo.codigoContable,
        "Marca": element.idDetalleArticulo.marca,
        "Placa": element.idDetalleArticulo.placa,
        "Serial": element.idDetalleArticulo.serial,
        "Usuario Ejecuto Accion": element.idUsuario.nombre+" "+element.idUsuario.apellido,
        "Accion": element.observacion
      }
      this.listActivosInventario.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listActivosInventario);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaHistorialActivo");
    });
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
