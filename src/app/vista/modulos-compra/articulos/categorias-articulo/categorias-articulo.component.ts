import { CategoriaService } from './../../../../servicios/Categoria.service';
import { ModificarCategoriaComponent } from './modificar-categoria/modificar-categoria.component';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Categoria } from 'src/app/modelos/categoria';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-categorias-articulo',
  templateUrl: './categorias-articulo.component.html',
  styleUrls: ['./categorias-articulo.component.css']
})
export class CategoriasArticuloComponent implements OnInit {
  public listaArticulos: any = [];

  displayedColumns = ['id', 'descripcion','estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioCategoria: CategoriaService,
    private servicioEstado: EstadoService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioCategoria.listarTodos().subscribe( res =>{
      res.forEach(element => {
        if(element.idEstado.id == 49){
          this.listaArticulos.push(element)
        }
      });
      this.dataSource = new MatTableDataSource( this.listaArticulos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarCategoriaComponent, {
      width: '500px',
    });
  }

  modificarCategoria(id: number): void {
    const dialogRef = this.dialog.open(ModificarCategoriaComponent, {
      width: '500px',
      data: id
    });
  }

  eliminarCategoria(id:number){
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
        this.servicioCategoria.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se eliminó la categoria.',
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
      this.dataSource = new MatTableDataSource(this.listaArticulos);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Categoria, filter: string) => {
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

  listadoCategoriasArticulos: any = [];
  listaCategoriasArticulosCompletos: any = []
  exportToExcel(): void {
    this.listaCategoriasArticulosCompletos = []
    this.servicioCategoria.listarTodos().subscribe(resUsuarios=>{
      this.listadoCategoriasArticulos = resUsuarios
      for (let index = 0; index < this.listadoCategoriasArticulos.length; index++) {
        const element = this.listadoCategoriasArticulos[index];
        if(element.idEstado.id == 49){
          var obj = {
            "Id": element.id,
            "Nombre": element.descripcion,
            Estado: element.idEstado.descripcion
          }
          this.listaCategoriasArticulosCompletos.push(obj)
        }
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaCategoriasArticulosCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaCategoriasArticulos");
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
