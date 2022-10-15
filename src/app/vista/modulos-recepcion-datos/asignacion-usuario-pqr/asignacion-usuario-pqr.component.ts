import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignarUsuariosPqrService } from 'src/app/servicios/asignacionUsuariosPqrs.service';
import { AgregarAsignacionUsuarioPqrComponent } from './agregar-asignacion-usuario-pqr/agregar-asignacion-usuario-pqr.component';
import { ModificarAsignacionUsuarioPqrComponent } from './modificar-asignacion-usuario-pqr/modificar-asignacion-usuario-pqr.component';
import { AsignacionUsuariosPqrs } from 'src/app/modelos/asignacionUsuariosPqrs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-asignacion-usuario-pqr',
  templateUrl: './asignacion-usuario-pqr.component.html',
  styleUrls: ['./asignacion-usuario-pqr.component.css']
})
export class AsignacionUsuarioPqrComponent implements OnInit {
  dtOptions: any = {};
  displayedColumns = ['id', 'usuario','area', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public listaAsignacionUsuarios: any = [];

  constructor(
    public dialog: MatDialog,
    private servicioUsuarioPqr: AsignarUsuariosPqrService,
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }
  public listarTodos(){
    this.servicioUsuarioPqr.listarTodos().subscribe(res=>{
      this.listaAsignacionUsuarios = res
      this.dataSource = new MatTableDataSource(this.listaAsignacionUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarAsignacionUsuarioPqrComponent, {
      width: '500px',
    });
  }

  modificarTipoDocumento(id: number): void {
    const dialogRef = this.dialog.open(ModificarAsignacionUsuarioPqrComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarTipoDocumento(id:number){
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
        this.servicioUsuarioPqr.eliminar(id).subscribe(res=>{
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
      this.dataSource = new MatTableDataSource(this.listaAsignacionUsuarios);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: AsignacionUsuariosPqrs, filter: string) => {
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

  listaAsignarAreaUsuario: any = []; // Es para traer todos los datos del servicio asignaciones usuario PQRS
  listAsignarAreaUsuario: any = []; // Es una lista para poder pasarle directamente al formato excel
  exportToExcel(): void {
    this.listAsignarAreaUsuario = []
    this.servicioUsuarioPqr.listarTodos().subscribe(resAsignacionesAreaUsuario=>{
      this.listaAsignarAreaUsuario = resAsignacionesAreaUsuario
      for (let index = 0; index < this.listaAsignarAreaUsuario.length; index++) {
        const element = this.listaAsignarAreaUsuario[index];
        var obj = {
          "Id": element.id,
          "Usuario Asignado": element.idUsuario.nombre+" "+element.idUsuario.apellido,
          "Area Asignada": element.idArea.descripcion
        }
        this.listAsignarAreaUsuario.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listAsignarAreaUsuario);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaAsignacionesAreaUsuario");
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
