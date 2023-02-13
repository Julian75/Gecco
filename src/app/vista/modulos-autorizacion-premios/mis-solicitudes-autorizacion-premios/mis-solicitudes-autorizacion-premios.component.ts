import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as FileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudAutorizacionPago } from 'src/app/modelos/solicitudAutorizacionPago';
import { SolicitudAutorizacionPagoService } from 'src/app/servicios/solicitudAutorizacionPago.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
@Component({
  selector: 'app-mis-solicitudes-autorizacion-premios',
  templateUrl: './mis-solicitudes-autorizacion-premios.component.html',
  styleUrls: ['./mis-solicitudes-autorizacion-premios.component.css']
})
export class MisSolicitudesAutorizacionPremiosComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudes: any = [];

  displayedColumns = ['id', 'fecha', 'motivo', 'oficina', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioSoliciAutorizacion: SolicitudAutorizacionPagoService,
    private servicioUsuario: UsuarioService,
    private servicioPdf: SubirPdfService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarMisSolicitudes()
  }

  public listarMisSolicitudes(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioPdf.listarTodoArchivoSolicitudAutorizacionPago().subscribe(resArchivos=>{
        this.servicioSoliciAutorizacion.listarTodos().subscribe(resSolicitudes=>{
          const encontrarSolicitudesPorUsuario = resSolicitudes.filter((solicitud: any) => solicitud.idUsuario.id == resUsuario.id);
          const datosSolicitudes = encontrarSolicitudesPorUsuario.map((solicitud: any) => {return {id: solicitud.id,fecha: new Date(solicitud.fecha).toLocaleString(),motivo: solicitud.idMotivoAutorizacionPago.descripcion,oficina: solicitud.nombreOficiona,estado: '',motivoAutirizacion: solicitud.idMotivoAutorizacionPago, archivo:false}})
          for (let i = 0; i < datosSolicitudes.length; i++) {
            if(datosSolicitudes[i].motivoAutirizacion.idEstado.id == 96){
              datosSolicitudes[i].estado = 'Pendiente';
              document.querySelector('.estadoPendiente')?.setAttribute('style', 'background-color: #FFC107; color: #000000; border-radius: 5px; padding: 5px;')
            }else if(datosSolicitudes[i].motivoAutirizacion.idEstado.id == 97){
              datosSolicitudes[i].estado = 'Aprobado';
            }else if(datosSolicitudes[i].motivoAutirizacion.idEstado.id == 98){
              datosSolicitudes[i].estado = 'Rechazado';
            }
          }
          this.listarSolicitudes = datosSolicitudes;
          this.dataSource = new MatTableDataSource(this.listarSolicitudes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        })
      })
    })
  }

  descargarPdf(id: number){
  }

  editarSolicitudPremio(id: number){
  }
  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarSolicitudes);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: SolicitudAutorizacionPago, filter: string) => {
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

  listadoUsuarios: any = [];
  listaUsuariosCompletos: any = []
  exportToExcel(): void {
    // this.listaUsuariosCompletos = []
    // this.servicioSoliciAutorizacion.listarTodos().subscribe(resUsuarios=>{
    //   this.listadoUsuarios = resUsuarios
    //   for (let index = 0; index < this.listadoUsuarios.length; index++) {
    //     const element = this.listadoUsuarios[index];
    //     var obj = {
    //       "Id": element.id,
    //       "Nombre": element.nombre+" "+element.apellido,
    //       "Tipo de Documento": element.idTipoDocumento.descripcion,
    //       Documento: element.documento,
    //       Correo: element.correo,
    //       Rol: element.idRol.descripcion,
    //       "Ide Oficina": element.ideOficina,
    //       "Ide SubZona": element.ideSubzona,
    //       Estado: element.idEstado.descripcion
    //     }
    //     this.listaUsuariosCompletos.push(obj)
    //   }
    //   import("xlsx").then(xlsx => {
    //     const worksheet = xlsx.utils.json_to_sheet(this.listaUsuariosCompletos);
    //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     this.saveAsExcelFile(excelBuffer, "listaUsuarios");
    //   });
    // })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
