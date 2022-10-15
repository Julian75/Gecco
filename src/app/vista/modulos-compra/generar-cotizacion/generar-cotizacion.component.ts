import { AgregarCotizacionComponent } from './agregar-cotizacion/agregar-cotizacion.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { Solicitud } from 'src/app/modelos/solicitud';
import * as FileSaver from 'file-saver';

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
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaSolicitud);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Solicitud, filter: string) => {
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

  listaSolicitudesExcel: any = [];
  exportToExcel(): void {
    for (let index = 0; index < this.listaSolicitud.length; index++) {
      const element = this.listaSolicitud[index];
      var obj = {
        "Id": element.id,
        "Fecha": element.fecha,
        "Usuario Solicitud": element.idUsuario.nombre+" "+element.idUsuario.apellido,
        Estado: element.idEstado.descripcion
      }
      this.listaSolicitudesExcel.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaSolicitudesExcel);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaSolicitudesCotizacion");
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

  public volver(){
    this.dialogRef.close();
  }

}
