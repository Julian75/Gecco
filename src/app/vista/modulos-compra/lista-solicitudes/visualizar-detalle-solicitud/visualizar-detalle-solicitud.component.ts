import { AgregarComentarioComponent } from './../../comentarios-solicitud/agregar-comentario/agregar-comentario.component';
import { GestionProcesoService } from './../../../../servicios/gestionProceso.service';
import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-visualizar-detalle-solicitud',
  templateUrl: './visualizar-detalle-solicitud.component.html',
  styleUrls: ['./visualizar-detalle-solicitud.component.css']
})
export class VisualizarDetalleSolicitudComponent implements OnInit {
  public idSolicitud: any;
  public estadoSolicitud: any;
  public listarDetalle: any = [];
  public listaExiste: any = [];
  displayedColumns = ['id', 'articulo','solicitud', 'cantidad','observacion' ,'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialogRef: MatDialogRef<VisualizarDetalleSolicitudComponent>,
    private servicelistaSolicitud: SolicitudService,
    private serviceGestionProceso: GestionProcesoService,
    private serviceDetalleSolicitud: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarDetalleSolicitud();
  }

  aprobar:boolean = false
  aprobar2:boolean = false
  public listarDetalleSolicitud() {
    this.idSolicitud = this.data;
    this.servicelistaSolicitud.listarPorId(this.idSolicitud.id).subscribe( res => {
      if (res.idEstado.id == 54) {
        this.aprobar = true
        this.serviceGestionProceso.listarTodos().subscribe(resGestionProceso=>{
          resGestionProceso.forEach(elementGestionProceso => {
            if(elementGestionProceso.idDetalleSolicitud.idSolicitud.id == res.id && elementGestionProceso.idProceso.idUsuario.id == Number(sessionStorage.getItem('id')) && elementGestionProceso.idEstado.id == 50){
              this.listarDetalle.push(elementGestionProceso.idDetalleSolicitud)
            }
          });
          this.dataSource = new MatTableDataSource( this.listarDetalle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }else{
        this.aprobar = false
        this.estadoSolicitud = res.idEstado.id
        this.serviceDetalleSolicitud.listarTodos().subscribe( resDetalle => {
          resDetalle.forEach(element => {
            if (element.idSolicitud.id == res.id && element.idEstado.id == 28) {
              this.aprobar2 = true
            }else if (element.idSolicitud.id == res.id && element.idEstado.id == 57 ) {
              this.aprobar2 = false
            }
            this.listaExiste.push(this.aprobar2)
          })
          const existe = this.listaExiste.includes( true );
          if(existe == true){
            resDetalle.forEach(element => {
              if (element.idSolicitud.id == res.id && element.idEstado.id == 28) {
                this.listarDetalle.push(element);
              }
            })
            this.dataSource = new MatTableDataSource( this.listarDetalle);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }else if(existe == false){
            resDetalle.forEach(element => {
              if (element.idSolicitud.id == res.id && element.idEstado.id == 57) {
                this.listarDetalle.push(element);
              }else if (element.idSolicitud.id == res.id && element.idEstado.id == 56) {
                this.listarDetalle.push(element);
              }
            })
            this.dataSource = new MatTableDataSource( this.listarDetalle);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          resDetalle.forEach(element => {
            if (element.idSolicitud.id == res.id && element.idEstado.id == 37) {
              this.listarDetalle.push(element);
            }
          })
          this.dataSource = new MatTableDataSource( this.listarDetalle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    })

  }

  public abrirModal(idDetalleSolicitud){
    const dialogRef = this.dialog.open(AgregarComentarioComponent, {
      width: '500px',
      data: idDetalleSolicitud
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarDetalle);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: DetalleSolicitud, filter: string) => {
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

  listaDetalleSolicitudesCompletos: any = []
  exportToExcel(): void {
    this.listaDetalleSolicitudesCompletos = []
    for (let index = 0; index < this.listarDetalle.length; index++) {
      const element = this.listarDetalle[index];
      var obj = {
        "Id Solicitud": element.idSolicitud.id,
        "Fecha": element.idSolicitud.fecha,
        "Articulo": element.idArticulos.descripcion,
        "Cantidad": element.cantidad,
        "Valor Unitario": element.valorUnitario,
        "Valor Total": element.valorTotal,
        "Observación": element.observacion,
        Estado: element.idEstado.descripcion
      }
      this.listaDetalleSolicitudesCompletos.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaDetalleSolicitudesCompletos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaDetalleSolicitud");
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

  public volver(){
    this.dialogRef.close();
  }
}
