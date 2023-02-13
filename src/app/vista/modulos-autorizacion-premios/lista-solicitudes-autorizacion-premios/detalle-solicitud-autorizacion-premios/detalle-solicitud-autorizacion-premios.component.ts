
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as FileSaver from 'file-saver';
import { SolicitudAutorizacionPagoService } from 'src/app/servicios/solicitudAutorizacionPago.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SolicitudAutorizacionPago } from 'src/app/modelos/solicitudAutorizacionPago';

@Component({
  selector: 'app-detalle-solicitud-autorizacion-premios',
  templateUrl: './detalle-solicitud-autorizacion-premios.component.html',
  styleUrls: ['./detalle-solicitud-autorizacion-premios.component.css']
})
export class DetalleSolicitudAutorizacionPremiosComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudes: any = [];
  public fecha: any;
  displayedColumns = ['id', 'fecha', 'oficina', 'cedulaColocador', 'colillaImpresa','fechaSorteo','cliente','cedulaCliente','direccionCliente','nomSorteoLoteria','codigoVenta','totalFormulario','totalGanadoBruto','motivo','usuario'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private servicioSoliciAutorizacion: SolicitudAutorizacionPagoService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }


  public listarTodos() {
    this.servicioSoliciAutorizacion.listarPorId(Number(this.data)).subscribe(resSolicitudAutorizacion => {
      console.log(resSolicitudAutorizacion);
      this.fecha = new Date(resSolicitudAutorizacion.fecha).toLocaleString();
      this.listarSolicitudes.push(resSolicitudAutorizacion);
      this.dataSource = new MatTableDataSource(this.listarSolicitudes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
