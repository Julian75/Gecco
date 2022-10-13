import { forEach } from 'jszip';
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
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';

@Component({
  selector: 'app-asignar-articulos-usuario',
  templateUrl: './asignar-articulos-usuario.component.html',
  styleUrls: ['./asignar-articulos-usuario.component.css']
})
export class AsignarArticulosUsuarioComponent implements OnInit {
  dtOptions: any = {};
  public listarAsignacionArticulos: any = [];

  displayedColumns = ['id','iddetalleArticulo','idasignacionesprocesos','codigoUnico','serial','placa','idEstado','opciones'];
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
    this.listaCompletaActivos = []
    this.listarAsignacionArticulos = []
    this.serviceAsignacionArticulos.listarTodos().subscribe(resAsignacionesArticulos=>{
      this.servicioConsultasGenerales.listarAsignacionesActivosSinBaja().subscribe(resActivosSinBaja=>{
        resActivosSinBaja.forEach(elementActivosSinBaja => {
          resAsignacionesArticulos.forEach(elementAsignArti => {
            if(elementAsignArti.id == elementActivosSinBaja.id){
              this.listaCompletaActivos.push(elementAsignArti)
            }
          });
        });
        this.listaCompletaActivos.sort()
        console.log(this.listaCompletaActivos)
        this.listaCompletaActivos.forEach(elementAsigArticulo => {
          if(elementAsigArticulo.idEstado.id != 79){
            var obj = {
              asignacionArticulo: {},
              usuario: false
            }
            if(elementAsigArticulo.idAsignacionesProcesos.idUsuario.id == Number(sessionStorage.getItem('id'))){
              obj.asignacionArticulo = elementAsigArticulo
              obj.usuario = true
            }else{
              obj.asignacionArticulo = elementAsigArticulo
              obj.usuario = false
            }
            this.listarAsignacionArticulos.push(obj)
          }
        });
        this.dataSource = new MatTableDataSource(this.listarAsignacionArticulos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })

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
