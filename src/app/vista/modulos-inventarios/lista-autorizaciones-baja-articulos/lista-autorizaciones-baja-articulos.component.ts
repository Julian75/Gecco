import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { SolicitudBajasArticulos2 } from 'src/app/modelos/modelos2/solicitudBajasArticulos2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { RechazoSolicitudBajaArticuloComponent } from './rechazo-solicitud-baja-articulo/rechazo-solicitud-baja-articulo.component';
import { VisualizarActivosBajasSolicitudComponent } from '../visualizar-activos-bajas-solicitud/visualizar-activos-bajas-solicitud.component';
import { SolicitudBajasArticulos } from 'src/app/modelos/solicitudBajasArticulos';

@Component({
  selector: 'app-lista-autorizaciones-baja-articulos',
  templateUrl: './lista-autorizaciones-baja-articulos.component.html',
  styleUrls: ['./lista-autorizaciones-baja-articulos.component.css']
})
export class ListaAutorizacionesBajaArticulosComponent implements OnInit {

  dtOptions: any = {};
  public listarSolicitudesBajas: any = [];

  displayedColumns = ['id', 'fecha', 'usuario', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviceSolicitudBajasArticulos: SolicitudBajasArticulosService,
    private serviceModificar: ModificarService,
    private serviceUsuario: UsuarioService,
    private serviceEstado: EstadoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    localStorage.setItem('listaAutorizacionUbicacion', 'true')
    this.serviceSolicitudBajasArticulos.listarTodos().subscribe(resTodoSolicitudesBajas=>{
      resTodoSolicitudesBajas.forEach(element => {
        if(element.idEstado.id == 80){
          this.listarSolicitudesBajas.push(element)
        }
      });
      console.log(this.listarSolicitudesBajas)
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  visualizarActivosBajas(id:number){
    const dialogRef = this.dialog.open(VisualizarActivosBajasSolicitudComponent, {
      width: '800px',
      height: '440px',
      data: {idSolicitudBaja: id, idContable: 0}
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: SolicitudBajasArticulos, filter: string) => {
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


  name = 'listaAutorizaciones.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('autorizaciones');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}