import { forEach } from 'jszip';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { ModificarAsignarArticulosUsuarioComponent } from './modificar-asignar-articulos-usuario/modificar-asignar-articulos-usuario.component';
import { AsignacionArticulos } from 'src/app/modelos/asignacionArticulos';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { AsignacionArticulos2 } from 'src/app/modelos/modelos2/asignacionArticulos2';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-asignar-articulos-usuario',
  templateUrl: './asignar-articulos-usuario.component.html',
  styleUrls: ['./asignar-articulos-usuario.component.css']
})
export class AsignarArticulosUsuarioComponent implements OnInit {
  dtOptions: any = {};
  public listarAsignacionArticulos: any = [];

  displayedColumns = ['id','iddetalleArticulo','idasignacionesprocesos','serial','placa','idEstado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceAsignacionArticulos: AsignacionArticulosService,
    private servicioModificar: ModificarService,
    private servicioEstado: EstadoService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listaCompletaActivos: any = []
  public listarTodos(){
    // this.listaCompletaActivos = []
    // this.listarAsignacionArticulos = []
    // this.serviceAsignacionArticulos.listarTodos().subscribe(resAsignacionesArticulos=>{
    //   this.servicioConsultasGenerales.listarAsignacionesActivosSinBaja().subscribe(resActivosSinBaja=>{
    //     if(resActivosSinBaja.length == 0){
    //       this.listaCompletaActivos = resAsignacionesArticulos
    //     }else{
    //       resActivosSinBaja.forEach(elementActivosSinBaja => {
    //         resAsignacionesArticulos.forEach(elementAsignArti => {
    //           if(elementAsignArti.id == elementActivosSinBaja.id){
    //             this.listaCompletaActivos.push(elementAsignArti)
    //           }
    //         });
    //       });
    //     }
    //     this.listaCompletaActivos.sort()
    //     this.listaCompletaActivos.forEach(elementAsigArticulo => {
    //       if(elementAsigArticulo.idEstado.id != 79){
    //         var obj = {
    //           asignacionArticulo: {},
    //           usuario: false
    //         }
    //         if(elementAsigArticulo.idAsignacionesProcesos.idUsuario.id == Number(sessionStorage.getItem('id'))){
    //           obj.asignacionArticulo = elementAsigArticulo
    //           obj.usuario = true
    //         }else{
    //           obj.asignacionArticulo = elementAsigArticulo
    //           obj.usuario = false
    //         }
    //         this.listarAsignacionArticulos.push(obj)
    //       }
    //     });
    //     this.dataSource = new MatTableDataSource(this.listarAsignacionArticulos);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })
    // })

  }

  modificarAsignacionProceso(id: number): void {
    const dialogRef = this.dialog.open(ModificarAsignarArticulosUsuarioComponent, {
      width: '500px',
      data: id
    });
  }

  aceptar(id:number){
    let asignacionArticulo: AsignacionArticulos2 = new AsignacionArticulos2();
    this.serviceAsignacionArticulos.listarPorId(id).subscribe(res=>{
      asignacionArticulo.id = res.id;
      asignacionArticulo.idAsignacionesProcesos = res.idAsignacionesProcesos.id;
      this.servicioEstado.listarPorId(76).subscribe(res=>{
        asignacionArticulo.idEstado = res.id;
        this.servicioModificar.actualizarAsignacionArticulos(asignacionArticulo).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Asignacion de articulo aceptada',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload()
        })
      })
    })
  }


  eliminarAsignacionProceso(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAsignacionArticulos.eliminar(id).subscribe(res=>{
          Swal.fire(
            '¡Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          )
          window.location.reload()
        })
      }
    })
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

  listAsignacionesActivoUsuario: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listAsignacionesActivoUsuario = []
    for (let index = 0; index < this.listarAsignacionArticulos.length; index++) {
      const element = this.listarAsignacionArticulos[index];
      var obj = {
        "Id": element.asignacionArticulo.id,
        "Activo": element.asignacionArticulo.idDetalleArticulo.idArticulo.descripcion,
        "Codigo Contable": element.asignacionArticulo.idDetalleArticulo.codigoContable,
        "Marca": element.asignacionArticulo.idDetalleArticulo.marca,
        "Placa": element.asignacionArticulo.idDetalleArticulo.placa,
        "Serial": element.asignacionArticulo.idDetalleArticulo.serial,
        "Usuario Asignacion": element.asignacionArticulo.idAsignacionesProcesos.idUsuario.nombre+" "+element.asignacionArticulo.idAsignacionesProcesos.idUsuario.apellido,
        "Estado Asignacion": element.asignacionArticulo.idEstado.descripcion
      }
      this.listAsignacionesActivoUsuario.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listAsignacionesActivoUsuario);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaAsignacionesActivoUsuario");
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
