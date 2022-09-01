import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { CorreoService } from './../../../servicios/Correo.service';
import { EstadoService } from './../../../servicios/estado.service';
import { Solicitud } from './../../../modelos/solicitud';
import { Component, OnInit,ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { VisualizarDetalleSolicitudComponent } from '../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { PasosComponent } from '../pasos/pasos.component';

@Component({
  selector: 'app-solicitudes-realizadas',
  templateUrl: './solicitudes-realizadas.component.html',
  styleUrls: ['./solicitudes-realizadas.component.css']
})
export class SolicitudesRealizadasComponent implements OnInit {

  public listaSolicitudes: any = [];
  public listaDetalleSolicitud: any = [];

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreo: CorreoService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.solicitudService.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.idUsuario.id == Number(sessionStorage.getItem("id"))) {
         this.listaSolicitudes.push(element);
        }
      })
      this.listaSolicitudes.reverse();
      this.dataSource = new MatTableDataSource(this.listaSolicitudes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  verSolicitud(id: number){
    const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
      width: '1000px',
      data: {id: id}
    });
  }

  verPasos(id: number){
    const dialogRef = this.dialog.open(PasosComponent, {
      width: '500px',
      height: '400px',
      data: {id: id}
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
  name = 'listaSolicitudesRealizadas.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
