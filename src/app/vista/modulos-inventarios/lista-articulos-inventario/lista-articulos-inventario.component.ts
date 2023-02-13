import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { VisualizarHistorialArticuloComponent } from '../../modulos-compra/articulos/visualizar-historial-articulo/visualizar-historial-articulo.component';
import { MatDialog } from '@angular/material/dialog';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { Inventario } from 'src/app/modelos/inventario';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-articulos-inventario',
  templateUrl: './lista-articulos-inventario.component.html',
  styleUrls: ['./lista-articulos-inventario.component.css']
})
export class ListaArticulosInventarioComponent implements OnInit {
  dtOptions: any = {};
  public listarInventario: any = [];

  displayedColumns = ['id', 'articulo','marca','placa','serial','usuario','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioInventario: InventarioService,
    private servicioSolicitudBaja: ArticulosBajaService,
    private servicioAsignacionArticulo: AsignacionArticulosService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodo()
  }

  listaCompletaInventario: any = []
  public listarTodo(){
    this.listaCompletaInventario = []
    this.servicioConsultasGenerales.listarDetalleActivoSinBaja(Number(sessionStorage.getItem('id'))).subscribe(resDetalleActivoSinBaja=>{
      this.servicioConsultasGenerales.listarAsignacionArticulosEstadoDetalle1(Number(sessionStorage.getItem('id'))).subscribe(resAsignacionArticulos=>{
        console.log(resDetalleActivoSinBaja)
        if(resDetalleActivoSinBaja.length > 0){
          this.listaCompletaInventario = resDetalleActivoSinBaja
          var listaAsigArticulosCompletos = this.listaCompletaInventario.sort((a, b) => Number(a.id) - Number(b.id))
          this.dataSource = new MatTableDataSource(listaAsigArticulosCompletos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }else{
          resAsignacionArticulos.forEach(element => {
            this.servicioAsignacionArticulo.listarPorId(element.ideAsignacion).subscribe(resAsignacion=>{
              var obj = {
                idDetalleArticulo: resAsignacion.idDetalleArticulo.id,
                tipoActivo: resAsignacion.idDetalleArticulo.idArticulo.descripcion,
                marca: resAsignacion.idDetalleArticulo.marca,
                placa: resAsignacion.idDetalleArticulo.placa,
                serial: resAsignacion.idDetalleArticulo.serial,
                nombre: resAsignacion.idDetalleArticulo.idUsuario.nombre,
                apellido: resAsignacion.idDetalleArticulo.idUsuario.apellido
              }
              this.listaCompletaInventario.push(obj)
              var listaAsigArticulosCompletos = this.listaCompletaInventario.sort((a, b) => Number(a.id) - Number(b.id))
              this.dataSource = new MatTableDataSource(listaAsigArticulosCompletos);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          });
        }
      })
    })
    // this.servicioInventario.listarTodos().subscribe(resInventariosCompletos=>{
    //   this.servicioConsultasGenerales.listarInventariosSinBaja().subscribe(resInventariosSinBaja=>{
    //     if(resInventariosSinBaja.length == 0){
    //       this.listaCompletaInventario = resInventariosCompletos
    //     }else{
    //       const datosInventarioSinBaja = resInventariosSinBaja.map((item:any) => item.id)
    //       const datosInventarioCompletos = resInventariosCompletos.map((item:any) => item.id)
    //       const datosInventarioCompletosSinBaja = datosInventarioCompletos.filter((item:any) => datosInventarioSinBaja.includes(item))
    //       this.listaCompletaInventario = resInventariosCompletos.filter((item:any) => datosInventarioCompletosSinBaja.includes(item.id))
    //     }
    //     this.listaCompletaInventario.sort()
    //     this.dataSource = new MatTableDataSource( this.listaCompletaInventario);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })
    // })
  }

  mostrarHistorial(idArticulo:number):void{
    const dialogRef = this.dialog.open(VisualizarHistorialArticuloComponent, {
      width: '600px',
      height: '440px',
      data: idArticulo
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaCompletaInventario);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Inventario, filter: string) => {
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

  listActivosInventario: any = [];
  exportToExcel(): void {
    this.listActivosInventario = []
    for (let index = 0; index < this.listaCompletaInventario.length; index++) {
      const element = this.listaCompletaInventario[index];
      var obj = {
        "Id": element.id,
        "Activo": element.idDetalleArticulo.idArticulo.descripcion,
        "Fecha Registro Activo": element.fecha,
        "Cantidad": element.cantidad,
        "Codigo Contable": element.idDetalleArticulo.codigoContable,
        "Marca": element.idDetalleArticulo.marca,
        "Placa": element.idDetalleArticulo.placa,
        "Serial": element.idDetalleArticulo.serial,
        "Usuario Registro Activo": element.idUsuario.nombre+" "+element.idUsuario.apellido,
        "Estado Activo": element.idDetalleArticulo.idEstado.descripcion
      }
      this.listActivosInventario.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listActivosInventario);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaActivosInventario");
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
