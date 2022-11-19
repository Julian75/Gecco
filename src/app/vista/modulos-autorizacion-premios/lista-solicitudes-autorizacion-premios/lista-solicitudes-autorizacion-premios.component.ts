import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as FileSaver from 'file-saver';
import { SolicitudAutorizacionPagoService } from 'src/app/servicios/solicitudAutorizacionPago.service';
import { SolicitudAutorizacionPago } from 'src/app/modelos/solicitudAutorizacionPago';
@Component({
  selector: 'app-lista-solicitudes-autorizacion-premios',
  templateUrl: './lista-solicitudes-autorizacion-premios.component.html',
  styleUrls: ['./lista-solicitudes-autorizacion-premios.component.css']
})
export class ListaSolicitudesAutorizacionPremiosComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudes: any = [];

  displayedColumns = ['id', 'fecha', 'motivo', 'oficina', 'usuario', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioSoliciAutorizacion: SolicitudAutorizacionPagoService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.listarSolicitudes = [];
    this.servicioSoliciAutorizacion.listarTodos().subscribe(res=>{
      this.listarSolicitudes = res.map((res: any) => {
        return {
          id: res.id,
          fecha: new Date(res.fecha).toLocaleDateString() + " " + new Date(res.fecha).toLocaleTimeString(),
          motivo: res.idMotivoAutorizacionPago.descripcion,
          oficina: res.nombreOficiona,
          usuario: res.idUsuario.nombre+" "+res.idUsuario.apellido,
          }
      })
      this.dataSource = new MatTableDataSource(this.listarSolicitudes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  verSolicitud(id: any){
  }

  aceptar(id: any){
  }

  rechazarSolicitud(id: any){
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
    this.listaUsuariosCompletos = []
    this.servicioSoliciAutorizacion.listarTodos().subscribe(resUsuarios=>{
      this.listadoUsuarios = resUsuarios
      for (let index = 0; index < this.listadoUsuarios.length; index++) {
        const element = this.listadoUsuarios[index];
        var obj = {
          "Id": element.id,
          "Nombre": element.nombre+" "+element.apellido,
          "Tipo de Documento": element.idTipoDocumento.descripcion,
          Documento: element.documento,
          Correo: element.correo,
          Rol: element.idRol.descripcion,
          "Ide Oficina": element.ideOficina,
          "Ide SubZona": element.ideSubzona,
          Estado: element.idEstado.descripcion
        }
        this.listaUsuariosCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaUsuariosCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaUsuarios");
      });
    })
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
