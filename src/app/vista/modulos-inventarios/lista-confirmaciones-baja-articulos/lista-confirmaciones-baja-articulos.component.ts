import { Articulo2 } from './../../../modelos/articulo2';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { RechazoSolicitudBajaArticuloLiderProcesoComponent } from './rechazo-solicitud-baja-articulo-lider-proceso/rechazo-solicitud-baja-articulo-lider-proceso.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { SolicitudBajasArticulos2 } from 'src/app/modelos/modelos2/solicitudBajasArticulos2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ArticuloService } from 'src/app/servicios/articulo.service';

@Component({
  selector: 'app-lista-confirmaciones-baja-articulos',
  templateUrl: './lista-confirmaciones-baja-articulos.component.html',
  styleUrls: ['./lista-confirmaciones-baja-articulos.component.css']
})
export class ListaConfirmacionesBajaArticulosComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudesBajas: any = [];

  displayedColumns = ['id', 'fecha', 'observacion', 'usuario', 'idDetalleArticulo', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceSolicitudBajasArticulos: SolicitudBajasArticulosService,
    private serviceModificar: ModificarService,
    private serviceEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioArticulo: ArticuloService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    this.serviceSolicitudBajasArticulos.listarTodos().subscribe(resTodoSolicitudesBajas=>{
      resTodoSolicitudesBajas.forEach(element => {
        if(element.idEstado.id == 81){
          this.listarSolicitudesBajas.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  aceptarConfirmacion( id:number){
    let solicitudBaja = new SolicitudBajasArticulos2();
    this.serviceSolicitudBajasArticulos.listarPorId(id).subscribe(res=>{
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
        this.serviceEstado.listarPorId(82).subscribe(resEstado=>{
          solicitudBaja.id = res.id;
          var fecha = new Date(res.fecha)
          fecha.setDate(fecha.getDate()+1)
          solicitudBaja.fecha = fecha;
          solicitudBaja.observacion = res.observacion;
          solicitudBaja.id_usuario = res.idUsuario.id;
          solicitudBaja.id_estado = resEstado.id;
          solicitudBaja.id_articulo = res.idArticulo.id;
          solicitudBaja.usuario_autorizacion = res.usuarioAutorizacion
          solicitudBaja.usuario_confirmacion = resUsuario.id
          this.serviceModificar.actualizarSolicitudBajaArticulo(solicitudBaja).subscribe(resSolicitudBajaArticulo=>{
            this.servicioArticulo.listarPorId(res.idArticulo.id).subscribe(resArticulo=>{
              this.serviceEstado.listarPorId(27).subscribe(resEstadoInaccesible=>{
                let articuloModificar : Articulo2 = new Articulo2();
                articuloModificar.id = resArticulo.id
                articuloModificar.descripcion = resArticulo.descripcion
                articuloModificar.idCategoria = resArticulo.idCategoria.id
                articuloModificar.idEstado = resEstadoInaccesible.id
                this.actualizarArticuloInaccesible(articuloModificar)
              })
            })
          })
        })
      })
    })
  }

  actualizarArticuloInaccesible(articuloModificar: Articulo2){
    this.serviceModificar.actualizarArticulos(articuloModificar).subscribe(resArticuloActualizado=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se dio de baja correctamente el articulo!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  rechazarConfirmacion(id:number){
    const dialogRef = this.dialog.open(RechazoSolicitudBajaArticuloLiderProcesoComponent, {
      width: '500px',
      height: '300px',
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


  name = 'listaAutorizaciones.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('autorizaciones');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
