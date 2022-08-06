import { ProcesoComponent } from './../proceso/proceso.component';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listado-observacion',
  templateUrl: './listado-observacion.component.html',
  styleUrls: ['./listado-observacion.component.css']
})
export class ListadoObservacionComponent implements OnInit {
  public idSolicitud: any;
  public estadoSolicitud: any;
  public listarDetalle: any = [];
  displayedColumns = ['id', 'articulo','solicitud', 'cantidad','observacion','estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialogRef: MatDialogRef<VisualizarDetalleSolicitudComponent>,
    public dialogRef2: MatDialogRef<ListadoObservacionComponent>,
    public pasos: MatDialogRef<ProcesoComponent>,
    private servicelistaSolicitud: SolicitudService,
    private serviceDetalleSolicitud: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarDetalleSolicitud();
  }

  public listarDetalleSolicitud() {
    this.idSolicitud = this.data;
    console.log(this.idSolicitud)
    this.servicelistaSolicitud.listarPorId(this.idSolicitud.id).subscribe( res => {
      this.estadoSolicitud = res.idEstado.id
      this.serviceDetalleSolicitud.listarTodos().subscribe( resDetalle => {
        resDetalle.forEach(element => {
          if (element.idSolicitud.id == res.id && element.idEstado.id == 28 ) {
            this.listarDetalle.push(element);
          }
        })
        this.dataSource = new MatTableDataSource( this.listarDetalle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
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
  name = 'listaSolicitudes.xlsx';
  exportToExcel(): void {
    // let element = document.getElementById('rol');
    // const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // const book: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    // XLSX.writeFile(book, this.name);
  }

  public formularioObservacion(idDetalleSolicitud: number){
    this.dialogRef2.close();
    const dialogRef = this.dialog.open(ProcesoComponent, {
      width: '400px',
      data: idDetalleSolicitud
    });
  }

  public volver(){
    this.dialogRef.close();
  }

}
