import { HistorialArticuloService } from './../../../servicios/historialArticulo.service';
import { HistorialArticulos } from './../../../modelos/historialArticulos';
import { AgregarSolicitudBajaArticuloComponent } from './agregar-solicitud-baja-articulo/agregar-solicitud-baja-articulo.component';
import { ReasignarArticuloComponent } from './reasignar-articulo/reasignar-articulo.component';
import { VisualizarHistorialArticuloComponent } from './../../modulos-compra/articulos/visualizar-historial-articulo/visualizar-historial-articulo.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { AsignacionArticulos2 } from 'src/app/modelos/modelos2/asignacionArticulos2';
import { ModificarAsignarArticulosUsuarioComponent } from '../asignar-articulos-usuario/modificar-asignar-articulos-usuario/modificar-asignar-articulos-usuario.component';
import { AgregarAsignarPuntoVentaArticuloComponent } from '../asignar-punto-venta-articulo/agregar-asignar-punto-venta-articulo/agregar-asignar-punto-venta-articulo.component';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';
import { DetalleArticuloService } from 'src/app/servicios/detalleArticulo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-mis-articulos-asignados',
  templateUrl: './mis-articulos-asignados.component.html',
  styleUrls: ['./mis-articulos-asignados.component.css']
})
export class MisArticulosAsignadosComponent implements OnInit {
  dtOptions: any = {};
  public listarAsignacionArticulos: any = [];

