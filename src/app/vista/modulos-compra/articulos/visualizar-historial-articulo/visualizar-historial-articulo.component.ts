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
      this.servicioHistorialArticulo.listarTodos().subscribe(resHistorialesArticulos=>{
        resHistorialesArticulos.forEach(elementHistorialArticulo => {
          if(elementHistorialArticulo.idDetalleArticulo.id == resDetalleArticulo.id){
            this.listarHistorialArticulo.push(elementHistorialArticulo)
          }
        });
        this.dataSource = new MatTableDataSource(this.listarHistorialArticulo);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
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

  name = 'historialArticulo.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('historialArticulo');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}