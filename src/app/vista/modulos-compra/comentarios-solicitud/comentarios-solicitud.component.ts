import { map } from 'rxjs';
import { GestionProcesoService } from './../../../servicios/gestionProceso.service';
import { ProcesoService } from './../../../servicios/proceso.service';
import { PasosComponent } from './../pasos/pasos.component';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { CorreoService } from './../../../servicios/Correo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-comentarios-solicitud',
  templateUrl: './comentarios-solicitud.component.html',
  styleUrls: ['./comentarios-solicitud.component.css']
})
export class ComentariosSolicitudComponent implements OnInit {

  public listaSolicitudes: any = [];
  public listaSolicitudes2: any = [];
  public listaDetalleSolicitud: any = [];

  displayedColumns = ['id', 'fecha','usuario', 'estado','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private solicitudService: SolicitudService,
    private gestionProcesoService: GestionProcesoService,
  ) { }


  ngOnInit(): void {
    this.listarSolicitudes();
  }

  public listarSolicitudes(){
    this.gestionProcesoService.listarTodos().subscribe(resGestionProceso=>{
      resGestionProceso.forEach(element => {
        if(element.idProceso.idUsuario.id == Number(sessionStorage.getItem("id"))){
          this.solicitudService.listarTodos().subscribe(resSolicitud => {
            resSolicitud.forEach(elementSolicitud => {
              if (elementSolicitud.id == element.idDetalleSolicitud.idSolicitud.id) {
                this.listaSolicitudes.push(elementSolicitud);
              }
            })
            let lista = this.listaSolicitudes.map(item=>{
              return [item.id, item]
            })
            var solMapArr = new Map(lista)
            this.listaSolicitudes2 = [...solMapArr.values()]
            this.dataSource = new MatTableDataSource( this.listaSolicitudes2);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      });
    })
  }

  verPasos(id: number){
    const dialogRef = this.dialog.open(PasosComponent, {
      width: '500px',
      height: '400px',
      data: {id: id}
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaSolicitudes.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