  displayedColumns = ['id','iddetalleArticulo','idasignacionesprocesos','codigoUnico','serial','placa','idEstado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceAsignacionArticulos: AsignacionArticulosService,
    private servicioDetalleArticulo: DetalleArticuloService,
    private servicioModificar: ModificarService,
    private servicioEstado: EstadoService,
    private servicioAsignacionPuntoVent: AsignacionPuntoVentaService,
    private servicioUsuario: UsuarioService,
    private serviceHistorial: HistorialArticuloService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  mostrarHistorial(idArticulo:number):void{
    const dialogRef = this.dialog.open(VisualizarHistorialArticuloComponent, {
      width: '600px',
      height: '440px',
      data: idArticulo
    });
  }

  asignarArticuloPuntoVenta(id){
    const dialogRef = this.dialog.open(AgregarAsignarPuntoVentaArticuloComponent, {
      width: '600px',
      height: '440px',
      data: id
    });
  }

  aparece = true
  public listarTodos(){
    this.serviceAsignacionArticulos.listarTodos().subscribe(resAsigArticulos=>{
      this.servicioAsignacionPuntoVent.listarTodos().subscribe(resAsignacion=>{
        resAsigArticulos.forEach(elementAsignArticulo => {
          if(elementAsignArticulo.idAsignacionesProcesos.idUsuario.id == Number(sessionStorage.getItem('id'))){
            if(elementAsignArticulo.idEstado.id == 76 && elementAsignArticulo.idDetalleArticulo.idArticulo.idEstado.id == 26){
              var obj = {
                asignArticulo: elementAsignArticulo,
                existeAsigPuntoVenta: false
              }
              resAsignacion.forEach(elementAsignacionPuntoVenta => {
                if(elementAsignArticulo.idDetalleArticulo.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.id && elementAsignArticulo.idDetalleArticulo.codigoUnico == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.codigoUnico && elementAsignArticulo.idAsignacionesProcesos.idUsuario.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id){
                  obj.existeAsigPuntoVenta = true
                }
              })
              this.listarAsignacionArticulos.push(obj);
            }else if(elementAsignArticulo.idEstado.id == 78 && elementAsignArticulo.idDetalleArticulo.idArticulo.idEstado.id == 26){
              var obj = {
                asignArticulo: elementAsignArticulo,
                existeAsigPuntoVenta: false
              }
              resAsignacion.forEach(elementAsignacionPuntoVenta => {
                if(elementAsignArticulo.idDetalleArticulo.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.id && elementAsignArticulo.idDetalleArticulo.codigoUnico == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.codigoUnico && elementAsignArticulo.idAsignacionesProcesos.idUsuario.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id){
                  obj.existeAsigPuntoVenta = true
                }
              })
              this.listarAsignacionArticulos.push(obj);
            }
          }
        })

        // res.forEach(element => {
        //   if(element.idAsignacionesProcesos.idUsuario.documento == Number(sessionStorage.getItem('usuario')) ){
        //     // var obj = {
        //     //   asignacionArticulo: {},
        //     //   existeAsignPuntoVenta: false
        //     // }
        //     if(element.idEstado.id == 76 && element.idDetalleArticulo.idArticulo.idEstado.id == 26){
        //       this.listarAsignacionArticulos.push(element);
        //     }else if(element.idEstado.id == 78 && element.idDetalleArticulo.idArticulo.idEstado.id == 26){
        //       this.listarAsignacionArticulos.push(element);
        //     }
        //   }
        //     resAsignacion.forEach(elementAsignacion => {
        //       if(element.idDetalleArticulo.idArticulo.descripcion == elementAsignacion.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion && element.idAsignacionesProcesos.idUsuario.id == Number(sessionStorage.getItem('id'))){
        //         this.aparece = false;
        //       }
        //     });
        // });
        this.dataSource = new MatTableDataSource(this.listarAsignacionArticulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  reAsignarArticulo(idAsignacionArticulo){
    const dialogRef = this.dialog.open(ReasignarArticuloComponent, {
      width: '500px',
      height: '350px',
      data: idAsignacionArticulo
    });
  }

  aceptar(id:number){
    let asignacionArticulo: AsignacionArticulos2 = new AsignacionArticulos2();
    this.serviceAsignacionArticulos.listarPorId(id).subscribe(res=>{
      asignacionArticulo.id = res.id;
      asignacionArticulo.idAsignacionesProcesos = res.idAsignacionesProcesos.id;
      asignacionArticulo.idDetalleArticulo = res.idDetalleArticulo.id
      this.servicioEstado.listarPorId(76).subscribe(res=>{
        asignacionArticulo.idEstado = res.id;
        this.servicioModificar.actualizarAsignacionArticulos(asignacionArticulo).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Asignación de articulo aceptada',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload()
        })
      })
    })
  }

  listaAsignArticulos: any = [];
  fechaActual: Date = new Date();
  eliminarAsignacionProceso(id:number){
    this.listaAsignArticulos = []
    let asignacionArticuloMod: AsignacionArticulos2 = new AsignacionArticulos2();
    let asignacionArticuloCompras: AsignacionArticulos2 = new AsignacionArticulos2();
    let historial = new HistorialArticulos();
    this.serviceAsignacionArticulos.listarPorId(id).subscribe(res=>{
      asignacionArticuloMod.id = res.id;
      asignacionArticuloMod.idAsignacionesProcesos = res.idAsignacionesProcesos.id;
      asignacionArticuloMod.idDetalleArticulo = res.idDetalleArticulo.id
      this.servicioEstado.listarPorId(77).subscribe(resEstado=>{
        asignacionArticuloMod.idEstado = resEstado.id;
        this.serviceAsignacionArticulos.listarTodos().subscribe(resAsigArticulos=>{
          resAsigArticulos.forEach(elementAsigArticulo => {
            if(elementAsigArticulo.idDetalleArticulo.id == res.idDetalleArticulo.id){
              this.listaAsignArticulos.push(elementAsigArticulo.id)
            }
          });
          const idAsigMen = Math.min(...this.listaAsignArticulos);
          console.log(idAsigMen)
          this.serviceAsignacionArticulos.listarPorId(idAsigMen).subscribe(resAsignCompras=>{
            asignacionArticuloCompras.id = resAsignCompras.id;
            asignacionArticuloCompras.idAsignacionesProcesos = resAsignCompras.idAsignacionesProcesos.id;
            asignacionArticuloCompras.idDetalleArticulo = resAsignCompras.idDetalleArticulo.id;
            this.servicioEstado.listarPorId(76).subscribe(resEstado=>{
              this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
                asignacionArticuloCompras.idEstado = resEstado.id;
                historial.fecha = this.fechaActual
                historial.observacion = "Se reasignó el artículo " +resAsignCompras.idDetalleArticulo.idArticulo.descripcion.toLowerCase()+ " al usuario "+resAsignCompras.idAsignacionesProcesos.idUsuario.nombre.toLowerCase()+ " " +resAsignCompras.idAsignacionesProcesos.idUsuario.apellido.toLowerCase()+ " del área "+resAsignCompras.idAsignacionesProcesos.idTiposProcesos.descripcion.toLowerCase()
                historial.idDetalleArticulo = resAsignCompras.idDetalleArticulo
                historial.idUsuario = resUsuario
                this.servicioActualizarModyCompras(asignacionArticuloMod, asignacionArticuloCompras, historial)
              })
            })
          })
        })
      })
    })
  }

  servicioActualizarModyCompras(asignacionArticuloMod: AsignacionArticulos2, asignacionArticuloCompra: AsignacionArticulos2, historial: HistorialArticulos){
    this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloMod).subscribe(resAsigModificado=>{
      this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloCompra).subscribe(resAsigCompras=>{
        this.serviceHistorial.registrar(historial).subscribe(resHistorialNuevo =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Asignación de articulo rechazada!',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al registrar el historial!',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un error al actualizar asignación de compras!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar asignación rechazada!',
        showConfirmButton: false,
        timer: 1500
      })
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

  name = 'listaTipoNovedades.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('tipoNovedades');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
