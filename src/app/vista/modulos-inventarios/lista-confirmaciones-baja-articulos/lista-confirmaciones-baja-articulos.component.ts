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

  aceptarAutorizacion( id:number){
    let solicitudBaja = new SolicitudBajasArticulos2();
    this.serviceSolicitudBajasArticulos.listarPorId(id).subscribe(res=>{
      this.serviceEstado.listarPorId(82).subscribe(resEstado=>{
        solicitudBaja.id = res.id;
        solicitudBaja.fecha = res.fecha;
        solicitudBaja.observacion = res.observacion;
        solicitudBaja.id_usuario = res.idUsuario.id;
        solicitudBaja.id_estado = resEstado.id;
        solicitudBaja.id_detalle_articulo = res.idDetalleArticulo.id;
        this.serviceModificar.actualizarSolicitudBajaArticulo(solicitudBaja).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Autorización aceptada',
            showConfirmButton: false,
            timer: 1500
          })
          this.listarSolicitudesBajas = [];
          this.listarTodos();
        })
      })
    })
  }

  rechazarAutorizacion(id:number){

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
