import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-actas-bajas',
  templateUrl: './lista-actas-bajas.component.html',
  styleUrls: ['./lista-actas-bajas.component.css']
})
export class ListaActasBajasComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudesBajas: any = [];

  displayedColumns = ['id', 'fecha', 'observacion', 'usuario', 'idDetalleArticulo', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private serviceSolicitudBajasArticulos: SolicitudBajasArticulosService,
    private serviceEstado: EstadoService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    this.listarSolicitudesBajas = []
    this.serviceSolicitudBajasArticulos.listarTodos().subscribe(resTodoSolicitudesBajas=>{
      resTodoSolicitudesBajas.forEach(element => {
        if(element.idEstado.id == 82){
          this.listarSolicitudesBajas.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  abrirPdf(idSolicitudBajaArticulo){
    this.serviceSolicitudBajasArticulos.listarPorId(idSolicitudBajaArticulo).subscribe(resSolicitudBajaArticulo=>{

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


  name = 'listaActasBajas.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('actasBajas');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }


}
