import { AgregarComentarioComponent } from './../../comentarios-solicitud/agregar-comentario/agregar-comentario.component';
import { GestionProcesoService } from './../../../../servicios/gestionProceso.service';
import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-visualizar-detalle-solicitud',
  templateUrl: './visualizar-detalle-solicitud.component.html',
  styleUrls: ['./visualizar-detalle-solicitud.component.css']
})
export class VisualizarDetalleSolicitudComponent implements OnInit {
  public idSolicitud: any;
  public estadoSolicitud: any;
  public listarDetalle: any = [];
  public listaExiste: any = [];
  displayedColumns = ['id', 'articulo','solicitud', 'cantidad','observacion' ,'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialogRef: MatDialogRef<VisualizarDetalleSolicitudComponent>,
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
  aprobar2:boolean = false
  public listarDetalleSolicitud() {
    this.idSolicitud = this.data;
    this.servicelistaSolicitud.listarPorId(this.idSolicitud.id).subscribe( res => {
      if (res.idEstado.id == 54) {
        this.aprobar = true
        this.serviceGestionProceso.listarTodos().subscribe(resGestionProceso=>{
          resGestionProceso.forEach(elementGestionProceso => {
            if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == res.id && elementGestionProceso.idProceso.idUsuario.id == Number(sessionStorage.getItem('id')) && elementGestionProceso.idEstado.id == 50){
              this.listarDetalle.push(elementGestionProceso.idDetalleSolicitud)
            }
          });
          this.dataSource = new MatTableDataSource( this.listarDetalle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }else{
        this.aprobar = false
        this.estadoSolicitud = res.idEstado.id
        this.serviceDetalleSolicitud.listarTodos().subscribe( resDetalle => {
          resDetalle.forEach(element => {
            if (element.idSolicitud.id == res.id && element.idEstado.id == 28) {
              this.aprobar2 = true
            }else if (element.idSolicitud.id == res.id && element.idEstado.id == 57 ) {
              this.aprobar2 = false
            }
            this.listaExiste.push(this.aprobar2)
          })
          const existe = this.listaExiste.includes( true );
          if(existe == true){
            resDetalle.forEach(element => {
              if (element.idSolicitud.id == res.id && element.idEstado.id == 28) {
                this.listarDetalle.push(element);
              }
            })
            this.dataSource = new MatTableDataSource( this.listarDetalle);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }else if(existe == false){
            resDetalle.forEach(element => {
              if (element.idSolicitud.id == res.id && element.idEstado.id == 57) {
                this.listarDetalle.push(element);
              }else if (element.idSolicitud.id == res.id && element.idEstado.id == 56) {
                this.listarDetalle.push(element);
              }
            })
            this.dataSource = new MatTableDataSource( this.listarDetalle);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          resDetalle.forEach(element => {
            if (element.idSolicitud.id == res.id && element.idEstado.id == 37) {
              this.listarDetalle.push(element);
            }
          })
          this.dataSource = new MatTableDataSource( this.listarDetalle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })

  }

  public abrirModal(idDetalleSolicitud){
    const dialogRef = this.dialog.open(AgregarComentarioComponent, {
      width: '500px',
      data: idDetalleSolicitud
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
  name = 'listaDetalleSolicitud.xlsx';
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
