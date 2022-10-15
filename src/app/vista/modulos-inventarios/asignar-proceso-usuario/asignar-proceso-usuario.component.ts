import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { AgregarAsignarProcesoUsuarioComponent } from './agregar-asignar-proceso-usuario/agregar-asignar-proceso-usuario.component';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import { ModificarAsignarProcesoUsuarioComponent } from './modificar-asignar-proceso-usuario/modificar-asignar-proceso-usuario.component';
import { AsignacionProceso} from 'src/app/modelos/asignacionProceso';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-asignar-proceso-usuario',
  templateUrl: './asignar-proceso-usuario.component.html',
  styleUrls: ['./asignar-proceso-usuario.component.css']
})
export class AsignarProcesoUsuarioComponent implements OnInit {
  dtOptions: any = {};
  public listarTipoNovedades: any = [];

  displayedColumns = ['id', 'idUsuario', 'idTipoProceso', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioAsignacionProceso: AsignacionProcesoService,
    private dialog: MatDialog,
    private servicioUsuario: UsuarioService,
    private servicioProceso: TipoProcesoService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignacionProceso.listarTodos().subscribe( res =>{
      this.listarTipoNovedades = res;
      this.dataSource = new MatTableDataSource( this.listarTipoNovedades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  agregarAsignacionProceso(): void {
    const dialogRef = this.dialog.open(AgregarAsignarProcesoUsuarioComponent, {
      width: '500px',
    });
  }

  modificarAsignacionProceso(id: number): void {
    const dialogRef = this.dialog.open(ModificarAsignarProcesoUsuarioComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarAsignacionProceso(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-5'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioAsignacionProceso.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se eliminó la asignación.',
            'success'
          )
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          '',
          'error'
        )
      }
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarTipoNovedades);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: AsignacionProceso, filter: string) => {
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

  listaAsignacionesProcesoUsuario: any = []; // Es para traer todos los datos del servicio asignacion proceso usuario
  listAsignacionesProcesoUsuario: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listAsignacionesProcesoUsuario = []
    this.servicioAsignacionProceso.listarTodos().subscribe(resAsignacionesProcesoUsuario=>{
      this.listaAsignacionesProcesoUsuario = resAsignacionesProcesoUsuario
      console.log(this.listaAsignacionesProcesoUsuario)
      for (let index = 0; index < this.listaAsignacionesProcesoUsuario.length; index++) {
        const element = this.listaAsignacionesProcesoUsuario[index];
        var obj = {
          "Id": element.id,
          "Proceso Asignado": element.idTiposProcesos.descripcion,
          "Usuario Asignado": element.idUsuario.nombre+" "+element.idUsuario.apellido
        }
        this.listAsignacionesProcesoUsuario.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listAsignacionesProcesoUsuario);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaAsignacionesProcesoUsuario");
      });
    })
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
