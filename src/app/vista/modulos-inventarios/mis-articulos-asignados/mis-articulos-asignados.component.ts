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

@Component({
  selector: 'app-mis-articulos-asignados',
  templateUrl: './mis-articulos-asignados.component.html',
  styleUrls: ['./mis-articulos-asignados.component.css']
})
export class MisArticulosAsignadosComponent implements OnInit {
  dtOptions: any = {};
  public listarAsignacionArticulos: any = [];

  displayedColumns = ['id', 'idasignacionesprocesos','iddetalleArticulo','idEstado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceAsignacionArticulos: AsignacionArticulosService,
    private servicioModificar: ModificarService,
    private servicioEstado: EstadoService,
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

  public listarTodos(){
    this.serviceAsignacionArticulos.listarTodos().subscribe(res=>{
      res.forEach(element => {
        if(element.idAsignacionesProcesos.idUsuario.documento == Number(sessionStorage.getItem('usuario')) ){
          if(element.idEstado.id == 76 || element.idEstado.id == 78){
            this.listarAsignacionArticulos.push(element);
          }
        }
      });
      this.dataSource = new MatTableDataSource(this.listarAsignacionArticulos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
      console.log(res);
      asignacionArticulo.id = res.id;
      asignacionArticulo.idAsignacionesProcesos = res.idAsignacionesProcesos.id;
      asignacionArticulo.idDetalleArticulo = res.idDetalleArticulo.id;
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

  solicitudBajaArticulo(idAsignacionArticulo){
    const dialogRef = this.dialog.open(AgregarSolicitudBajaArticuloComponent, {
      width: '500px',
      height: '300px',
      data: idAsignacionArticulo
    });
  }

  listaAsignArticulos: any = [];
  eliminarAsignacionProceso(id:number){
    this.listaAsignArticulos = []
    let asignacionArticuloMod: AsignacionArticulos2 = new AsignacionArticulos2();
    let asignacionArticuloCompras: AsignacionArticulos2 = new AsignacionArticulos2();
    console.log(id)
    this.serviceAsignacionArticulos.listarPorId(id).subscribe(res=>{
      console.log(res)
      asignacionArticuloMod.id = res.id;
      asignacionArticuloMod.idAsignacionesProcesos = res.idAsignacionesProcesos.id;
      asignacionArticuloMod.idDetalleArticulo = res.idDetalleArticulo.id;
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
              asignacionArticuloCompras.idEstado = resEstado.id;
              this.servicioActualizarModyCompras(asignacionArticuloMod, asignacionArticuloCompras)
            })
          })
        })
      })
    })
  }

  servicioActualizarModyCompras(asignacionArticuloMod: AsignacionArticulos2, asignacionArticuloCompra: AsignacionArticulos2){
    this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloMod).subscribe(resAsigModificado=>{
      this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloCompra).subscribe(resAsigCompras=>{
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
