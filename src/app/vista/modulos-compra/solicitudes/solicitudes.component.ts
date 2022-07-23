import { ActivatedRoute, ParamMap } from '@angular/router';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { UsuarioService } from './../../../servicios/usuario.service';
import { Correo } from './../../../modelos/correo';
import { CorreoService } from './../../../servicios/Correo.service';
import { EstadoService } from './../../../servicios/estado.service';
import { Solicitud } from './../../../modelos/solicitud';
import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { VisualizarDetalleSolicitudComponent } from '../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { RechazoSolicitudComponent } from '../lista-solicitudes/rechazo-solicitud/rechazo-solicitud.component';
import { PasosComponent } from '../pasos/pasos.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  public listaSolicitudes: any = [];
  public listaDetalleSolicitud: any = [];
  public idSolicitud:any ;

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<SolicitudesComponent>,
    private solicitudService: SolicitudService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreo: CorreoService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.solicitudService.listarTodos().subscribe(res => {
      res.forEach(element => {
        if (element.id == Number(this.data) ) {
          this.listaSolicitudes.push(element);
        }
      })
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

  public aceptar(id:number){
    let solicitud : Solicitud = new Solicitud();
    this.solicitudService.listarPorId(id).subscribe(res => {
      this.servicioEstado.listarPorId(29).subscribe(resEstado => {
        solicitud.id = res.id
        solicitud.fecha = res.fecha
        solicitud.idUsuario = res.idUsuario
        solicitud.idEstado = resEstado
        this.actualizarSolicitud(solicitud);
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud){
    this.solicitudService.actualizar(solicitud).subscribe(res =>{
      this.crearCorreo(solicitud.idUsuario.id, solicitud.id)
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }
 public crearCorreo(idUsuario:number, idSolicitud:number){
  let correo : Correo = new Correo();
  this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
    this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario => {
      correo.to = resUsuario.correo
      correo.subject = "Aceptacion de Solicitud"
      correo.messaje = "<!doctype html>"
      +"<html>"
      +"<head>"
      +"<meta charset='utf-8'>"
      +"</head>"
      +"<body>"
      +"<h3 style='color: black;'>Su solicitud ha sido viable por lo cual a sido Aceptada.</h3>"
      +"<br>"
      +"<table style='border: 1px solid #000; text-align: center;'>"
      +"<tr>"
      +"<th style='border: 1px solid #000;'>Articulo</th>"
      +"<th style='border: 1px solid #000;'>Cantidad</th>"
      +"<th style='border: 1px solid #000;'>Observacion</th>";
      +"</tr>";
      resSolicitud.forEach(element => {
        if (element.idSolicitud.id == idSolicitud) {
          this.listaDetalleSolicitud.push(element)
          correo.messaje += "<tr>"
          correo.messaje += "<td style='border: 1px solid #000;'>"+element.idArticulos.descripcion+"</td>";
          correo.messaje += "<td style='border: 1px solid #000;'>"+element.cantidad+"</td>";
          correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
          correo.messaje += "</tr>";
        }
      });
      correo.messaje += "</table>"
      +"<br>"
      +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
      +"</body>"
      +"</html>";

      this.enviarCorreo(correo);
    })
  })
}

public enviarCorreo(correo: Correo){
  this.servicioCorreo.enviar(correo).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Correo enviado al usuario de la solicitud!',
      showConfirmButton: false,
      timer: 1500
    })
    window.location.reload()
  }, error => {
    console.log(error)
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Hubo un error al enviar el Correo!',
      showConfirmButton: false,
      timer: 1500
    })
  });
}

 rechazarSolicitud(id: number){
  const dialogRef = this.dialog.open(RechazoSolicitudComponent, {
    width: '500px',
    data: id
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
  name = 'listaSolicitudes.xlsx';
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
