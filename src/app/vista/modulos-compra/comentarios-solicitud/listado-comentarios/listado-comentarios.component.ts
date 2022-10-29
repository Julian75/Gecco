import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { GestionProcesoService } from './../../../../servicios/gestionProceso.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { GestionProceso } from 'src/app/modelos/gestionProceso';

@Component({
  selector: 'app-listado-comentarios',
  templateUrl: './listado-comentarios.component.html',
  styleUrls: ['./listado-comentarios.component.css']
})
export class ListadoComentariosComponent implements OnInit {
  public idSolicitud: any;
  public estadoSolicitud: any;
  public listarDetalle: any = [];
  displayedColumns = ['id', 'articulo','solicitud', 'cantidad','observacion', 'usuarioComment', 'estado'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialogRef: MatDialogRef<ListadoComentariosComponent>,
    private servicelistaSolicitud: SolicitudService,
    private serviceGestionProceso: GestionProcesoService,
    private serviceDetalleSolicitud: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarDetalleSolicitud();
  }

  aprobar:boolean = false
  public listarDetalleSolicitud() {
    this.idSolicitud = this.data;
    this.servicelistaSolicitud.listarPorId(this.idSolicitud.id).subscribe( res => {
      this.serviceGestionProceso.listarTodos().subscribe(resGestionProceso=>{
        resGestionProceso.forEach(elementGestionProceso => {
          if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == res.id && elementGestionProceso.idDetalleSolicitud.idEstado.id != 59){
            this.listarDetalle.push(elementGestionProceso)
          }
        });
        this.dataSource = new MatTableDataSource(this.listarDetalle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })

  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarDetalle);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: GestionProceso, filter: string) => {
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

  listadoComentariosCompletos: any = []
  exportToExcel(): void {
    this.listadoComentariosCompletos = []
    for (let index = 0; index < this.listarDetalle.length; index++) {
      const element = this.listarDetalle[index];
      var obj = {
        "Id Solicitud": element.idDetalleSolicitud.idSolicitud.id,
        "Fecha Solicitud": element.idDetalleSolicitud.idSolicitud.fecha,
        "Articulo": element.idDetalleSolicitud.idArticulos.descripcion,
        "Cantidad": element.idDetalleSolicitud.cantidad,
        "Observacion": element.idDetalleSolicitud.observacion,
        "Usuario Comento": element.idProceso.idUsuario.nombre+" "+element.idProceso.idUsuario.apellido,
        Comentario: element.comentario
      }
      this.listadoComentariosCompletos.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listadoComentariosCompletos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaComentariosSolicitud");
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
