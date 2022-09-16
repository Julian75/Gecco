import { AgregarCotizacionComponent } from './agregar-cotizacion/agregar-cotizacion.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-generar-cotizacion',
  templateUrl: './generar-cotizacion.component.html',
  styleUrls: ['./generar-cotizacion.component.css']
})
export class GenerarCotizacionComponent implements OnInit {

  public listaSolicitud: any = [];
  public idSol: any;

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private solicitudService: SolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<GenerarCotizacionComponent>,
  ) { }

  ngOnInit(): void {
    this.listarSolicitudes()
  }

  public listarSolicitudes(){
    this.idSol = this.data
    this.solicitudService.listarPorId(this.idSol).subscribe(resSolicitud => {
      this.listaSolicitud.push(resSolicitud)
      this.dataSource = new MatTableDataSource(this.listaSolicitud);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  verSolicitud(id: number){
    const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
      width: '1000px',
      height: '430px',
      data: {id: id}
    });
  }

  public agregarCotizacion(id:number){
    const dialogRef = this.dialog.open(AgregarCotizacionComponent, {
      width: '450px',
      data: id,
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'Cotizacion.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  public volver(){
    this.dialogRef.close();
  }

}
