import { ConfiguracionService } from './../../../servicios/configuracion.service';
import { ListadoComentariosComponent } from './../comentarios-solicitud/listado-comentarios/listado-comentarios.component';
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
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Solicitud2 } from 'src/app/modelos/solicitud2';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  public listaSolicitudes: any = [];
  public listaDetalleSolicitud: any = [];
  public idSolicitud:any ;
  public contrasena:any ;
  public correo:any ;
  public fecha: Date = new Date();

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
    private servicioModificar: ModificarService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    private servicioConfiguracion: ConfiguracionService,
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
    const dialogRef = this.dialog.open(ListadoComentariosComponent, {
      width: '1000px',
      height: '430px',
      data: {id: id}
    });
  }

  public aceptar(id:number){
    document.getElementById('snipper2')?.setAttribute('style', 'display: block;')
    let solicitud : Solicitud2 = new Solicitud2();
    this.solicitudService.listarPorId(id).subscribe(res => {
      this.servicioEstado.listarPorId(29).subscribe(resEstado => {
        solicitud.id = res.id
        this.fecha = new Date(res.fecha)
        this.fecha.setFullYear(this.fecha.getFullYear(), this.fecha.getMonth(), (this.fecha.getDate()+1))
        solicitud.fecha = this.fecha
        solicitud.idUsuario = res.idUsuario.id
        solicitud.idEstado = resEstado.id
        this.actualizarSolicitud(solicitud);
      })
    })
  }

  public actualizarSolicitud(solicitud: Solicitud2){
    this.servicioModificar.actualizarSolicitud(solicitud).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su solicitud ha sido viable!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
      // this.crearCorreo(solicitud.idUsuario, solicitud.id)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }
//  public crearCorreo(idUsuario:number, idSolicitud:number){
//   let correo : Correo = new Correo();
//   this.servicioSolicitudDetalle.listarTodos().subscribe(resSolicitud => {
//     this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario => {
//       this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
//         resConfiguracion.forEach(elementConfi => {
//           if(elementConfi.nombre == "correo_gecco"){
//             this.correo = elementConfi.valor
//           }
//           if(elementConfi.nombre == "contraseña_correo"){
//             this.contrasena = elementConfi.valor
//           }
//         });
//         correo.correo = this.correo
//         correo.contrasena = this.contrasena

//         correo.to = resUsuario.correo
//         correo.subject = "Aceptación de Solicitud"
//         correo.messaje = "<!doctype html>"
//         +"<html>"
//         +"<head>"
//         +"<meta charset='utf-8'>"
//         +"</head>"
//         +"<body>"
//         +"<h3 style='color: black;'>Su solicitud ha sido viable por lo cual a sido aceptada.</h3>"
//         +"<br>"
//         +"<table style='border: 1px solid #000; text-align: center;'>"
//         +"<tr>"
//         +"<th style='border: 1px solid #000;'>Articulo</th>"
//         +"<th style='border: 1px solid #000;'>Cantidad</th>"
//         +"<th style='border: 1px solid #000;'>Observacion</th>";
//         +"</tr>";
//         resSolicitud.forEach(element => {
//           if (element.idSolicitud.id == idSolicitud && element.idEstado.id != 59) {
//             this.listaDetalleSolicitud.push(element)
//             correo.messaje += "<tr>"
//             correo.messaje += "<td style='border: 1px solid #000;'>"+element.idArticulos.descripcion+"</td>";
//             correo.messaje += "<td style='border: 1px solid #000;'>"+element.cantidad+"</td>";
//             correo.messaje += "<td style='border: 1px solid #000;'>"+element.observacion+"</td>";
//             correo.messaje += "</tr>";
//           }
//         });
//         correo.messaje += "</table>"
//         +"<br>"
//         +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
//         +"</body>"
//         +"</html>";

//         this.enviarCorreo(correo);
//       })
//     })
//   })
// }

// public enviarCorreo(correo: Correo){
//   this.servicioCorreo.enviar(correo).subscribe(res =>{
//     document.getElementById('snipper2')?.setAttribute('style', 'display: none;')
//     Swal.fire({
//       position: 'center',
//       icon: 'success',
//       title: 'Correo enviado al usuario de la solicitud!',
//       showConfirmButton: false,
//       timer: 1500
//     })
//     window.location.reload()
//   }, error => {
//     Swal.fire({
//       position: 'center',
//       icon: 'error',
//       title: 'Hubo un error al enviar el Correo!',
//       showConfirmButton: false,
//       timer: 1500
//     })
//   });
// }

 rechazarSolicitud(id: number){
   const dialogRef = this.dialog.open(RechazoSolicitudComponent, {
     width: '500px',
     data: id
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaSolicitudes);
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
    for (let index = 0; index < this.listaSolicitudes.length; index++) {
      const element = this.listaSolicitudes[index];
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
      this.saveAsExcelFile(excelBuffer, "listaSolicitudesViabilidad");
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
