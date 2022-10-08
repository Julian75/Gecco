import { SolicitudBajasArticulos2 } from './../../../modelos/modelos2/solicitudBajasArticulos2';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticulosBaja2 } from 'src/app/modelos/modelos2/articulosBaja2';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import * as XLSX from 'xlsx';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-visualizar-activos-bajas-solicitud',
  templateUrl: './visualizar-activos-bajas-solicitud.component.html',
  styleUrls: ['./visualizar-activos-bajas-solicitud.component.css']
})
export class VisualizarActivosBajasSolicitudComponent implements OnInit {
  dtOptions: any = {};
  public listaActivosBaja: any = [];
  public idContable: number = 0;

  displayedColumns = ['id', 'activo', 'codigoUnico', 'marca', 'placa', 'serial', 'observacion', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioArticulosBaja: ArticulosBajaService,
    private servicioModificar: ModificarService,
    private servicioUsuario: UsuarioService,
    private servicioEstado: EstadoService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VisualizarActivosBajasSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.listaActivosBaja = []
    this.servicioArticulosBaja.listarTodos().subscribe( resActivosBajaSolicitud =>{
      resActivosBajaSolicitud.forEach(elementActivoBajaSolicitud => {
        if(elementActivoBajaSolicitud.idSolicitudBaja.id == Number(this.data)){
          this.listaActivosBaja.push(elementActivoBajaSolicitud)
        }
      });
      console.log(this.listaActivosBaja)
      this.dataSource = new MatTableDataSource(this.listaActivosBaja);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  listaAceptado: any = [];
  aceptado: boolean = false;
  aceptarAutorizacion( id:number){
    this.idContable += 1
    var lengthActivos = this.listaActivosBaja.length
    this.servicioArticulosBaja.listarPorId(id).subscribe(resActivoBaja=>{
      this.servicioEstado.listarPorId(81).subscribe(resEstado=>{
        this.servicioEstado.listarPorId(83).subscribe(resEstadoRechazado=>{
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioLogueado=>{
            let activoBaja : ArticulosBaja2 = new ArticulosBaja2();
            let solicitudBajaActivoMod : SolicitudBajasArticulos2 = new SolicitudBajasArticulos2();
            activoBaja.id = resActivoBaja.id
            if(this.idContable == lengthActivos){
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.servicioArticulosBaja.listarTodos().subscribe(resActivosBajaCompletos=>{
                  resActivosBajaCompletos.forEach(activoBaja => {
                    if(activoBaja.idSolicitudBaja.id == Number(this.data)){
                      if(activoBaja.idEstado.id == 81){
                        this.aceptado = true
                      }else{
                        this.aceptado = false
                      }
                      this.listaAceptado.push(this.aceptado)
                    }
                  });
                  const existeAprobado = this.listaAceptado.includes(true)
                  if(existeAprobado == true){
                    solicitudBajaActivoMod.id = resActivoBaja.idSolicitudBaja.id
                    solicitudBajaActivoMod.fecha = resActivoBaja.idSolicitudBaja.fecha
                    solicitudBajaActivoMod.id_estado = resEstado.id
                    solicitudBajaActivoMod.id_usuario = resActivoBaja.idSolicitudBaja.idUsuario.id
                    solicitudBajaActivoMod.usuario_autorizacion = resUsuarioLogueado.id
                    solicitudBajaActivoMod.usuario_confirmacion = 0
                    this.servicioModificar.actualizarSolicitudBajaArticulo(solicitudBajaActivoMod)
                  }else{
                    solicitudBajaActivoMod.id = resActivoBaja.idSolicitudBaja.id
                    solicitudBajaActivoMod.fecha = resActivoBaja.idSolicitudBaja.fecha
                    solicitudBajaActivoMod.id_estado = resEstadoRechazado.id
                    solicitudBajaActivoMod.id_usuario = resActivoBaja.idSolicitudBaja.idUsuario.id
                    solicitudBajaActivoMod.usuario_autorizacion = 0
                    solicitudBajaActivoMod.usuario_confirmacion = 0
                    this.servicioModificar.actualizarSolicitudBajaArticulo(solicitudBajaActivoMod)
                  }
                })
              })
            }else{
              activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
              activoBaja.id_estado = resEstado.id
              activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
              activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
              activoBaja.observacion =resActivoBaja.observacion
              console.log(activoBaja)
              this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
                this.dialogRef.close();
                const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
                  width: '800px',
                  height: '440px',
                  data: activoBaja.id_solicitud_baja
                });
              })
            }
          })
        })
      })
    })
  }

  rechazarAutorizacion(id:number){
    this.idContable += 1
    var lengthActivos = this.listaActivosBaja.length
    this.servicioArticulosBaja.listarPorId(id).subscribe(resActivoBaja=>{
      this.servicioEstado.listarPorId(83).subscribe(resEstado=>{
        let activoBaja : ArticulosBaja2 = new ArticulosBaja2();
        activoBaja.id = resActivoBaja.id
        if(this.idContable == lengthActivos){
          activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
          activoBaja.id_estado = resEstado.id
          activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
          activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
          activoBaja.observacion =resActivoBaja.observacion
          console.log(activoBaja)
        }else{
          activoBaja.id_detalle_articulo = resActivoBaja.idDetalleArticulo.id
          activoBaja.id_estado = resEstado.id
          activoBaja.id_opcion_baja = resActivoBaja.idOpcionBaja.id
          activoBaja.id_solicitud_baja = resActivoBaja.idSolicitudBaja.id
          activoBaja.observacion =resActivoBaja.observacion
          console.log(activoBaja)
          this.servicioModificar.actualizarActivoBaja(activoBaja).subscribe(resActivoBajaMod=>{
            this.dialogRef.close();
            const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
              width: '800px',
              height: '440px',
              data: activoBaja.id_solicitud_baja
            });
          })
        }
      })
    })
    console.log(this.idContable)
    // const dialogRef = this.dialog.open(RechazoSolicitudBajaArticuloComponent, {
    //   width: '500px',
    //   height: '300px',
    //   data: id
    // });
  }

  public actualizarSolicitudBajaArticulo(solicitudBajaActivo: SolicitudBajasArticulos2){
    this.servicioModificar.actualizarSolicitudBajaArticulo(solicitudBajaActivo).subscribe(resSolicitudBajaActivo=>{
      if(solicitudBajaActivo.id_estado == 83){

      }
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
  name = 'listaActivosBajasSolicitud.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('activosBajasSolicitud');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
