import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-solicitudes-sc',
  templateUrl: './solicitudes-sc.component.html',
  styleUrls: ['./solicitudes-sc.component.css']
})
export class SolicitudesScComponent implements OnInit {

  public listarSolicitud: any = [];
  displayedColumns = ['id', 'fecha', 'vence', 'municipio', 'incidente', 'motivoSolicitud', 'medioRadicacion', 'tipoServicio', 'auxiliarRadicacion', 'escala', 'estado'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioSolicitudSc: SolicitudSCService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioSolicitudSc.listarTodos().subscribe( res =>{
      res.forEach(elementSolicitud => {
        var fechaInicio = new Date(elementSolicitud.fecha);
        var fecha1 = fechaInicio.getTime();
        var fechaActual = new Date().getTime();
        var fechaFin = new Date(elementSolicitud.vence);
        var fecha2 = fechaFin.getTime();

        var resta = fecha1 - fecha2;
        var diferencia = resta/(1000*60*60*24)
        console.log(diferencia)
        for (let i = 0; i < diferencia; i++) {
          var fechaTrancurriendo = fechaInicio.getFullYear() + "-"+ fechaInicio.getMonth()+ "-" +(fechaInicio.getDate()+i);
          var fechaTrancurriendo2 = new Date(fechaTrancurriendo);
          if ((fechaTrancurriendo2.getDay() == 0) || (fechaTrancurriendo2.getDay() == 6)) {
            console.log("dias de finde")
          }else{
            var diasHabiles =+ 1
          }
          console.log(diasHabiles)
        }
      });
      this.listarSolicitud = res;
      console.log(this.listarSolicitud)
      this.dataSource = new MatTableDataSource(this.listarSolicitud);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  name = 'solicitudes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('jerarquia');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
