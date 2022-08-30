import { DetalleSolicitudService } from './../../../../servicios/detalleSolicitud.service';
import { GestionProcesoService } from './../../../../servicios/gestionProceso.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaComentarios.xlsx';
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
