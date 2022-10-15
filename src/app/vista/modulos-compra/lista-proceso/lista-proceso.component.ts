import { MatDialog } from '@angular/material/dialog';
import { ProcesoService } from './../../../servicios/proceso.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModificarProcesoComponent } from './modificar-proceso/modificar-proceso.component';
import { AgregarProcesoComponent } from './agregar-proceso/agregar-proceso.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Proceso } from 'src/app/modelos/proceso';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lista-proceso',
  templateUrl: './lista-proceso.component.html',
  styleUrls: ['./lista-proceso.component.css']
})
export class ListaProcesoComponent implements OnInit {
  public listaProcesos: any = [];

  displayedColumns = ['id', 'categoria', 'usuario','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioProceso: ProcesoService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioProceso.listarTodos().subscribe( res =>{
      this.listaProcesos = res
      this.dataSource = new MatTableDataSource( this.listaProcesos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarProcesoComponent, {
      width: '500px',
    });
  }

  modificarProceso(id: number): void {
    const dialogRef = this.dialog.open(ModificarProcesoComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarProceso(id:number){
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
        this.servicioProceso.eliminar(id).subscribe(res=>{
          this.listarTodos();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino la asignacion de categoria correctamente.',
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
      window.location.reload();
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaProcesos);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Proceso, filter: string) => {
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

  listadoAsignacionCategoria: any = [];
  listaAsignacionCategoriaCompletos: any = []
  exportToExcel(): void {
    this.listaAsignacionCategoriaCompletos = []
    this.servicioProceso.listarTodos().subscribe(resAsignacionCategoria=>{
      this.listadoAsignacionCategoria = resAsignacionCategoria
      for (let index = 0; index < this.listadoAsignacionCategoria.length; index++) {
        const element = this.listadoAsignacionCategoria[index];
        var obj = {
          "Id": element.id,
          "Categoria Asignada": element.idCategoria.descripcion,
          "Usuario Asignado": element.idUsuario.nombre+" "+element.idUsuario.apellido,
        }
        this.listaAsignacionCategoriaCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaAsignacionCategoriaCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaAsignacionesCategorias");
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
