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
      height: '440px',
    });
  }

  mostrarHistorial(idArticulo:number):void{
    const dialogRef = this.dialog.open(VisualizarHistorialArticuloComponent, {
      width: '600px',
      height: '440px',
      data: idArticulo
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaArticulos.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
