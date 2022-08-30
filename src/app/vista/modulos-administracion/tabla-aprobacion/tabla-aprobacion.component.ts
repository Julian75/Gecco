import { EliminacionTurnoVendedor2 } from './../../../modelos/eliminacionTurnoVendedor2';
import { AsignarTurnoVendedor2 } from './../../../modelos/asignarTurnoVendedor2';
import { ModificarService } from './../../../servicios/modificar.service';
import { AsignarTurnoVendedor } from './../../../modelos/asignarTurnoVendedor';
import { AsignarTurnoVendedorService } from './../../../servicios/asignarTurnoVendedor.service';
import { EliminacionTurnoVendedor } from './../../../modelos/eliminacionTurnoVendedor';
import { EliminacionTurnoVendedorService } from './../../../servicios/EliminacionTurnoVendedor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ObservacionAprobacionComponent } from './observacion-aprobacion/observacion-aprobacion.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-aprobacion',
  templateUrl: './tabla-aprobacion.component.html',
  styleUrls: ['./tabla-aprobacion.component.css']
})
export class TablaAprobacionComponent implements OnInit {

  displayedColumns = ['id', 'solicitante', 'vendedor', 'turno', 'observacion', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaAprobacion: any = [];

  constructor(
    private servicioEliminacion: EliminacionTurnoVendedorService,
    private servicioAsignarTurno: AsignarTurnoVendedorService,
    private servicioAsignarTurn2: ModificarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.servicioEliminacion.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.estado == "Pendiente"){
          this.listaAprobacion.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listaAprobacion);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  visualizarObservacion(id: number): void {
    const dialogRef = this.dialog.open(ObservacionAprobacionComponent, {
      width: '500px',
      data: id
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  name = 'listaAprobacionesPendientes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('accesos');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  public aceptado(idEliminacion:number, idAsignarTurnoVendedor:number) {
    let eliminacionTurno : EliminacionTurnoVendedor2 = new EliminacionTurnoVendedor2();
    this.servicioEliminacion.listarPorId(idEliminacion).subscribe(res => {
      eliminacionTurno.id = res.id
      eliminacionTurno.idAsignarTurnoVendedor = res.idAsignarTurnoVendedor.id
      eliminacionTurno.idUsuario = res.idUsuario.id
      eliminacionTurno.observacion = res.observacion
      eliminacionTurno.estado = "Aceptado"
      this.modificarEliminacionTurno(eliminacionTurno);
      this.eliminarTurno(idAsignarTurnoVendedor)
    })
  }

  public modificarEliminacionTurno(eliminacionTurn:EliminacionTurnoVendedor2){
    this.servicioAsignarTurn2.actualizarEliminacion(eliminacionTurn).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solicitud Aceptada!',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al aceptar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public eliminarTurno(turnoAsignado:number){
    let asignarTurno : AsignarTurnoVendedor2 = new AsignarTurnoVendedor2();
    this.servicioAsignarTurno.listarPorId(turnoAsignado).subscribe(res => {
      asignarTurno.id = res.id
      asignarTurno.fechaFinal = res.fechaFinal
      asignarTurno.fechaInicio = res.fechaInicio
      asignarTurno.idOficina = res.idOficina
      asignarTurno.idSitioVenta = res.idSitioVenta
      asignarTurno.idTurno = res.idTurno.id
      asignarTurno.idVendedor = res.idVendedor
      asignarTurno.ideSubzona = res.ideSubzona
      asignarTurno.nombreOficina = res.nombreOficina
      asignarTurno.nombreSitioVenta = res.nombreSitioVenta
      asignarTurno.nombreVendedor = res.nombreVendedor
      asignarTurno.estado = "Eliminado"
      this.servicioAsignarTurn2.actualizarAsignarTurnoVendedor(asignarTurno).subscribe(res => {})
      window.location.reload()
    })
  }

  public rechazado(idEliminar:number, idAsignarTurnoVendedor:number){
    let eliminacionTurno : EliminacionTurnoVendedor2 = new EliminacionTurnoVendedor2();
    this.servicioEliminacion.listarPorId(idEliminar).subscribe(res => {
      eliminacionTurno.id = res.id
      eliminacionTurno.idAsignarTurnoVendedor = res.idAsignarTurnoVendedor.id
      eliminacionTurno.idUsuario = res.idUsuario.id
      eliminacionTurno.observacion = res.observacion
      eliminacionTurno.estado = "Rechazado"
      this.modificarEliminacionTurnoRechazado(eliminacionTurno);
      this.modificarAsignarTurno(idAsignarTurnoVendedor)
    })
  }

  public modificarEliminacionTurnoRechazado(eliminacionTurn:EliminacionTurnoVendedor2){
    this.servicioAsignarTurn2.actualizarEliminacion(eliminacionTurn).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solicitud Rechazada!',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al aceptar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public modificarAsignarTurno(turnoAsignado:any){
    let asignarTurno : AsignarTurnoVendedor2 = new AsignarTurnoVendedor2();
    this.servicioAsignarTurno.listarPorId(turnoAsignado).subscribe(res => {
      asignarTurno.id = res.id
      asignarTurno.fechaFinal = res.fechaFinal
      asignarTurno.fechaInicio = res.fechaInicio
      asignarTurno.idOficina = res.idOficina
      asignarTurno.idSitioVenta = res.idSitioVenta
      asignarTurno.idTurno = res.idTurno.id
      asignarTurno.idVendedor = res.idVendedor
      asignarTurno.ideSubzona = res.ideSubzona
      asignarTurno.nombreOficina = res.nombreOficina
      asignarTurno.nombreSitioVenta = res.nombreSitioVenta
      asignarTurno.nombreVendedor = res.nombreVendedor
      asignarTurno.estado = "Disponible"
      this.servicioAsignarTurn2.actualizarAsignarTurnoVendedor(asignarTurno).subscribe(res => {})
      window.location.reload()
    })
  }

}
