import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { AgregarSubprocesoComponent } from './agregar-subproceso/agregar-subproceso.component';
import { ModificarSubprocesoComponent } from './modificar-subproceso/modificar-subproceso.component';

@Component({
  selector: 'app-lista-subproceso',
  templateUrl: './lista-subproceso.component.html',
  styleUrls: ['./lista-subproceso.component.css']
})
export class ListaSubprocesoComponent implements OnInit {

  dtOptions: any = {};
  public listarSubProceso: any = [];

  displayedColumns = ['id', 'descripcion','idProceso','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceSubProceo: SubProcesoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.serviceSubProceo.listarTodos().subscribe(res=>{
      this.listarSubProceso = res;
      this.dataSource = new MatTableDataSource(this.listarSubProceso);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public agregarSubProceso(){
    const dialogRef = this.dialog.open(AgregarSubprocesoComponent, {
      width: '500px',
    });
  }

  public modificarSubProceso(id:number){
    const dialogRef = this.dialog.open(ModificarSubprocesoComponent, {
      width: '500px',
      data: id
    });

  }


  eliminarSubProceso(id:number){
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
        this.serviceSubProceo.eliminar(id).subscribe(res=>{
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
