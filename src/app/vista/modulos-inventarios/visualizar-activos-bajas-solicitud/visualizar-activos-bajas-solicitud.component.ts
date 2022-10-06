import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-visualizar-activos-bajas-solicitud',
  templateUrl: './visualizar-activos-bajas-solicitud.component.html',
  styleUrls: ['./visualizar-activos-bajas-solicitud.component.css']
})
export class VisualizarActivosBajasSolicitudComponent implements OnInit {
  dtOptions: any = {};
  public listaActivosBaja: any = [];

  displayedColumns = ['id', 'activo', 'codigoUnico', 'marca', 'placa', 'serial', 'observacion'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioArticulosBaja: ArticulosBajaService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.listaActivosBaja = []
    this.servicioArticulosBaja.listarTodos().subscribe( resActivosBajaSolicitud =>{
      resActivosBajaSolicitud.forEach(elementActivoBajaSolicitud => {
        if(elementActivoBajaSolicitud.idSolicitudBaja.id == Number(this.data)){
          this.listaActivosBaja.push(elementActivoBajaSolicitud)
        }
      });
      console.log(this.listaActivosBaja)
      this.dataSource = new MatTableDataSource(this.listaActivosBaja);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaActivosBajasSolicitud.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('activosBajasSolicitud');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
