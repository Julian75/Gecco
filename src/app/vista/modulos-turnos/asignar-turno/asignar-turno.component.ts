import { AsignarTurnoService } from './../../../servicios/asignarTurno.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
@Component({
  selector: 'app-asignar-turno',
  templateUrl: './asignar-turno.component.html',
  styleUrls: ['./asignar-turno.component.css']
})
export class AsignarTurnoComponent implements OnInit {
  dtOptions: any = {};
  public listarTurnos: any = [];
  public listarOficinas: any = [];
  public listarSitioVentas: any = [];

  displayedColumns = ['id', 'estado', 'horaInicio', 'horaFinal', 'nombreOficina', 'nombreSitioVenta', 'tipoTurno'];
  dataSource!:MatTableDataSource<any>;


  constructor(
    private servicioAsignarTurno: AsignarTurnoService,
    private serviceOficina: OficinasService,
    private serviceSitioVenta: SitioVentaService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioAsignarTurno.listarTodos().subscribe( res =>{
      this.listarTurnos = res;
      console.log(res)
      this.dataSource = new MatTableDataSource(this.listarTurnos);
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
}
