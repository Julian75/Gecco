import { DetalleArticuloService } from 'src/app/servicios/detalleArticulo.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarArticulosComponent } from './modificar-articulos/modificar-articulos.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgregarArticulosComponent } from './agregar-articulos/agregar-articulos.component';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { VisualizarHistorialArticuloComponent } from './visualizar-historial-articulo/visualizar-historial-articulo.component';
import { Articulo } from 'src/app/modelos/articulo';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  public listaArticulos: any = [];

  displayedColumns = ['id', 'descripcion', 'categoria', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioArticulo: ArticuloService,
    private servicioDetalleArticulo: DetalleArticuloService,
    private servicioEstado: EstadoService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioArticulo.listarTodos().subscribe(resArticulos=>{
      resArticulos.forEach(elementArticulo => {
        if(elementArticulo.idEstado.id == 26){
          this.listaArticulos.push(elementArticulo)
        }
      });
      this.dataSource = new MatTableDataSource( this.listaArticulos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  modificarRol(id: number): void {
    const dialogRef = this.dialog.open(ModificarArticulosComponent, {
      width: '500px',
      data: id
    });
  }

  agregarArticulo(): void {
    const dialogRef = this.dialog.open(AgregarArticulosComponent, {
      width: '500px',
      height: '400px',
    });
  }

  modificarArticulo(id): void {
    const dialogRef = this.dialog.open(ModificarArticulosComponent, {
      width: '500px',
      height: '400px',
      data: id
    });
  }

  eliminarRol(id:number){
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
        this.servicioArticulo.eliminar(id).subscribe(res=>{
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se eliminó el Articulo.',
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
      this.dataSource.filterPredicate = (data: Articulo, filter: string) => {
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

  listadoArticulos: any = [];
  listaArticulosCompletos: any = []
  exportToExcel(): void {
    this.listaArticulosCompletos = []
    this.servicioArticulo.listarTodos().subscribe(resArticulos=>{
      this.listadoArticulos = resArticulos
      for (let index = 0; index < this.listadoArticulos.length; index++) {
        const element = this.listadoArticulos[index];
        if(element.idEstado.id == 26){
          var obj = {
            "Id": element.id,
            "Articulo": element.descripcion,
            "Categoria": element.idCategoria.descripcion,
            Estado: element.idEstado.descripcion
          }
          this.listaArticulosCompletos.push(obj)
        }
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaArticulosCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaArticulos");
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
