import { VisualizarRegistroComponent } from './visualizar-registro/visualizar-registro.component';
import { CotizacionService } from './../../../servicios/cotizacion.service';
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CotizacionPdfService } from './../../../servicios/cotizacionPdf.service';
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
import { SubirPdfService } from './../../../servicios/subirPdf.service';
import { OrdenCompra } from 'src/app/modelos/ordenCompra';
import { RechazarRegistroComponent } from './rechazar-registro/rechazar-registro.component';

@Component({
  selector: 'app-aprobacion-registro',
  templateUrl: './aprobacion-registro.component.html',
  styleUrls: ['./aprobacion-registro.component.css']
})
export class AprobacionRegistroComponent implements OnInit {

  public listaSolicitudes: any = [];
  public listaDetalleSolicitud: any = [];
  public idSolicitud:any ;
  public listaPdf: any = [];
  public listaOrdenCompra: any = [];

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<AprobacionRegistroComponent>,
    private solicitudService: SolicitudService,
    private servicioCotizacionPdf: CotizacionPdfService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioCorreo: CorreoService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    private servicioOrdenCompra: OrdenCompraService,
    private servicioPdf: SubirPdfService,
    private servicioCotizacion: CotizacionService,
    private servicioSolicitud: SolicitudService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.servicioCotizacionPdf.listarTodos().subscribe(resCotizacionPdf=>{
      resCotizacionPdf.forEach(element => {
        if(element.idCotizacion.idSolicitud.id == Number(this.data) && element.idEstado.id == 39){
          this.listaSolicitudes.push(element)
        }
      });
      this.servicioOrdenCompra.listarTodos().subscribe(resOrdenCompra=>{
        resOrdenCompra.forEach(elementOrdenCompra => {
          if (elementOrdenCompra.idSolicitud.id == Number(this.data)) {
            this.listaOrdenCompra.push(elementOrdenCompra)
          }
        });
        this.dataSource = new MatTableDataSource(this.listaSolicitudes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  aprobar:boolean = true
  verSolicitud(id: number){
    this.servicioSolicitud.listarPorId(id).subscribe(resSolicitud=>{
      if(resSolicitud.idEstado.id == 37){
        this.servicioOrdenCompra.listarTodos().subscribe(resOrdenCompra=>{
          resOrdenCompra.forEach(element => {
            if(element.idSolicitud.id == id){
              const dialogRef = this.dialog.open(VisualizarRegistroComponent, {
                width: '1000px',
                data: element.id
              });
            }
          });
        })
      }else{
        const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
          width: '1000px',
          data: {id: id}
        });
      }
    })
  }

  public aceptar(id:number, idCotizacion:number){
    let solicitud : Solicitud = new Solicitud();
    this.solicitudService.listarPorId(id).subscribe(res => {
      this.servicioEstado.listarPorId(46).subscribe(resEstado => {
        solicitud.id = res.id
        solicitud.fecha = res.fecha
        solicitud.idUsuario = res.idUsuario
        solicitud.idEstado = resEstado
        this.actualizarSolicitud(solicitud, idCotizacion);
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud, idCotizacion: number){
    this.solicitudService.actualizar(solicitud).subscribe(res =>{
      this.actualOrdenCompra(solicitud.idUsuario.id, solicitud.id, idCotizacion)
      // this.crearCorreo(solicitud.idUsuario.id, solicitud.id)
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

 public actualOrdenCompra(idUsuario: number, idSolicitud: number, idCotizacion:number){
  let ordenCompra : OrdenCompra = new OrdenCompra();
  console.log(this.listaOrdenCompra[0].id)
    this.servicioOrdenCompra.listarPorId(this.listaOrdenCompra[0].id).subscribe(resOrdenCompra=>{
      ordenCompra.id = resOrdenCompra.id
      ordenCompra.anticipoPorcentaje = resOrdenCompra.anticipoPorcentaje
      ordenCompra.valorAnticipo = resOrdenCompra.valorAnticipo
      ordenCompra.idProveedor = resOrdenCompra.idProveedor
      ordenCompra.idSolicitud = resOrdenCompra.idSolicitud
      this.servicioEstado.listarPorId(44).subscribe(resEstado=>{
        ordenCompra.idEstado = resEstado
        this.actualizarOrdenCompra(ordenCompra, idUsuario, idSolicitud, idCotizacion);
      })
    })
 }

 public actualizarOrdenCompra(ordenCompra: OrdenCompra, idUsuario:number, idSolicitud: number, idCotizacion:number){
  this.servicioOrdenCompra.actualizar(ordenCompra).subscribe(res=>{
    this.crearCorreo(idUsuario, idSolicitud, idCotizacion)
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

 public crearCorreo(idUsuario:number, idSolicitud:number, idCotizacion:number){
  let correo : Correo = new Correo();
  this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
    this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario => {
      correo.to = resUsuario.correo
      correo.subject = "Aceptacion de Registro"
      correo.messaje = "<!doctype html>"
      +"<html>"
      +"<head>"
      +"<meta charset='utf-8'>"
      +"</head>"
      +"<body>"
      +"<h3 style='color: black;'>Su orden de compra ha sido aprobada.</h3>"
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

      this.enviarCorreo(correo, idCotizacion, idSolicitud);
    })
  })
}

  public enviarCorreo(correo: Correo, idCotizacion:number, idSolicitud:number){
    this.servicioCotizacion.listarPorId(idCotizacion).subscribe(resCotizacion=>{
      this.servicioCorreo.enviar(correo).subscribe(res =>{
        let correo : Correo = new Correo();
        this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
          this.servicioUsuario.listarPorId(resCotizacion.idUsuario.id).subscribe(resUsuario => {
            correo.to = resUsuario.correo
            correo.subject = "Aceptacion de Registro"
            correo.messaje = "<!doctype html>"
            +"<html>"
            +"<head>"
            +"<meta charset='utf-8'>"
            +"</head>"
            +"<body>"
            +"<h3 style='color: black;'>Su orden de compra ha sido aprobada.</h3>"
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

            this.enviarCorreo2(correo);
          })
        })
      })
    })
  }

  public enviarCorreo2(correo: Correo){
    this.servicioCorreo.enviar(correo).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Correo enviado al usuario de la solicitud y cotizacion!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
      this.dialogRef.close();
    })
  }


 rechazarSolicitud(id: number, idCotizacion:number){
  const dialogRef = this.dialog.open(RechazarRegistroComponent, {
    width: '500px',
    data: {idSolicitud: id, idCotizacion:idCotizacion}
    });
  }

  //Descargar Cotizacion Individualmente
  public descargarPdf(id: number){
    this.servicioCotizacionPdf.listarPorId(id).subscribe(res=>{
      console.log(res.nombrePdf)
      this.servicioPdf.listarTodos().subscribe(resPdf => {
        this.listaPdf.push(resPdf)
        console.log(resPdf)
        for(const i in resPdf){
          console.log(this.listaPdf[0][i].name)
          if (res.nombrePdf == this.listaPdf[0][i].name) {
            console.log(this.listaPdf[0][i])
            window.location.href = this.listaPdf[0][i].url
          }
        }
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
