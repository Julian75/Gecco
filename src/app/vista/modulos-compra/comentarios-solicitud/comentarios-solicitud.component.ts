import { map } from 'rxjs';
import { GestionProcesoService } from './../../../servicios/gestionProceso.service';
import { PasosComponent } from './../pasos/pasos.component';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { Solicitud } from 'src/app/modelos/solicitud';
import * as FileSaver from 'file-saver';

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
              if (elementSolicitud.id == element.idDetalleSolicitud.idSolicitud.id && element.idDetalleSolicitud.idEstado.id == 54) {
                this.listaSolicitudes.push(elementSolicitud);
              }
            })
            let lista = this.listaSolicitudes.map(item=>{
              return [item.id, item]
            })
            var solMapArr = new Map(lista)
            this.listaSolicitudes2 = [...solMapArr.values()]
            this.listaSolicitudes2.reverse();
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
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listaSolicitudes2);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Solicitud, filter: string) => {
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

  listadoProveedores: any = [];
  listaProveedoresCompletos: any = []
  exportToExcel(): void {
    this.listaProveedoresCompletos = []
    for (let index = 0; index < this.listaSolicitudes2.length; index++) {
      const element = this.listaSolicitudes2[index];
      var obj = {
        "Id": element.id,
        "Fecha": element.fecha,
        "Usuario a Comentar": element.idUsuario.nombre+" "+element.idUsuario.apellido,
        Estado: element.idEstado.descripcion
      }
      this.listaProveedoresCompletos.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaProveedoresCompletos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaComentariosSolicitudesPendientes");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  // exportToExcel(): void {
  //   for (let index = 0; index < this.listaSolicitudes2.length; index++) {
  //     const element = this.listaSolicitudes2[index];


  //   }
  // }
}
