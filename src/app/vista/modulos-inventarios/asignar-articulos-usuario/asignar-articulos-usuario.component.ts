import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { AgregarAsignarArticulosUsuarioComponent } from './agregar-asignar-articulos-usuario/agregar-asignar-articulos-usuario.component';
import { ModificarAsignarArticulosUsuarioComponent } from './modificar-asignar-articulos-usuario/modificar-asignar-articulos-usuario.component';
import { AsignacionArticulos } from 'src/app/modelos/asignacionArticulos';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { AsignacionArticulos2 } from 'src/app/modelos/modelos2/asignacionArticulos2';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-asignar-articulos-usuario',
  templateUrl: './asignar-articulos-usuario.component.html',
  styleUrls: ['./asignar-articulos-usuario.component.css']
})
export class AsignarArticulosUsuarioComponent implements OnInit {
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

  public listarTodos(){
    this.serviceAsignacionArticulos.listarTodos().subscribe(res=>{
      this.listarAsignacionArticulos = res;
      console.log(this.listarAsignacionArticulos);
      this.dataSource = new MatTableDataSource(this.listarAsignacionArticulos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  agregarAsignacionProceso(): void {
    const dialogRef = this.dialog.open(AgregarAsignarArticulosUsuarioComponent, {
      width: '500px',
    });
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
      console.log(res);
      asignacionArticulo.id = res.id;
      asignacionArticulo.idAsignacionesProcesos = res.idAsignacionesProcesos.id;
      asignacionArticulo.idDetalleArticulo = res.idDetalleArticulo.id;
      this.servicioEstado.listarPorId(75).subscribe(res=>{
        asignacionArticulo.idEstado = res.id;
        this.servicioModificar.actualizarAsignacionArticulos(asignacionArticulo).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Asignacion de articulo aceptada',
            showConfirmButton: false,
            timer: 1500
          })
          this.listarTodos();
        })
      })
    })
  }

  
  eliminarAsignacionProceso(id:number){
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
            title: 'Asignacion de articulo aceptada',
            showConfirmButton: false,
            timer: 1500
          })
          this.listarTodos();
        })
      })
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
