import { ConsultasGeneralesService } from './../../../servicios/consultasGenerales.service';
import { HistorialArticuloService } from './../../../servicios/historialArticulo.service';
import { HistorialArticulos } from './../../../modelos/historialArticulos';
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
import { AsignacionArticulos } from 'src/app/modelos/asignacionArticulos';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-mis-articulos-asignados',
  templateUrl: './mis-articulos-asignados.component.html',
  styleUrls: ['./mis-articulos-asignados.component.css']
})
export class MisArticulosAsignadosComponent implements OnInit {
  dtOptions: any = {};
  public listarAsignacionArticulos: any = [];

  displayedColumns = ['id','iddetalleArticulo','idasignacionesprocesos','serial','placa','idEstado','opciones'];
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
    private servicioConsultasGenerales: ConsultasGeneralesService,
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
  listaAsignActivosCompletos: any = []
  public listarTodos(){
    this.listaAsignActivosCompletos = []
    this.serviceAsignacionArticulos.listarTodos().subscribe(resAsigActivos=>{
      this.servicioAsignacionPuntoVent.listarTodos().subscribe(resAsignacion=>{
        this.servicioConsultasGenerales.listarAsignacionesActivosSinBaja().subscribe(resAsignacionesActivosSinBaja=>{
          console.log(resAsignacionesActivosSinBaja)
          if(resAsignacionesActivosSinBaja.length == 0){
            this.listaAsignActivosCompletos = resAsigActivos
          }else{
            resAsignacionesActivosSinBaja.forEach(elementAsignSinBaja => {
              resAsigActivos.forEach(elementAsignActivos => {
                if(elementAsignActivos.id == elementAsignSinBaja.id){
                  this.listaAsignActivosCompletos.push(elementAsignActivos)
                }
              });
            });
          }
          console.log(this.listaAsignActivosCompletos)
          this.listaAsignActivosCompletos.forEach(elementAsignArticulo => {
            if(Number(elementAsignArticulo.idAsignacionesProcesos.idUsuario.id) == Number(sessionStorage.getItem('id'))){
              if(elementAsignArticulo.idEstado.id == 76 && elementAsignArticulo.idDetalleArticulo.idArticulo.idEstado.id == 26){
                var obj = {
                  asignArticulo: elementAsignArticulo,
                  existeAsigPuntoVenta: false
                }
                if(resAsignacion.length > 0){
                  resAsignacion.forEach(elementAsignacionPuntoVenta => {
                    if(elementAsignArticulo.idDetalleArticulo.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.id && elementAsignArticulo.idDetalleArticulo.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.id && elementAsignArticulo.idAsignacionesProcesos.idUsuario.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id){
                      obj.existeAsigPuntoVenta = true
                    }
                  })
                }
                this.listarAsignacionArticulos.push(obj);
              }else if(elementAsignArticulo.idEstado.id == 78 && elementAsignArticulo.idDetalleArticulo.idArticulo.idEstado.id == 26){
                var obj = {
                  asignArticulo: elementAsignArticulo,
                  existeAsigPuntoVenta: false
                }
                if(resAsignacion.length > 0){
                  resAsignacion.forEach(elementAsignacionPuntoVenta => {
                    if(elementAsignArticulo.idDetalleArticulo.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.id && elementAsignArticulo.idDetalleArticulo.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idDetalleArticulo.id && elementAsignArticulo.idAsignacionesProcesos.idUsuario.id == elementAsignacionPuntoVenta.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.id){
                      obj.existeAsigPuntoVenta = true
                    }
                  })
                }
                this.listarAsignacionArticulos.push(obj);
              }
            }
          })
          this.dataSource = new MatTableDataSource(this.listarAsignacionArticulos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
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
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarAsignacionArticulos);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: AsignacionArticulos, filter: string) => {
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

  listMisActivos: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listMisActivos = []
    for (let index = 0; index < this.listarAsignacionArticulos.length; index++) {
      const element = this.listarAsignacionArticulos[index];
      var obj = {
        "Id": element.asignArticulo.id,
        "Activo": element.asignArticulo.idDetalleArticulo.idArticulo.descripcion,
        "Codigo Contable": element.asignArticulo.idDetalleArticulo.codigoContable,
        "Marca": element.asignArticulo.idDetalleArticulo.marca,
        "Placa": element.asignArticulo.idDetalleArticulo.placa,
        "Serial": element.asignArticulo.idDetalleArticulo.serial,
        "Usuario Asignacion": element.asignArticulo.idAsignacionesProcesos.idUsuario.nombre+" "+element.asignArticulo.idAsignacionesProcesos.idUsuario.apellido,
        "Estado Asignacion": element.asignArticulo.idEstado.descripcion
      }
      this.listMisActivos.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listMisActivos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaMisActivos");
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
}
